import { calculateBillChart } from "./billChartController.js";
import { calculateCo2Chart } from "./co2ChartController.js";
import { calculateSavingsChart } from "./savingsChartController.js";
import User from "../models/User.js";
import AppConfig from "../models/AppConfig.js";

export const calculateSolarData = async (req, res) => {
  try {
    const input = req.body;

    // ⬇️ Save user data to MongoDB
    const savedUser = await User.create({
      name: input.name,
      email: input.email,
      bill: input.bill,
      roofArea: input.roofArea,
      location: input.location,
    });

    // ✅ Fetch config values from DB
    // const unitRate = await AppConfig.findOne({ key: 'unitRatePerKW' });
    // const roi = await AppConfig.findOne({ key: 'co2SavedPerKW' });

    // console.log('✅ Config Values:');
    // console.log('Unit Rate:', unitRate.value);
    // console.log('ROI %:', roi.value);

    // all charts show
    const billData = await calculateBillChart(input);
    const co2Data = calculateCo2Chart(input);
    const savingsData = calculateSavingsChart(input);

    const response = {
      userId: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      ...billData,
      ...co2Data,
      ...savingsData,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error saving user or calculating data:", error);
    res.status(500).json({ message: "Error processing solar data", error });
  }
};
