const mongoose = require("mongoose");

const labourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    dailyRate: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
    },

    availability: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Labour",
  labourSchema
);