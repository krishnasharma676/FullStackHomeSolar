// import { calculateBillChart } from "./billChartController.js";
import { nextFiveYearbillData } from "./nextFiveYearbillData.js";
import User from "../models/User.js";

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

    // all charts show
    // const billData = await calculateBillChart(input);
    const nextFiveYear = await nextFiveYearbillData(input);

    const response = {
      userId: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      // ...billData,
      ...nextFiveYear,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error saving user or calculating data:", error);
    res.status(500).json({ message: "Error processing solar data", error });
  }
};
