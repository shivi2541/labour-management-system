const express = require("express");
const router = express.Router();

const {
  createLabour,
  getLabours,
  getLabourById,
  updateLabour,
  deleteLabour,
} = require("../controllers/labourController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createLabour);
router.get("/", protect, getLabours);

router.get("/:id", protect, getLabourById);
router.put("/:id", protect, updateLabour);
router.delete("/:id", protect, deleteLabour);

module.exports = router;