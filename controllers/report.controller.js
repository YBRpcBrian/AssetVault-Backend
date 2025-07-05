const Transaction = require('../models/transaction.model');
const Asset = require('../models/asset.model');
const User = require('../models/user.model');

// GET /reports/summary
const getSystemSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAssets = await Asset.countDocuments();
    const totalTransactions = await Transaction.countDocuments();

    const assetsGroupedByType = await Asset.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ]);

    const transactionsGroupedByType = await Transaction.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      summary: {
        totalUsers,
        totalAssets,
        totalTransactions,
        assetsByType: assetsGroupedByType,
        transactionsByType: transactionsGroupedByType
      }
    });
  } catch (err) {
    console.error("Report error:", err);
    res.status(500).json({ message: 'Failed to generate report' });
  }
};

module.exports = {
  getSystemSummary
};
