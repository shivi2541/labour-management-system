const express = require("express");
const router = express.Router();

const {
  checkIn,
  getAttendance,
  checkOut,
} = require("../controllers/attendanceController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, checkIn);
router.get("/", protect, getAttendance);
router.put("/:id", protect, checkOut);

module.exports = router;