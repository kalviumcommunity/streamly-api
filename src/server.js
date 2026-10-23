// server.js — COMPLETE. Connects to MongoDB, then starts the Express app.
// You do not need to change this file.

import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

try {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => console.log(`✅ Streamly API on http://localhost:${PORT}`));
} catch (err) {
  console.error("❌ Failed to connect to MongoDB:", err.message);
  process.exit(1);
}