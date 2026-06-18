const dashboardRoutes = require("./routes/dashboardRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const labourRoutes = require("./routes/labourRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/attendance", attendanceRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/labours", labourRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
