import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  bill: String,
  roofArea: String,
  location: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Users", userSchema);
