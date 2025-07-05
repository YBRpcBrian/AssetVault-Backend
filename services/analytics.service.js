const User = require('../models/user.model');
const Asset = require('../models/asset.model');
const Transaction = require('../models/transaction.model');

const getUserGrowth = async () => {
  const result = await User.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]);

  return result.map(r => ({
    date: `${r._id.year}-${String(r._id.month).padStart(2, '0')}`,
    count: r.count
  }));
};

const getAssetDistribution = async () => {
  return await Asset.aggregate([
    { $group: { _id: "$type", count: { $sum: 1 } } }
  ]);
};

const getTransactionVolume = async () => {
  return await Transaction.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]).then(results => results.map(r => ({
    date: `${r._id.year}-${String(r._id.month).padStart(2, '0')}`,
    count: r.count
  })));
};

module.exports = {
  getUserGrowth,
  getAssetDistribution,
  getTransactionVolume
};
