const Profile = require('../models/Profile');

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    // ✅ Return empty object if no profile yet (e.g., just registered)
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
      { 
        upsert: true,      // create if not exists
        new: true,         // ✅ Mongoose: return updated doc (not returnDocument)
        runValidators: true // ✅ validate schema on update
      }
    );
    res.json(profile);
  } catch (err) {
    next(err);
  }
};