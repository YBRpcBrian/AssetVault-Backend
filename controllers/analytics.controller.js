const {
    getUserGrowth,
    getAssetDistribution,
    getTransactionVolume
  } = require('../services/analytics.service');
  
  exports.getDashboardGraphs = async (req, res) => {
    try {
      const [users, assets, transactions] = await Promise.all([
        getUserGrowth(),
        getAssetDistribution(),
        getTransactionVolume()
      ]);
  
      res.status(200).json({
        success: true,
        data: {
          userGrowth: users,
          assetDistribution: assets,
          transactionVolume: transactions
        }
      });
    } catch (error) {
      console.error("Dashboard Analytics Error:", error);
      res.status(500).json({ message: 'Failed to load dashboard analytics' });
    }
  };
  