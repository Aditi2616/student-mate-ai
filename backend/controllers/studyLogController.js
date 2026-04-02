const StudyLog = require('../models/StudyLog');

// @desc    Get study logs for logged in user
// @route   GET /api/studylogs
// @access  Private
const getStudyLogs = async (req, res) => {
  try {
    const logs = await StudyLog.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new study log
// @route   POST /api/studylogs
// @access  Private
const createStudyLog = async (req, res) => {
  try {
    const { subject, durationInMinutes, productivityScore, date } = req.body;

    if (!subject || !durationInMinutes || !productivityScore) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }

    if (productivityScore < 1 || productivityScore > 10) {
      return res.status(400).json({ message: 'Productivity score must be between 1 and 10' });
    }

    const logDate = date ? new Date(date) : Date.now();

    const studyLog = await StudyLog.create({
      subject,
      durationInMinutes,
      productivityScore,
      date: logDate,
      user: req.user.id,
    });

    res.status(201).json(studyLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getStudyLogs,
  createStudyLog,
};
