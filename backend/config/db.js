const mongoose = require("mongoose");
const connectDB = () => mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});
mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB Atlas");
});
module.exports = connectDB;
