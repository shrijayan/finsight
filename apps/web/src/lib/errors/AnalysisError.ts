/**
 * Custom error class for analysis-related errors
 * Used to provide more specific error handling for the analysis workflow
 */
export class AnalysisError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = 'AnalysisError';
    
    // Maintain proper stack trace for where our error was thrown (Node.js only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AnalysisError);
    }
  }
}

/**
 * Custom error class for Gemini AI API related errors
 * Used to handle specific API errors with status codes
 */
export class GeminiAPIError extends Error {
  constructor(message: string, public statusCode?: number, public originalError?: any) {
    super(message);
    this.name = 'GeminiAPIError';
    
    // Maintain proper stack trace for where our error was thrown (Node.js only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GeminiAPIError);
    }
  }
}

/**
 * Custom error class for file extraction related errors
 * Used to handle specific file processing errors
 */
export class FileExtractionError extends Error {
  constructor(message: string, public fileType?: string, public originalError?: any) {
    super(message);
    this.name = 'FileExtractionError';
    
    // Maintain proper stack trace for where our error was thrown (Node.js only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FileExtractionError);
    }
  }
}
