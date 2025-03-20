import mongoose from 'mongoose';
import stringSimilarity from 'string-similarity';

const recordSchema = new mongoose.Schema({
  // Basic fields that all records will have
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  // Dynamic fields stored as key-value pairs
  data: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // Duplicate detection fields
  isDuplicate: {
    type: Boolean,
    default: false
  },
  duplicateOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Record',
    default: null
  },
  duplicateScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'merged', 'deleted'],
    default: 'active'
  }
});

// Update the updatedAt timestamp before saving
recordSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Helper function to normalize strings for comparison
function normalizeString(str) {
  return str ? str.toLowerCase().trim().replace(/[^a-z0-9]/g, '') : '';
}

// Method to find potential duplicates
recordSchema.methods.findDuplicates = async function(threshold = 0.8) {
  try {
    // Get all other active records
    const otherRecords = await this.constructor.find({
      _id: { $ne: this._id },
      status: 'active'
    });

    const duplicates = [];

    for (const record of otherRecords) {
      let totalScore = 0;
      let fieldsChecked = 0;

      // Compare name similarity
      if (this.name && record.name) {
        const nameScore = stringSimilarity.compareTwoStrings(
          normalizeString(this.name),
          normalizeString(record.name)
        );
        totalScore += nameScore;
        fieldsChecked++;
      }

      // Compare email similarity
      if (this.email && record.email) {
        const emailScore = stringSimilarity.compareTwoStrings(
          normalizeString(this.email),
          normalizeString(record.email)
        );
        totalScore += emailScore;
        fieldsChecked++;
      }

      // Compare phone similarity
      if (this.phone && record.phone) {
        const normalizedPhone1 = this.phone.replace(/[^0-9]/g, '');
        const normalizedPhone2 = record.phone.replace(/[^0-9]/g, '');
        const phoneScore = normalizedPhone1 === normalizedPhone2 ? 1 : 0;
        totalScore += phoneScore;
        fieldsChecked++;
      }

      // Calculate average similarity score
      const averageScore = fieldsChecked > 0 ? totalScore / fieldsChecked : 0;

      // If score is above threshold, consider it a duplicate
      if (averageScore >= threshold) {
        duplicates.push({
          _id: record._id,
          name: record.name,
          email: record.email,
          phone: record.phone,
          score: averageScore
        });
      }
    }

    // Sort duplicates by score in descending order
    return duplicates.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Error finding duplicates:', error);
    return [];
  }
};

const Record = mongoose.model('Record', recordSchema);

export default Record; 