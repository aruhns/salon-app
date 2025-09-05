// server/index.js
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow only your frontend (from environment variable)
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173"; 
// fallback: local dev

app.use(
  cors({
    origin: allowedOrigin,
  })
);

app.use(express.json());  // read JSON bodies

// ----- In-memory demo data (we'll move to MongoDB in Step 9) -----
const services = [
  {
    id: "srv_curl",
    name: "Curl Defining Treatment",
    description: "Hydration + curl definition for soft, bouncy curls.",
    duration: 60,
    price: 85,
  },
  {
    id: "srv_protect",
    name: "Protective Style Setup",
    description: "Gentle prep + maintenance for long-lasting protective styles.",
    duration: 120,
    price: 120,
  },
  {
    id: "srv_scalp",
    name: "Scalp Care & Detox",
    description: "Soothe + balance scalp health with a detox ritual.",
    duration: 45,
    price: 70,
  },
];

const bookings = []; // we'll store incoming booking requests here

// ----- ROUTES -----
// Health/test
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the salon backend 👋" });
});

// 1) List services
app.get("/api/services", (req, res) => {
  res.json(services);
});

// 2) Create a booking
app.post("/api/bookings", (req, res) => {
  const { name, contact, service, date, time, notes } = req.body;

  // minimal validation (friendly, but strict enough)
  if (!name || !contact || !service || !date || !time) {
    return res
      .status(400)
      .json({ error: "Please fill name, contact, service, date, and time." });
  }

  // accept either a service id or exact service name
  const svc =
    services.find((s) => s.id === service) ||
    services.find((s) => s.name.toLowerCase() === String(service).toLowerCase());

  if (!svc) {
    return res.status(400).json({ error: "Unknown service." });
  }

  const booking = {
    id: "b_" + Date.now(),
    name,
    contact,
    serviceId: svc.id,
    serviceName: svc.name,
    date,
    time,
    notes: notes || "",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);
  console.log("New booking:", booking);

  // in real life we might send an email/SMS here
  res.status(201).json({ ok: true, booking });
});

// (optional) list all bookings (for you to see what came in)
app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
