import AppConfig from "../models/AppConfig.js";
import TariffTable from "../models/StateElectricityTariffsTable.js";
import PincodeTable from "../models/PincodeStateMap.js";

export const nextFiveYearbillData = async ({ billAmount, pincode }) => {
  function calculateElectricityData({
    currentMonthlyBill,
    currentYear,
    currentCharge,
    yoyIncreasePct,
    endYear,
  }) {
    const data = {};

    // Derive constant monthly kWh consumption from current values
    const monthlyKwh = currentMonthlyBill / currentCharge;

    // Project each year
    for (let year = currentYear; year <= endYear; year++) {
      const yearsForward = year - currentYear;
      const rawCharge =
        currentCharge * Math.pow(1 + yoyIncreasePct / 100, yearsForward);
      const charge = Number(rawCharge.toFixed(2));

      const rawAnnualBill = monthlyKwh * rawCharge * 12;
      const annualBill = Math.round(rawAnnualBill);

      data[year] = { charge, annualBill };
    }

    // Compute percentage increase
    const billStart = data[currentYear].annualBill;
    const billEnd = data[endYear].annualBill;
    const pctIncrease = Number(
      (((billEnd - billStart) / billStart) * 100).toFixed(2)
    );

    return { data, pctIncrease };
  }

  try {
    const currentYear = new Date().getFullYear();
    const monthlyBill = parseFloat(billAmount);

    // Lookup state
    const pincodeDoc = await PincodeTable.findOne({ pincode: pincode.trim() });
    if (!pincodeDoc) throw new Error("State not found for this pincode");
    const stateName = pincodeDoc.statename;

    // Lookup tariff
    const stateTariff = await TariffTable.findOne({
      state: new RegExp(`^${stateName}$`, "i"),
    });
    if (!stateTariff) throw new Error("Tariff not found for this state");
    const currentCharge = parseFloat(stateTariff.highestTariffSlab);

    // Lookup YOY increase
    const cfg = await AppConfig.findOne({ key: "yoy" });
    const yoyIncreasePct = parseFloat(cfg?.value) || 4;

    // Calculate
    const endYear = currentYear + 5;
    const { data } = calculateElectricityData({
      currentMonthlyBill: monthlyBill,
      currentYear,
      currentCharge,
      yoyIncreasePct,
      endYear,
    });

    // Format for response
    const projectedBillNextFiveYears = Object.entries(data)
      .map(([year, vals]) => ({
        year: Number(year),
        annualBill: vals.annualBill,
      }))
      .sort((a, b) => a.year - b.year);

    return { projectedBillNextFiveYears };
  } catch (error) {
    console.error("Error in nextFiveYearbillData:", error);
    return { projectedBillNextFiveYears: [], pctIncrease: 0 };
  }
};
