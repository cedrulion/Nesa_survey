// controllers/surveyController.js
const Survey = require('../model/SurveyModel');

// Create a new survey
exports.createSurvey = async (req, res) => {
  try {
    const newSurvey = new Survey(req.body);
    await newSurvey.save();
    res.status(201).json({ message: 'Survey created successfully', survey: newSurvey });
  } catch (err) {
    res.status(500).json({ message: 'Error creating survey', error: err.message });
  }
};

// Get all surveys
exports.getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).json(surveys);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching surveys', error: err.message });
  }
};

// Get a survey by ID
exports.getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    res.status(200).json(survey);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching survey', error: err.message });
  }
};

// Update a survey
exports.updateSurvey = async (req, res) => {
  try {
    const updatedSurvey = await Survey.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSurvey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    res.status(200).json({ message: 'Survey updated successfully', survey: updatedSurvey });
  } catch (err) {
    res.status(500).json({ message: 'Error updating survey', error: err.message });
  }
};

// Delete a survey
exports.deleteSurvey = async (req, res) => {
  try {
    const deletedSurvey = await Survey.findByIdAndDelete(req.params.id);
    if (!deletedSurvey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    res.status(200).json({ message: 'Survey deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting survey', error: err.message });
  }
};
