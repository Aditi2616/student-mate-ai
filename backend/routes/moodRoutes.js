const express = require('express');
const router = express.Router();
const {
  getMoods,
  createMood,
} = require('../controllers/moodController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getMoods).post(protect, createMood);

module.exports = router;
