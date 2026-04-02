const express = require('express');
const router = express.Router();
const { aiChat } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.route('/chat').post(protect, aiChat);

module.exports = router;
