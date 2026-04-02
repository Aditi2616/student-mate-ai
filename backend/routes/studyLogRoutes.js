const express = require('express');
const router = express.Router();
const {
  getStudyLogs,
  createStudyLog,
} = require('../controllers/studyLogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getStudyLogs).post(protect, createStudyLog);

module.exports = router;
