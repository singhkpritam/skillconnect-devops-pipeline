// ***********************backend connection 2*****

const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },

  professionalTitle: {
    type: String,
    required: true
  },

  primarySkill: {
    type: String,
    required: true
  },

  experience: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  projectTitle: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Skill", skillSchema);