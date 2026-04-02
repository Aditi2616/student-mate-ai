const mongoose = require('mongoose');

const StudyLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  durationInMinutes: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  productivityScore: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  }
});

module.exports = mongoose.model('StudyLog', StudyLogSchema);
