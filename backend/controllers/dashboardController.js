const Labour = require("../models/Labour");
const Attendance = require("../models/Attendance");
const Payment = require("../models/Payment");

const getDashboardStats = async (req, res) => {
  try {
    const totalLabours = await Labour.countDocuments();

    const totalAttendance = await Attendance.countDocuments();

    const payments = await Payment.find();

    const totalPayments = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

    res.json({
      success: true,
      totalLabours,
      totalAttendance,
      totalPayments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};