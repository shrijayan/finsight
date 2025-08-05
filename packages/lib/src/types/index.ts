// Shared types between frontend and backend
// This file will contain shared TypeScript types and interfaces

/**
 * User interface representing a user in the system
 */
export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User creation data (without _id, timestamps)
 */
export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

/**
 * User update data (partial fields)
 */
export interface UpdateUserData {
  name?: string;
  email?: string;
}

/**
 * File upload status types
 */
export type UploadStatus = 'pending' | 'uploading' | 'success' | 'error';

/**
 * Uploaded file information
 */
export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  size: number;
  type: string;
  url: string;
  userId: string;
  status: UploadStatus;
  uploadedAt: Date;
}

/**
 * File upload request data
 */
export interface FileUploadRequest {
  files: File[];
}

/**
 * File upload response data
 */
export interface FileUploadResponse {
  message: string;
  fileReferences: string[];
  uploadId: string;
}

/**
 * File validation error
 */
export interface FileValidationError {
  filename: string;
  error: string;
  code: 'INVALID_TYPE' | 'FILE_TOO_LARGE' | 'INVALID_FILE';
}

/**
 * Upload progress information
 */
export interface UploadProgress {
  filename: string;
  progress: number;
  status: UploadStatus;
}

/**
 * Analysis status types
 */
export type AnalysisStatus = 'processing' | 'completed' | 'failed';

/**
 * Analysis report interface representing a financial analysis report
 */
export interface AnalysisReport {
  _id: string;
  userId: string;
  uploadId?: string;
  reportTitle: string;
  sourceDocumentCount: number;
  status: AnalysisStatus;
  progress?: number;
  generatedData?: {
    totalIncome: number;
    totalExpenses: number;
    netCashFlow: number;
    categories: {
      income: Array<{
        category: string;
        amount: number;
        percentage: number;
      }>;
      expenses: Array<{
        category: string;
        amount: number;
        percentage: number;
      }>;
    };
    monthlyTrends: Array<{
      month: string;
      income: number;
      expenses: number;
    }>;
    insights: Array<{
      type: string;
      description: string;
      severity: 'low' | 'medium' | 'high';
    }>;
    recommendations: Array<{
      category: string;
      suggestion: string;
      potentialSavings: number;
    }>;
    summary: string;
  };
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

/**
 * Analysis report creation data (without _id, timestamps)
 */
export interface CreateAnalysisReportData {
  userId: string;
  uploadId?: string;
  reportTitle: string;
  sourceDocumentCount: number;
  status?: AnalysisStatus;
  progress?: number;
  generatedData?: AnalysisReport['generatedData'];
}

/**
 * Analysis report update data (partial fields)
 */
export interface UpdateAnalysisReportData {
  reportTitle?: string;
  status?: AnalysisStatus;
  progress?: number;
  generatedData?: AnalysisReport['generatedData'];
  completedAt?: Date;
}

/**
 * Report history item for display in history dashboard
 */
export interface ReportHistoryItem {
  id: string;
  title: string;
  createdAt: Date;
  sourceDocumentCount: number;
  status: AnalysisStatus;
  keyMetrics: {
    totalIncome: number;
    totalExpenses: number;
    netCashFlow: number;
  };
}

/**
 * Report history pagination data
 */
export interface ReportHistoryPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

/**
 * Report history response from API
 */
export interface ReportHistoryResponse {
  reports: ReportHistoryItem[];
  pagination: ReportHistoryPagination;
}
