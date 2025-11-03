const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  title: String,
  description: String,
  mood: String
});

module.exports = mongoose.model('Diary', diarySchema);
