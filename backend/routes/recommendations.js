const express = require('express');
const { generate, getLatest, getHistory } = require('../controllers/recommendationController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.post('/generate', generate);
router.get('/latest', getLatest);
router.get('/history', getHistory);

module.exports = router;