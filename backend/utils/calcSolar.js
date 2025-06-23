exports.calculateSolarStats = (bill) => {
  const MONTHS_IN_YEAR = 12;
  const LIFETIME_YEARS = 25;
  const COST_PER_KW = 60000;
  const CO2_MONTHLY_FACTOR = 100 * 0.85; // production factor per kW/month
  const TREE_CO2_KG = 21;
  const monthlyProductionBase = solarSizeKW * 100;
  const inflationFactor = 1 + inflation;

  const afterBill = Math.round(bill * 0.2);
  const monthlySavings = bill - afterBill;

  const lifetimeSavings = monthlySavings * MONTHS_IN_YEAR * LIFETIME_YEARS;

  const solarSizeKW = Math.ceil(bill / 10) / 100; // equivalent to parseFloat((bill/1000).toFixed(2))

  const systemCost = Math.round(solarSizeKW * COST_PER_KW);
  const paybackYears = Math.round(systemCost / monthlySavings);

  const co2SavedKg = Math.round(
    solarSizeKW * CO2_MONTHLY_FACTOR * MONTHS_IN_YEAR * LIFETIME_YEARS
  );
  const treesEquivalent = Math.round(co2SavedKg / TREE_CO2_KG);

  const roi = Number(((lifetimeSavings - systemCost) / systemCost).toFixed(2));

  // Extra: 5-year data for charts
  const analysis = [];
  let currBill = bill;
  let currAfter = afterBill;
  const degradation = 0.01;
  const inflation = 0.05;

  for (let year = 1; year <= 5; year++) {
    const annualBefore = Math.round(currBill * MONTHS_IN_YEAR);
    const currAfterCost = currBill * 0.2;
    const annualAfter = Math.round(currAfterCost * MONTHS_IN_YEAR);
    const annualSavings = annualBefore - annualAfter;

    // Monthly production for this year, rounded to 2 decimals
    const beforeProduction = Math.round(
      monthlyProductionBase * (1 - degradation * (year - 1)) * 100
    );
    const production = beforeProduction / 100;

    analysis.push({
      year: `Year ${year}`,
      beforeCost: annualBefore,
      afterCost: annualAfter,
      savings: annualSavings,
      solarProduction: production,
    });

    currBill *= inflationFactor;
    currAfter = currBill * 0.2;
  }

  return {
    afterBill,
    monthlySavings,
    lifetimeSavings,
    solarSizeKW,
    systemCost,
    paybackYears,
    co2SavedKg,
    treesEquivalent,
    roi,
    totalSavings: analysis.reduce((sum, y) => sum + y.savings, 0),
    analysis,
  };
};
