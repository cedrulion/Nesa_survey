// models/SurveyModel.js
const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: String},
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  occupation: { type: String, required: true },
  zipCode: { type: String, required: true },
  education: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
