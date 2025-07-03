export const calculateCo2Chart = ({ roofArea }) => {
  const co2SavedKg = parseInt(roofArea) * 100; // 100kg CO2 saved per sq.m approx
  const treesEquivalent = Math.round(co2SavedKg / 21); // One tree absorbs ~21kg/year

  return {
    co2SavedKg,
    treesEquivalent,
  };
};
