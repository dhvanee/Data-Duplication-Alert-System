import mongoose from 'mongoose';

const datasetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  fileType: {
    type: String,
    required: true,
    enum: ['pdf', 'csv', 'xlsx', 'doc']
  },
  size: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  checksum: {
    type: String,
    required: true
  },
  metadata: {
    department: {
      type: String,
      required: true,
      enum: ['research', 'academic', 'administrative']
    },
    tags: [{
      type: String,
      trim: true
    }],
    accessLevel: {
      type: String,
      enum: ['public', 'department', 'private'],
      default: 'public'
    }
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {
    type: String,
    required: true
  },
  downloads: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    downloadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  similarFiles: [{
    datasetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dataset'
    },
    similarity: {
      type: Number,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  }
});

// Index for text search
datasetSchema.index({
  name: 'text',
  description: 'text',
  'metadata.tags': 'text'
});

// Method to check for duplicates
datasetSchema.methods.findDuplicates = async function() {
  const duplicates = await this.model('Dataset').find({
    _id: { $ne: this._id },
    checksum: this.checksum
  });

  if (duplicates.length > 0) {
    return duplicates;
  }

  // If no exact matches, look for similar files
  return await this.model('Dataset').find({
    _id: { $ne: this._id },
    'similarFiles.similarity': { $gte: 0.8 }
  }).populate('similarFiles.datasetId');
};

// Method to update last accessed time
datasetSchema.methods.updateLastAccessed = async function() {
  this.lastAccessed = new Date();
  await this.save();
};

// Pre-save hook to generate checksum if not present
datasetSchema.pre('save', async function(next) {
  if (!this.isModified('location')) return next();
  
  try {
    const crypto = await import('crypto');
    const fs = await import('fs');
    
    const fileBuffer = await fs.promises.readFile(this.location);
    this.checksum = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    next();
  } catch (error) {
    next(error);
  }
});

const Dataset = mongoose.model('Dataset', datasetSchema);

export default Dataset; 