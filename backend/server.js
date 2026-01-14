const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ⚠️ Use env var in production
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://rafaelparaisobsu:OmgItsMystic1@cluster0.bon9u.mongodb.net/pcpartpicker?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// API routes
app.use("/api/orders", require("./routes/orders"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/builds", require("./routes/builds"));

const __dirnamePath = path.resolve();

// Serve static files from Vite build
app.use(express.static(path.join(__dirnamePath, "../client/dist")));

// React Router support (catch-all)
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirnamePath, "../client/dist/index.html")
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
