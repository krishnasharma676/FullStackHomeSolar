const mongoose = require("mongoose");

const PincodeSchema = new mongoose.Schema({
  circlename: { type: String, required: true },
  regionname: { type: String, required: true },
  divisionname: { type: String, required: true },
  officename: { type: String, required: true },
  pincode: { type: String, required: true },
  officetype: { type: String },
  delivery: { type: String },
  district: { type: String },
  statename: { type: String },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
});

module.exports = mongoose.model("Pincode", PincodeSchema);
