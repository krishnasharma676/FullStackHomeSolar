const { calculateSolarStats } = require('../utils/calcSolar');

exports.calculateSolarData = (req, res) => {
  const { name, email, bill } = req.body;
  if (!name || !email || !bill) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const results = calculateSolarStats(bill);
  res.json({ name, email, bill, ...results });
};
