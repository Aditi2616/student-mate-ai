const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const { protect } = require('../middleware/authMiddleware');

// Sabhi subjects wapas laao (Sirf us user ke)
router.get('/', protect, async (req, res) => {
  try {
    const subjects = await Subject.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(subjects);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Naya subject add karo (User ID ke saath)
router.post('/', protect, async (req, res) => {
  try {
    const newSub = new Subject({ ...req.body, user: req.user.id });
    const saved = await newSub.save();
    res.status(201).json(saved);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// Delete subject
router.delete('/:id', protect, async (req, res) => {
  try {
    await Subject.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;