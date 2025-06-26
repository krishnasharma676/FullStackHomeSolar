const { calculateSolarStats } = require('../utils/calcSolar');

exports.calculateSolarData = (req, res) => {
  const {
    name,
    email,
    bill,
    currentYear,
    perUnitRate,
    yoyIncrease,
    roofArea,
    location,
    latitude,
    longitude,
    investOption,
    systemSize
  } = req.body;

  if (!name || !email || !bill || !currentYear || !perUnitRate || !yoyIncrease) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const input = {
    name,
    email,
    bill: Number(bill),
    currentYear: Number(currentYear),
    perUnitRate: Number(perUnitRate),
    yoyIncrease: Number(yoyIncrease),
    roofArea,
    location,
    latitude,
    longitude,
    investOption,
    systemSize: systemSize ? Number(systemSize) : null
  };

  const results = calculateSolarStats(input);
  return res.json({ user: input, ...results });
};
