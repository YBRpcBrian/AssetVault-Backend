// controllers/asset.controller.js
const Asset = require('../models/asset.model');

// @desc Add a new asset
// @route POST /assets
// @access Private
exports.createAsset = async (req, res, next) => {
  try {
    const { name, type, value } = req.body;

    const asset = await Asset.create({
      name,
      type,
      value,
      owner: req.user._id,
    });

    res.status(201).json({
      message: 'Asset created successfully',
      asset,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all assets (owned by user)
// @route GET /assets
// @access Private
exports.getAssets = async (req, res, next) => {
  try {
    const assets = await Asset.find({ owner: req.user._id });
    res.json(assets);
  } catch (error) {
    next(error);
  }
};

// @desc Get single asset by ID (owned by user)
// @route GET /assets/:id
// @access Private
exports.getAssetById = async (req, res, next) => {
  try {
    const asset = await Asset.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!asset) return res.status(404).json({ message: 'Asset not found' });

    res.json(asset);
  } catch (error) {
    next(error);
  }
};

// @desc Delete an asset
// @route DELETE /assets/:id
// @access Private
exports.deleteAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!asset) return res.status(404).json({ message: 'Asset not found or unauthorized' });

    res.json({ message: 'Asset deleted successfully' });
  } catch (error) {
    next(error);
  }
};
