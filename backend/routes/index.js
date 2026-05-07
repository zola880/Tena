const express = require('express');
const router = express.Router();

// ✅ Route imports
const authRoutes = require('./auth');
const dailyRoutes = require('./daily');
const profileRoutes = require('./profile');
const progressRoutes = require('./progress');
const recommendationRoutes = require('./recommendations');

// ✅ Mount routes (order matters for CORS)
router.use('/auth', authRoutes);           // → /api/auth/*
router.use('/daily', dailyRoutes);         // → /api/daily/*
router.use('/profile', profileRoutes);     // → /api/profile/*
router.use('/progress', progressRoutes);   // → /api/progress/*
router.use('/recommendations', recommendationRoutes); // → /api/recommendations/*

// ✅ Debug: log mounted routes (optional, remove after testing)
if (process.env.NODE_ENV !== 'production') {
  router.use((req, res, next) => {
    console.log(`[ROUTE] ${req.method} ${req.path}`);
    next();
  });
}

module.exports = router;