// controllers/transaction.controller.js
const Transaction = require('../models/transaction.model');
const Asset = require('../models/asset.model');
const User = require('../models/user.model');

// @desc Create a new transaction
// @route POST /transactions
// @access Private
exports.createTransaction = async (req, res, next) => {
  try {
    const { assetId, toUserId, type, notes } = req.body;

    // Validate type
    if (!['transfer', 'share'].includes(type)) {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }

    // Check if asset exists and belongs to requester
    const asset = await Asset.findOne({ _id: assetId, owner: req.user._id });
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found or not owned by user' });
    }

    // Check if recipient user exists
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: 'Recipient user not found' });
    }

    let transaction;

    if (type === 'transfer') {
      // Transfer ownership of the asset
      asset.owner = toUserId;
      await asset.save();
    } else if (type === 'share') {
      // Create a new asset with same info for the recipient
      const duplicatedAsset = new Asset({
        name: asset.name,
        type: asset.type,
        value: asset.value,
        owner: toUserId,
      });
      await duplicatedAsset.save();
    }

    // Record the transaction
    transaction = await Transaction.create({
      asset: assetId,
      fromUser: req.user._id,
      toUser: toUserId,
      type,
      notes,
    });

    res.status(201).json({
      message: `Asset ${type === 'transfer' ? 'transferred' : 'shared'} successfully`,
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all transactions for current user (sent or received)
// @route GET /transactions
// @access Private
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ fromUser: req.user._id }, { toUser: req.user._id }],
    })
      .populate('asset', 'name type value')
      .populate('fromUser', 'name email')
      .populate('toUser', 'name email')
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

// @desc Get a transaction by ID
// @route GET /transactions/:id
// @access Private
exports.getTransactionById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const transaction = await Transaction.findById(id)
        .populate('asset', 'name type value')
        .populate('fromUser', 'name email')
        .populate('toUser', 'name email');
  
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
  
      // Ensure the user is either sender or recipient
      const isAuthorized =
        transaction.fromUser._id.toString() === req.user._id.toString() ||
        transaction.toUser._id.toString() === req.user._id.toString();
  
      if (!isAuthorized) {
        return res.status(403).json({ message: 'Access denied to this transaction' });
      }
  
      res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  };
  