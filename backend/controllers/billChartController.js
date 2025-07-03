import AppConfig from "../models/AppConfig.js";
import TariffTable from "../models/StateElectricityTariffsTable.js";
import PincodeTable from "../models/PincodeStateMap.js";

export const calculateBillChart = async ({ billAmount, pincode }) => {
  try {
    console.log("Input Payload:", { billAmount, pincode });

    const monthlyBill = parseFloat(billAmount);
    console.log(" Parsed Monthly Bill:", monthlyBill);

    const baseAnnualBill = monthlyBill * 12;
    console.log(" Base Annual Bill (Monthly x 12):", baseAnnualBill);

    // 1. Get YOY Increase % from DB
    const inflationConfig = await AppConfig.findOne({ key: "inflationRate" });
    console.log(" Fetched Inflation Config from DB:", inflationConfig);

    const yoyIncrease = parseFloat(inflationConfig?.value || 0.04);
    console.log(" YOY Tariff Increase (%):", yoyIncrease);

    // 2. Get STATE using pincode
    const pincodeDoc = await PincodeTable.findOne({ pincode: pincode });
    console.log(" Pincode Document:", pincodeDoc);

    if (!pincodeDoc || !pincodeDoc.state) {
      throw new Error("State not found for this pincode");
    }

    const stateName = pincodeDoc.state;
    console.log(" State found for Pincode:", stateName);

    // 3. Get Per-Unit Charge using state
    const stateTariff = await TariffTable.findOne({ state: stateName });
    console.log("Tariff Entry for State:", stateTariff);

    if (!stateTariff || !stateTariff.highestTariffSlab) {
      throw new Error("Tariff not found for this state");
    }

    const perUnitCharge = parseFloat(stateTariff.highestTariffSlab);
    console.log(" Per-Unit Charge (₹/kWh):", perUnitCharge);

    // 4. Calculate projected annual bills for 2025 to 2030
    const projectedBills = [];
    for (let i = 0; i <= 5; i++) {
      const year = 2025 + i;
      const projectedAnnualBill = baseAnnualBill * Math.pow(1 + yoyIncrease, i);
      const monthlyConsumptionKwh = projectedAnnualBill / (perUnitCharge * 12);

      const singleYearData = {
        year,
        projectedAnnualBill: Math.round(projectedAnnualBill),
        monthlyConsumption: Math.round(monthlyConsumptionKwh),
        yoyPercentage: +(i === 0
          ? 0
          : ((Math.pow(1 + yoyIncrease, i) - 1) * 100).toFixed(2)),
      };

      console.log(`Year ${year} Projection:`, singleYearData);
      projectedBills.push(singleYearData);
    }

    console.log("Final Projected Bill Array:", projectedBills);

    return {
      projectedBillNextSixYears: projectedBills,
    };
  } catch (error) {
    console.error("Error in calculateBillChart:", error);
    return { projectedBillNextSixYears: [] };
  }
};
