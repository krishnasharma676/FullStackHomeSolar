exports.calculateSolarStats = (input) => {
  const {
    bill,
    perUnitRate,
    yoyIncrease,
    systemSize,
    location
  } = input;

  const inflation = yoyIncrease / 100;
  const solarSizeKW = systemSize || parseFloat((bill / 1000).toFixed(2));
  const afterBill = Math.round(bill * 0.2);
  const monthlySavings = bill - afterBill;
  const lifetimeSavings = monthlySavings * 12 * 25;
  const systemCost = Math.round(solarSizeKW * 60000);
  const paybackYears = Math.round(systemCost / (monthlySavings * 12));
  const co2SavedKg = Math.round(solarSizeKW * 100 * 0.85 * 12 * 25);
  const treesEquivalent = Math.round(co2SavedKg / 21);
  const roi = parseFloat(((lifetimeSavings - systemCost) / systemCost).toFixed(2));

  const analysis = [];
  const billProjection = [];
  const maintenanceCosts = [];
  const co2Cumulative = [];
  const tariffCombo = [];

  let currBill = bill;
  let currTariff = perUnitRate;
  let currAfter = afterBill;
  let totalCO2 = 0;

  for (let year = 1; year <= 5; year++) {
    const yearlyBefore = Math.round(currBill * 12);
    const yearlyAfter = Math.round(currAfter * 12);
    const savings = yearlyBefore - yearlyAfter;
    const production = parseFloat((solarSizeKW * 100 * (1 - 0.01 * (year - 1))).toFixed(2));

    analysis.push({ year: `Year ${year}`, beforeCost: yearlyBefore, afterCost: yearlyAfter, savings, solarProduction: production });
    billProjection.push({ year: 2025 + year - 1, projected: yearlyBefore });
    maintenanceCosts.push({ year: `Year ${year}`, cost: Math.round(systemCost * 0.02) });

    const annualCO2 = Math.round(production * 12 * 0.85);
    totalCO2 += annualCO2;
    co2Cumulative.push({ year, totalCO2 });

    tariffCombo.push({
      year: 2025 + year - 1,
      tariff: parseFloat(currTariff.toFixed(2)),
      units: parseFloat((currBill / currTariff).toFixed(2)),
      bill: Math.round(currBill)
    });

    currBill *= (1 + inflation);
    currTariff *= (1 + inflation);
    currAfter = currBill * 0.2;
  }

  const pastBillTrend = [];
  let prevBill = bill;
  for (let i = 5; i >= 1; i--) {
    prevBill /= (1 + inflation);
    pastBillTrend.unshift({ year: 2025 - i, amount: Math.round(prevBill * 12) });
  }

  const SIP = [];
  const FD = [];
  let sipValue = 0;
  let fdValue = 0;
  for (let year = 1; year <= 5; year++) {
    sipValue = (sipValue + monthlySavings * 12) * 1.12;
    fdValue = (fdValue + monthlySavings * 12) * 1.06;
    SIP.push({ year: `Year ${year}`, value: Math.round(sipValue) });
    FD.push({ year: `Year ${year}`, value: Math.round(fdValue) });
  }

  const subsidies = {
    "Uttar Pradesh": { central: 30000, state: 15000 },
    "Delhi": { central: 30000, state: 0 },
    "Maharashtra": { central: 30000, state: 10000 }
  };

  const stateName = location?.toLowerCase().includes("uttar pradesh")
    ? "Uttar Pradesh"
    : location?.toLowerCase().includes("delhi")
    ? "Delhi"
    : location?.toLowerCase().includes("maharashtra")
    ? "Maharashtra"
    : null;

  const subsidy = stateName ? {
    ...subsidies[stateName],
    total: subsidies[stateName].central + subsidies[stateName].state
  } : null;

  return {
    summary: {
      afterBill,
      monthlySavings,
      lifetimeSavings,
      solarSizeKW,
      systemCost,
      paybackYears,
      co2SavedKg,
      treesEquivalent,
      roi,
      totalSavings: analysis.reduce((sum, y) => sum + y.savings, 0)
    },
    charts: {
      costComparison: analysis.map(y => ({
        year: y.year,
        beforeCost: y.beforeCost,
        afterCost: y.afterCost,
        savings: y.savings
      })),
      solarProduction: analysis.map(y => ({
        year: y.year,
        production: y.solarProduction
      })),
      co2Offset: {
        co2SavedKg,
        treesEquivalent
      },
      investmentROI: {
        systemCost,
        lifetimeSavings,
        roi
      },
      billProjection5Yr: billProjection,
      pastBillTrend,
      tariffVsBillVsUnits: tariffCombo,
      maintenanceOverYears: maintenanceCosts,
      co2Cumulative,
      sipVsFdReturns: {
        SIP,
        FD
      },
      stateSubsidy: subsidy,
      adoptionScore: {
        score: 82,
        label: "High Adoption Zone"
      },
      billComparison: {
        userBill: bill,
        areaAvg: Math.round(bill * 1.25)
      }
    }
  };
};
