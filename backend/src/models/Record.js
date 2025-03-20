import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'duplicate'],
    default: 'active'
  },
  duplicateOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Record',
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Update the updatedAt timestamp before saving
recordSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Record = mongoose.model('Record', recordSchema); 