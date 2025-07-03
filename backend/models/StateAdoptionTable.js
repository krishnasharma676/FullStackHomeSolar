import mongoose from "mongoose";

const StateAdoptionSchema = new mongoose.Schema({
  state: { type: String, required: true },
  totalScore: Number,
  highestTariffSlab: { type: Number, required: true },
});

export default mongoose.model(
  "solarAdoptionTable",
  StateAdoptionSchema,
  "solarAdoptionTable"
);
