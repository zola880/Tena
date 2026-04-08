const DailyInput = require('../models/DailyInput');
const Profile = require('../models/Profile');
const ProgressEntry = require('../models/ProgressEntry');
const Recommendation = require('../models/Recommendation');
const { generateHealthPlan } = require('../services/aiService');

exports.generate = async (req, res, next) => {
  try {
    const userId = req.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [profile, dailyInput, recentProgress, pastRecommendations] = await Promise.all([
      Profile.findOne({ userId }),
      DailyInput.findOne({ userId, date: today }),
      ProgressEntry.find({ userId }).sort({ date: -1 }).limit(7),
      Recommendation.find({ userId }).sort({ createdAt: -1 }).limit(5)
    ]);

    if (!profile) return res.status(400).json({ message: 'Complete your profile first' });
    if (!dailyInput) return res.status(400).json({ message: 'Provide daily inputs first' });

    const plan = await generateHealthPlan(profile, dailyInput, recentProgress, pastRecommendations);

    // Transform activity object to match the schema (activityType + duration)
    const activityData = {
      activityType: plan.activity?.type || 'General exercise',
      duration: plan.activity?.duration || '20 minutes'
    };

    const newRecommendation = await Recommendation.create({
      userId,
      meals: {
        breakfast: plan.meals?.breakfast || 'Not specified',
        lunch: plan.meals?.lunch || 'Not specified',
        dinner: plan.meals?.dinner || 'Not specified'
      },
      activity: activityData,
      dailyActions: plan.dailyActions || [],
      tip: plan.tip || 'Stay healthy!',
      feedback: plan.feedback || 'Keep up the good work!'
    });

    res.status(201).json(newRecommendation);
  } catch (err) {
    next(err);
  }
};

exports.getLatest = async (req, res, next) => {
  try {
    const rec = await Recommendation.findOne({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(rec || {});
  } catch (err) {
    next(err);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const recs = await Recommendation.find({ userId: req.userId }).sort({ createdAt: -1 }).limit(30);
    res.json(recs);
  } catch (err) {
    next(err);
  }
};