const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getTransactions,
  getTransactionById,
} = require('../controllers/transaction.controller');

const { protect } = require('../middlewares/auth.middleware');

// Protect all routes
router.use(protect);

// Create and fetch transactions
router.post('/', createTransaction);
router.get('/', getTransactions);
router.get('/:id', getTransactionById);

module.exports = router;
