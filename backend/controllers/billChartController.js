const AppConfig = require('../models/AppConfig');

exports.calculateBillChart = async ({ bill }) => {
  try {
    // Get inflation rate from DB config
    const inflationConfig = await AppConfig.findOne({ key: 'inflationRate' });
    const inflationRate = inflationConfig?.value || 0.06;

    const monthlyBill = parseFloat(bill);
    const baseAnnualBill = monthlyBill * 12;

    const projectedBills = [];

    for (let year = 1; year <= 5; year++) {
      const projected = baseAnnualBill * Math.pow(1 + inflationRate, year);
      projectedBills.push({
        year: `Year ${year}`,
        projectedBill: Math.round(projected),
      });
    }
    console.log(projectedBills);
    
    return {
      projectedBillNextFiveYears: projectedBills,
    };
  } catch (error) {
    console.error("❌ Error in calculateBillChart:", error);
    return { projectedBillNextFiveYears: [] };
  }
};
