// routes/asset.routes.js
const express = require('express');
const router = express.Router();
const {
  createAsset,
  getAssets,
  getAssetById,
  deleteAsset,
} = require('../controllers/asset.controller');

const { protect } = require('../middlewares/auth.middleware');

// Protect all routes
router.use(protect);

router.post('/', createAsset);
router.get('/', getAssets);
router.get('/:id', getAssetById);
router.delete('/:id', deleteAsset);

module.exports = router;
