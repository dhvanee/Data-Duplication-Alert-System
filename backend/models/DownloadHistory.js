const mongoose = require('mongoose');

const downloadHistorySchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  downloadedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster lookups
downloadHistorySchema.index({ fileId: 1 });
downloadHistorySchema.index({ userId: 1 });

module.exports = mongoose.model('DownloadHistory', downloadHistorySchema);