import mongoose from 'mongoose';
import { AnalysisReport as IAnalysisReport } from 'lib/src/types';

// AnalysisReport schema definition
const analysisReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.Mixed, // Allow both ObjectId (authenticated users) and String (guest users)
    required: true,
    index: true // Indexed for fast lookups of user's reports
  },
  uploadId: {
    type: String,
    required: false
  },
  reportTitle: {
    type: String,
    required: true
  },
  sourceDocumentCount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing',
    required: true
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  generatedData: {
    type: Object, // Flexible object to store JSON output from Gemini
    required: false
  },
  completedAt: {
    type: Date,
    required: false
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Add compound index for userId and createdAt for efficient sorting
analysisReportSchema.index({ userId: 1, createdAt: -1 });

// Add index for status to help with filtering
analysisReportSchema.index({ status: 1 });

// Add compound index for userId and status
analysisReportSchema.index({ userId: 1, status: 1 });

// Create and export the AnalysisReport model
const AnalysisReport = mongoose.models?.AnalysisReport || 
  mongoose.model<IAnalysisReport>('AnalysisReport', analysisReportSchema);

export default AnalysisReport;
