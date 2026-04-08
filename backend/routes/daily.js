const express = require('express');
const { getTodayInput, saveDailyInput } = require('../controllers/dailyController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.get('/', getTodayInput);
router.post('/', saveDailyInput);

module.exports = router;