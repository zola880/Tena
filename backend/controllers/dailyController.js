const DailyInput = require('../models/DailyInput');

exports.getTodayInput = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const input = await DailyInput.findOne({ userId: req.userId, date: today });
    res.json(input || {});
  } catch (err) {
    next(err);
  }
};

exports.saveDailyInput = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const input = await DailyInput.findOneAndUpdate(
      { userId: req.userId, date: today },
      { ...req.body, date: today },
      { upsert: true, returnDocument: 'after' }   // changed
    );
    res.json(input);
  } catch (err) {
    next(err);
  }
};