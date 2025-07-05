// routes/user.routes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require('../controllers/user.controller');

const { protect } = require('../middlewares/auth.middleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route
router.get('/', protect, getAllUsers);

module.exports = router;
