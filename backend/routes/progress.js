const express = require('express');
const { addEntry, getEntries } = require('../controllers/progressController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.post('/', addEntry);
router.get('/', getEntries);

module.exports = router;