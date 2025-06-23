exports.calculateSolarStats = (bill) => {
  const afterBill = Math.round(bill * 0.2);
  const monthlySavings = bill - afterBill;
  const lifetimeSavings = monthlySavings * 12 * 25;
  const solarSizeKW = parseFloat((bill / 1000).toFixed(2));
  const systemCost = Math.round(solarSizeKW * 60000);
  const paybackYears = Math.round(systemCost / monthlySavings);
  const co2SavedKg = Math.round(solarSizeKW * 100 * 0.85 * 12 * 25); 
  const treesEquivalent = Math.round(co2SavedKg / 21);
  const roi = parseFloat(((lifetimeSavings - systemCost) / systemCost).toFixed(2));

  // Extra: 5-year data for charts
  const analysis = [];
  let currBill = bill;
  let currAfter = afterBill;
  const degradation = 0.01;
  const inflation = 0.05;

  for (let year = 1; year <= 5; year++) {
    const savings = currBill - currAfter;
    const production = parseFloat((solarSizeKW * 100 * (1 - degradation * (year - 1))).toFixed(2));
    analysis.push({
      year: `Year ${year}`,
      beforeCost: Math.round(currBill * 12),
      afterCost: Math.round(currAfter * 12),
      savings: Math.round(savings * 12),
      solarProduction: production,
    });

    currBill *= (1 + inflation);
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
