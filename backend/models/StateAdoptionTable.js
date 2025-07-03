import mongoose from "mongoose";

const SolarAdoptionSchema = new mongoose.Schema({
  state: { type: String, required: true },
  total_score: { type: Number, required: true }, // changed
});


// 👇 force exact collection name
export default mongoose.model(
  "SolarAdoptionTable",
  SolarAdoptionSchema,
  "solarAdoptionTable"
);
