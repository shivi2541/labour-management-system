const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    labourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Labour",
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    checkIn: {
      type: String,
    },

    checkOut: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);