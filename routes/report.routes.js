const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const { getSystemSummary } = require('../controllers/report.controller');

router.use(protect); // JWT authentication

router.get('/', getSystemSummary);

module.exports = router;
