import pdfParse from 'pdf-parse';
import { FileExtractionError } from '../errors/AnalysisError';

/**
 * File content extraction utility
 * Handles extraction of text content from various file formats
 */
export class FileExtractor {
  /**
   * Extract text content from a file buffer
   * @param fileContent - File content as Buffer
   * @param fileType - MIME type of the file
   * @param filename - Original filename (for error reporting)
   * @returns Extracted text content
   */
  async extractText(fileContent: Buffer, fileType: string, filename?: string): Promise<string> {
    try {
      switch (fileType) {
        case 'application/pdf':
          return await this.extractPdfText(fileContent);
        
        case 'text/csv':
          return this.extractCsvText(fileContent);
        
        case 'text/plain':
        case 'text/txt':
          return this.extractPlainText(fileContent);
        
        default:
          throw new FileExtractionError(
            `Unsupported file type: ${fileType}`,
            fileType
          );
      }
    } catch (error) {
      if (error instanceof FileExtractionError) {
        throw error;
      }
      
      throw new FileExtractionError(
        `Failed to extract text from ${filename || 'file'}: ${error instanceof Error ? error.message : String(error)}`,
        fileType,
        error
      );
    }
  }

  /**
   * Extract text from PDF files using pdf-parse
   * @param pdfBuffer - PDF file as Buffer
   * @returns Extracted text content
   */
  private async extractPdfText(pdfBuffer: Buffer): Promise<string> {
    try {
      const data = await pdfParse(pdfBuffer);
      
      if (!data.text || data.text.trim().length === 0) {
        throw new FileExtractionError(
          'PDF appears to be empty or contains only images',
          'application/pdf'
        );
      }
      
      // Clean up the extracted text
      return this.cleanExtractedText(data.text);
      
    } catch (error) {
      if (error instanceof FileExtractionError) {
        throw error;
      }
      
      throw new FileExtractionError(
        'Failed to parse PDF file. The file might be corrupted or password-protected.',
        'application/pdf',
        error
      );
    }
  }

  /**
   * Extract text from CSV files
   * @param csvBuffer - CSV file as Buffer
   * @returns CSV content as text
   */
  private extractCsvText(csvBuffer: Buffer): string {
    try {
      const text = csvBuffer.toString('utf-8');
      
      if (text.trim().length === 0) {
        throw new FileExtractionError(
          'CSV file appears to be empty',
          'text/csv'
        );
      }
      
      return this.cleanExtractedText(text);
      
    } catch (error) {
      if (error instanceof FileExtractionError) {
        throw error;
      }
      
      throw new FileExtractionError(
        'Failed to read CSV file. The file might use an unsupported encoding.',
        'text/csv',
        error
      );
    }
  }

  /**
   * Extract text from plain text files
   * @param textBuffer - Text file as Buffer
   * @returns Plain text content
   */
  private extractPlainText(textBuffer: Buffer): string {
    try {
      const text = textBuffer.toString('utf-8');
      
      if (text.trim().length === 0) {
        throw new FileExtractionError(
          'Text file appears to be empty',
          'text/plain'
        );
      }
      
      return this.cleanExtractedText(text);
      
    } catch (error) {
      if (error instanceof FileExtractionError) {
        throw error;
      }
      
      throw new FileExtractionError(
        'Failed to read text file. The file might use an unsupported encoding.',
        'text/plain',
        error
      );
    }
  }

  /**
   * Clean and normalize extracted text content
   * @param text - Raw extracted text
   * @returns Cleaned text content
   */
  private cleanExtractedText(text: string): string {
    return text
      // Normalize line breaks
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      
      // Remove excessive whitespace
      .replace(/[ \t]+/g, ' ')
      
      // Remove excessive line breaks (more than 2 consecutive)
      .replace(/\n{3,}/g, '\n\n')
      
      // Trim leading/trailing whitespace
      .trim();
  }

  /**
   * Validate file content before extraction
   * @param fileContent - File content as Buffer
   * @param fileType - MIME type of the file
   * @param maxSize - Maximum file size in bytes (default: 50MB)
   * @returns True if file is valid for extraction
   */
  validateFile(fileContent: Buffer, fileType: string, maxSize: number = 50 * 1024 * 1024): boolean {
    // Check file size
    if (fileContent.length > maxSize) {
      throw new FileExtractionError(
        `File size (${Math.round(fileContent.length / 1024 / 1024)}MB) exceeds maximum allowed size (${Math.round(maxSize / 1024 / 1024)}MB)`,
        fileType
      );
    }

    // Check if buffer is empty
    if (fileContent.length === 0) {
      throw new FileExtractionError(
        'File appears to be empty',
        fileType
      );
    }

    // Validate supported file types
    const supportedTypes = [
      'application/pdf',
      'text/csv',
      'text/plain',
      'text/txt'
    ];

    if (!supportedTypes.includes(fileType)) {
      throw new FileExtractionError(
        `Unsupported file type: ${fileType}. Supported types: ${supportedTypes.join(', ')}`,
        fileType
      );
    }

    return true;
  }

  /**
   * Get supported file types
   * @returns Array of supported MIME types
   */
  getSupportedFileTypes(): string[] {
    return [
      'application/pdf',
      'text/csv',
      'text/plain',
      'text/txt'
    ];
  }

  /**
   * Check if a file type is supported
   * @param fileType - MIME type to check
   * @returns True if the file type is supported
   */
  isFileTypeSupported(fileType: string): boolean {
    return this.getSupportedFileTypes().includes(fileType);
  }

  /**
   * Extract metadata from file content (file type specific)
   * @param fileContent - File content as Buffer
   * @param fileType - MIME type of the file
   * @returns Extracted metadata
   */
  async extractMetadata(fileContent: Buffer, fileType: string): Promise<{
    extractedLength: number;
    estimatedWords: number;
    fileSize: number;
    processingTime: number;
  }> {
    const startTime = Date.now();
    
    try {
      const text = await this.extractText(fileContent, fileType);
      const processingTime = Date.now() - startTime;
      
      return {
        extractedLength: text.length,
        estimatedWords: text.split(/\s+/).length,
        fileSize: fileContent.length,
        processingTime
      };
      
    } catch (error) {
      throw new FileExtractionError(
        `Failed to extract metadata: ${error instanceof Error ? error.message : String(error)}`,
        fileType,
        error
      );
    }
  }
}
