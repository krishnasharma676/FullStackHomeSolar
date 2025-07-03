import mongoose from "mongoose";

const PincodeStateSchema = new mongoose.Schema({
  pincode: { type: String, required: true },
  statename: { type: String, required: true },
});

export default mongoose.model("PincodeStateMap", PincodeStateSchema, "pincodes");
