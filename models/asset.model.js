// models/asset.model.js
const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Asset name is required'],
    },
    type: {
      type: String,
      enum: ['image', 'video', 'document', 'other'],
      default: 'other',
    },
    value: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Asset', assetSchema);
