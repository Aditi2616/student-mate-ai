const Mood = require('../models/Mood');

// @desc    Get mood entries for logged in user
// @route   GET /api/moods
// @access  Private
const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(moods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new mood entry
// @route   POST /api/moods
// @access  Private
const createMood = async (req, res) => {
  try {
    const { mood, notes, date } = req.body;

    if (!mood) {
      return res.status(400).json({ message: 'Please add a mood' });
    }

    const logDate = date ? new Date(date) : Date.now();

    const newMood = await Mood.create({
      mood,
      notes,
      date: logDate,
      user: req.user.id,
    });
    
    // Simple burnout alert logic
    let burnoutAlert = false;
    if (mood === 'Stressed' || mood === 'Exhausted') {
      const recentMoods = await Mood.find({ user: req.user.id })
        .sort({ date: -1 })
        .limit(3);
        
      const negativeMoodCount = recentMoods.filter(
        m => m.mood === 'Stressed' || m.mood === 'Exhausted'
      ).length;
      
      if (negativeMoodCount >= 3) {
        burnoutAlert = true;
      }
    }

    res.status(201).json({ mood: newMood, burnoutAlert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getMoods,
  createMood,
};
