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

app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>AssetVault API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f8fb;
            color: #333;
            margin: 0;
            padding: 2rem;
          }
          h1 {
            color: #007bff;
          }
          code {
            background-color: #eaeaea;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            display: inline-block;
          }
          .endpoint-group {
            margin-top: 1.5rem;
          }
          .endpoint-group h3 {
            color: #444;
          }
          .endpoint {
            margin-left: 1rem;
            margin-bottom: 0.5rem;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .footer {
            margin-top: 3rem;
            font-size: 0.9rem;
            color: #888;
          }
        </style>
      </head>
      <body>
        <h1>🎉 Welcome to the AssetVault Backend API</h1>
        <p>Use <strong>Postman</strong> or a similar API client to test the endpoints.</p>
        <p>📘 <a href="https://www.notion.so/AssetVault-API-Backend-Documentation-2275ecb9621a806eac75f6393c4e0f3b" target="_blank">View API Documentation</a></p>
        <p><strong>Base URL:</strong> <code>https://assetvault-backend.onrender.com</code></p>
  
        <div class="endpoint-group">
          <h3>🔐 Users</h3>
          <div class="endpoint"><code>POST /users/register</code> - Create an account</div>
          <div class="endpoint"><code>POST /users/login</code> - Login</div>
        </div>
  
        <div class="endpoint-group">
          <h3>💼 Assets</h3>
          <div class="endpoint"><code>POST /assets</code> - Create an asset</div>
          <div class="endpoint"><code>GET /assets</code> - Get all assets</div>
          <div class="endpoint"><code>GET /assets/:id</code> - Get asset by ID</div>
          <div class="endpoint"><code>DELETE /assets/:id</code> - Delete asset by ID</div>
        </div>
  
        <div class="endpoint-group">
          <h3>💰 Transactions</h3>
          <div class="endpoint"><code>POST /transactions</code> - Create a transaction</div>
          <div class="endpoint"><code>GET /transactions</code> - Get all transactions</div>
          <div class="endpoint"><code>GET /transactions/:id</code> - Get transaction by ID</div>
        </div>
  
        <div class="endpoint-group">
          <h3>📊 Reports</h3>
          <div class="endpoint"><code>GET /reports</code> - Get system summary report</div>
        </div>
  
        <div class="endpoint-group">
          <h3>📈 Analytics</h3>
          <div class="endpoint"><code>GET /analytics/graphs</code> - Get dashboard analytics</div>
        </div>
  
        <div class="footer">
          Built with ❤️ by Brian Yabuin Rinda — AssetVault API v1.0
        </div>
      </body>
      </html>
    `);
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
