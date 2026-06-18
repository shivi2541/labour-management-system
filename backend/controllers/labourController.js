const Labour = require("../models/Labour");

// Add Labour
const createLabour = async (req, res) => {
  try {
    const labour = await Labour.create(req.body);

    res.status(201).json({
      success: true,
      labour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Labours
const getLabours = async (req, res) => {
  const labours = await Labour.find();

  res.json({
    success: true,
    count: labours.length,
    labours,
  });
};

// Get Single Labour
const getLabourById = async (req, res) => {
  try {
    const labour = await Labour.findById(req.params.id);

    if (!labour) {
      return res.status(404).json({
        success: false,
        message: "Labour not found",
      });
    }

    res.json({
      success: true,
      labour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Labour
const updateLabour = async (req, res) => {
  try {
    const labour = await Labour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      labour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Labour
const deleteLabour = async (req, res) => {
  try {
    await Labour.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Labour deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLabour,
  getLabours,
  getLabourById,
  updateLabour,
  deleteLabour,
};