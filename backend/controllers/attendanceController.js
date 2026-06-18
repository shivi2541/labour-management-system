const Attendance = require("../models/Attendance");

// Check In
const checkIn = async (req, res) => {
  try {
    const { labourId, status } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingAttendance =
      await Attendance.findOne({
        labourId,
        date: {
          $gte: today,
          $lt: tomorrow,
        },
      });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message:
          "Attendance already marked today",
      });
    }

    const attendance =
      await Attendance.create({
        labourId,
        status,
      });

    res.status(201).json({
      success: true,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const checkOut = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      {
        checkOut: "06:00 PM"
      },
      { new: true }
    );

    res.json({
      success: true,
      attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Attendance
const getAttendance = async (req, res) => {
  const records = await Attendance.find().populate("labourId");

  res.json({
    success: true,
    count: records.length,
    records,
  });
};
module.exports = {
  checkIn,
  getAttendance,
  checkOut,
};