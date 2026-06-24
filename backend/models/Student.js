const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  rollNo: {
    type: String,
    required: true
  },

  studentClass: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  gender: {
    type: String
  },

  graduation: {
    type: String
  },

  photo: {
    type: String,
    default: ""
  }

});

module.exports = mongoose.model(
  "Student",
  studentSchema
);