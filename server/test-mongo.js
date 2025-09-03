// server/test-mongo.js
require("dotenv").config();
const mongoose = require("mongoose");

(async () => {
  try {
    // Hide your real password in console output:
    const masked = (process.env.MONGO_URI || "").replace(/\/\/.*:.*@/, "//<user>:<pass>@");
    console.log("Connecting to:", masked);

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas!");

    // Optional ping
    const ping = await mongoose.connection.db.admin().ping();
    console.log("Ping:", ping);
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  } finally {
    await mongoose.disconnect().catch(() => {});
    process.exit(0);
  }
})();
