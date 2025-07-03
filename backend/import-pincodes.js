import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import csv from "csv-parser";
import connectDB from "./config/db.js";
import Pincode from "./models/Pincode.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const BATCH_SIZE = 5000;

async function runImport() {
  await connectDB();

  const filePath = path.join(__dirname, "pincodes.csv");
  let batch = [],
    total = 0;

  // create a named stream
  const stream = fs.createReadStream(filePath).pipe(csv());

  stream.on("data", async (row) => {
    const lat = row.latitude && !isNaN(row.latitude) ? +row.latitude : null;
    const lng = row.longitude && !isNaN(row.longitude) ? +row.longitude : null;

    batch.push({
      circlename: row.circlename,
      regionname: row.regionname,
      divisionname: row.divisionname,
      officename: row.officename,
      pincode: row.pincode,
      officetype: row.officetype,
      delivery: row.delivery,
      district: row.district,
      statename: row.statename,
      latitude: lat,
      longitude: lng,
    });

    if (batch.length >= BATCH_SIZE) {
      // pause the stream
      stream.pause();
      try {
        await Pincode.insertMany(batch, { ordered: false });
        total += batch.length;
        console.log(`Inserted ${total} records…`);
        batch = [];
      } catch (err) {
        console.error("Batch insert error:", err);
        process.exit(1);
      }
      // resume reading
      stream.resume();
    }
  });

  stream.on("end", async () => {
    if (batch.length) {
      await Pincode.insertMany(batch, { ordered: false });
      total += batch.length;
    }
    console.log(`✅ Done! Total inserted: ${total}`);
    process.exit(0);
  });

  stream.on("error", (err) => {
    console.error("CSV read error:", err);
    process.exit(1);
  });
}

runImport();
