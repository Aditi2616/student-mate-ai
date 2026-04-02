const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  mid: { type: Number, default: 0 },
  midTotal: { type: Number, default: 30 },
  endTotal: { type: Number, default: 45 },
  credits: { type: Number, default: 4 },
  attended: { type: Number, default: 0 },
  totalClasses: { type: Number, default: 0 },
});

module.exports = mongoose.model('Subject', SubjectSchema);