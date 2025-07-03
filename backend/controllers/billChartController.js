import AppConfig from "../models/AppConfig.js";
import TariffTable from "../models/StateElectricityTariffsTable.js";
import PincodeTable from "../models/PincodeStateMap.js";

export const calculateBillChart = async ({ billAmount, pincode }) => {

  function calculateElectricityData({
    currentMonthlyBill,
    currentYear,
    currentCharge,
    yoyIncreasePct,
    endYear = currentYear - 5
  }) {
    const data = {};

    // Compute baseline consumption from current values
    const annualBillCurrent = currentMonthlyBill * 12;
    const monthlyKwh = annualBillCurrent / (currentCharge * 12);

    // Year-by-year
    for (let year = currentYear; year >= endYear; year--) {
      // Calculate per-unit charge for this year
      const yearsBack = currentYear - year;
      // Reverse compound increase: charge_year = currentCharge / ((1 + r)^yearsBack)
      const charge = currentCharge / Math.pow(1 + yoyIncreasePct / 100, yearsBack);

      // Annual bill = constant consumption × charge × 12
      const annualBill = monthlyKwh * charge * 12;

      data[year] = {
        charge,
        monthlyKwh,
        annualBill
      };
    }

    // Percentage increase from endYear to currentYear
    const billStart = data[endYear].annualBill;
    const billEnd = data[currentYear].annualBill;
    const pctIncrease = ((billEnd - billStart) / billStart) * 100;

    return { data, pctIncrease };
  }

  try {
    console.log("Input Payload:", { billAmount, pincode });
    const currentyear = new Date().getFullYear();
    const monthlyBill = parseFloat(billAmount);
    const baseAnnualBill = monthlyBill * 12;

    // 3. Get state using pincode
    const pincodeString = String(pincode).trim();
    const pincodeDoc = await PincodeTable.findOne({ pincode: pincodeString });
    if (!pincodeDoc || !pincodeDoc.statename) {
      throw new Error("State not found for this pincode");
    }
    const stateName = pincodeDoc.statename;
    console.log("State found for Pincode:", stateName);

    // 4. Get tariff using state name (case-insensitive match)
    const stateTariff = await TariffTable.findOne({
      state: { $regex: new RegExp(`^${stateName}$`, "i") },
    });

    if (!stateTariff || !stateTariff.highestTariffSlab) {
      throw new Error("Tariff not found for this state");
    }
    const currentPerUnitChargekwh = parseFloat(stateTariff.highestTariffSlab);
    console.log("Per-Unit Charge (₹/kWh):", currentPerUnitChargekwh);

    // 2. Get YOY increase % from DB
    const inflationConfig = await AppConfig.findOne({ key: "yoy" });
    const yoy = parseFloat(inflationConfig?.value || 0.04);
    console.log("YOY Tariff Increase (%):", yoy);

    const monthlyKwhConsumption = (baseAnnualBill / (currentPerUnitChargekwh * 12)).toFixed(2);
    console.log("monthlyKWH", monthlyKwhConsumption);

    const { data, pctIncrease } = calculateElectricityData({
      currentMonthlyBill: monthlyBill,
      currentYear: currentyear,
      currentCharge: currentPerUnitChargekwh,
      yoyIncreasePct: yoy,
      endYear: 2020
    });
    console.table(
      Object.keys(data).sort((a, b) => b - a).map(year => ({
        Year: year,
        'Per‑Unit Charge (₹/kWh)': data[year].charge.toFixed(2),
        'Annual Electricity Bill (₹)': data[year].annualBill.toFixed(0)
      }))
    );
    console.log(`Increase (${endYear}→${currentYear}): ${pctIncrease.toFixed(2)}%`);



  } catch (error) {
    console.error("Error in calculateBillChart:", error);
    return { projectedBillNextSixYears: [] };
  }
};
