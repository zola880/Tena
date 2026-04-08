const mongoose = require('mongoose');

const progressEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0),
  },
  weightKg: Number,
  mood: String,
  activityCompleted: Boolean,
  mealAdherence: String,
});

progressEntrySchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('ProgressEntry', progressEntrySchema);