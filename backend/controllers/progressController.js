const ProgressEntry = require('../models/ProgressEntry');

exports.addEntry = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const entry = await ProgressEntry.findOneAndUpdate(
      { userId: req.userId, date: today },
      { ...req.body, date: today },
      { upsert: true, returnDocument: 'after' }   // changed
    );
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
};

exports.getEntries = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 30;
    const entries = await ProgressEntry.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(limit);
    res.json(entries);
  } catch (err) {
    next(err);
  }
};