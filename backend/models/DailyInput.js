const mongoose = require('mongoose');

const dailyInputSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0),
  },
  availableFoods: String,
  canGoToGym: Boolean,
  religiousStatus: String,
  activityLevel: String,
  healthCondition: String,
  mood: String,
  economicStatus: String,
});

// Ensure one document per user per day
dailyInputSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyInput', dailyInputSchema);