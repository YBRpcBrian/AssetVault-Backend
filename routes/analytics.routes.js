const express = require('express');
const router = express.Router();
const { getDashboardGraphs } = require('../controllers/analytics.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);
router.get('/graphs', getDashboardGraphs);

module.exports = router;
