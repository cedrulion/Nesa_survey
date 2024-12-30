// routes/surveyRoutes.js
const express = require('express');
const surveyController = require('../controller/surveyController');
const router = express.Router();

// CRUD Routes for Survey
router.post('/surveys', surveyController.createSurvey);
router.get('/surveys', surveyController.getAllSurveys);
router.get('/surveys/:id', surveyController.getSurveyById);
router.put('/surveys/:id', surveyController.updateSurvey);
router.delete('/surveys/:id', surveyController.deleteSurvey);

module.exports = router;
