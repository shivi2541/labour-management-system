const Payment = require("../models/Payment");

// Add Payment
const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);

    res.status(201).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("labourId");

    res.json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getPayments,
};