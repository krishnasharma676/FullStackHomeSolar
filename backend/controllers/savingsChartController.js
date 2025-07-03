export const calculateSavingsChart = ({ bill }) => {
  const monthlySavings = parseInt(bill) * 0.8;
  const lifetimeSavings = Math.round(monthlySavings * 12 * 25); // 25 years
  const paybackYears = 6; // static example
  const roi = 3; // static example
  const systemCost = 180000; // static example
  const totalSavings = lifetimeSavings - systemCost;

  return {
    lifetimeSavings,
    paybackYears,
    roi,
    systemCost,
    totalSavings
  };
};
