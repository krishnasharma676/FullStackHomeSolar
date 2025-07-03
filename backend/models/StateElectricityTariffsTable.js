import mongoose from "mongoose";

const TariffSchema = new mongoose.Schema({
  state: { type: String, required: true },
  averageTariff: Number,
  highestTariffSlab: { type: Number, required: true },
});

// 👇 force exact collection name as in Atlas
export default mongoose.model("StateElectricityTariffsTable", TariffSchema, "StateElectricityTariffsTable");
