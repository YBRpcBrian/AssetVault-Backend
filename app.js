const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const assetRoutes = require('./routes/asset.routes');
const transactionRoutes = require('./routes/transaction.routes');
const reportRoutes = require('./routes/report.routes');
const analyticsRoutes = require('./routes/analytics.routes');

const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Root welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    message: '🎉 Welcome to the AssetVault Backend API!',
    info: 'Use Postman or a similar API client to test the endpoints.',
    documentation: 'https://www.notion.so/AssetVault-API-Backend-Documentation-2275ecb9621a806eac75f6393c4e0f3b',
    base_url: 'https://assetvault-backend.onrender.com',
    endpoints: {
      Users: {
        createAccount: 'POST https://assetvault-backend.onrender.com/users/register',
        login: 'POST https://assetvault-backend.onrender.com/users/login'
      },
      Assets: {
        create: 'POST https://assetvault-backend.onrender.com/assets',
        getAll: 'GET https://assetvault-backend.onrender.com/assets',
        getById: 'GET https://assetvault-backend.onrender.com/assets/:id',
        delete: 'DELETE https://assetvault-backend.onrender.com/assets/:id'
      },
      Transactions: {
        create: 'POST https://assetvault-backend.onrender.com/transactions',
        getAll: 'GET https://assetvault-backend.onrender.com/transactions',
        getById: 'GET https://assetvault-backend.onrender.com/transactions/:id'
      },
      Reports: {
        summary: 'GET https://assetvault-backend.onrender.com/reports'
      },
      Analytics: {
        graphs: 'GET https://assetvault-backend.onrender.com/analytics/graphs'
      }
    }
  });
});

// Routes
app.use('/users', userRoutes);
app.use('/assets', assetRoutes);
app.use('/transactions', transactionRoutes);
app.use('/reports', reportRoutes);
app.use('/analytics', analyticsRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
