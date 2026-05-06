const express = require('express');
const { register, login } = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.'
});

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

module.exports = router;