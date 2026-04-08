const express = require('express');
const authRoutes = require('./auth');
const dailyRoutes = require('./daily');
const profileRoutes = require('./profile');
const progressRoutes = require('./progress');
const recommendationRoutes = require('./recommendations');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/daily', dailyRoutes);
router.use('/profile', profileRoutes);
router.use('/progress', progressRoutes);
router.use('/recommendations', recommendationRoutes);

module.exports = router;
