const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const auth = require('../middleware/auth');

const router = express.Router();

// ✅ Apply auth to all profile routes
router.use(auth);

router.get('/', getProfile);
router.put('/', updateProfile);

module.exports = router;