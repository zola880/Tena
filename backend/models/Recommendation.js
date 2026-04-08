const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  meals: {
    breakfast: String,
    lunch: String,
    dinner: String,
  },
  activity: {
    activityType: String,   // 👈 renamed from 'type' to avoid Mongoose conflict
    duration: String,
  },
  dailyActions: [String],
  tip: String,
  feedback: String,
});

module.exports = mongoose.model('Recommendation', recommendationSchema);