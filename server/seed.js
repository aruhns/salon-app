require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("./models/Service");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const data = [
      { name: "Curl Defining Treatment", description: "Hydration + curl definition for soft, bouncy curls.", duration: 60, price: 85 },
      { name: "Protective Style Setup",  description: "Gentle prep + maintenance for long-lasting protective styles.", duration: 120, price: 120 },
      { name: "Scalp Care & Detox",      description: "Soothe + balance scalp health with a detox ritual.", duration: 45, price: 70 },
    ];

    for (const s of data) {
      await Service.updateOne({ name: s.name }, { $set: s }, { upsert: true });
    }

    console.log("✅ Services seeded/updated");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
};

seed();

