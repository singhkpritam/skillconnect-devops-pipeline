// ****************adding the delete and update feature *****

const express = require("express");
const router = express.Router();

const Skill = require("../models/skill");

// Create Skill
router.post("/", async (req, res) => {
  try {
    const data = await Skill.create(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Skills
router.get("/", async (req, res) => {
  try {
    const data = await Skill.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Single Skill
router.get("/:id", async (req, res) => {
  try {
    const data = await Skill.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Skill
router.put("/:id", async (req, res) => {
  try {
    const data = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Skill
router.delete("/:id", async (req, res) => {
  try {
    const data = await Skill.findByIdAndDelete(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;