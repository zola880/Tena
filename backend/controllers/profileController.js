const Profile = require('../models/Profile');

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    res.json(profile || {});
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      { ...req.body, updatedAt: Date.now() },
      { upsert: true, returnDocument: 'after' }   // changed: new: true → returnDocument: 'after'
    );
    res.json(profile);
  } catch (err) {
    next(err);
  }
};