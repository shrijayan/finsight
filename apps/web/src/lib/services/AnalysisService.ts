import { GoogleGenAI } from '@google/genai';
import { analysisReportRepository } from 'db/src/repositories/AnalysisReportRepository';
import { AnalysisError } from '../errors/AnalysisError';
import { CreateAnalysisReportData, AnalysisReport } from 'lib/src/types';
import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * Enhanced analysis service using Gemini's native document processing capabilities
 * This service bypasses text extraction and uses Gemini's document understanding directly
 */
export class AnalysisService {
  private client: GoogleGenAI | null;
  private readonly modelName: string;
  private readonly apiKeyConfigured: boolean;

  constructor() {
    this.apiKeyConfigured = !!process.env.GEMINI_API_KEY;
    this.modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    
    if (!this.apiKeyConfigured) {
      console.warn('GEMINI_API_KEY not configured - AI analysis will be skipped');
      this.client = null;
      return;
    }

    this.client = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY!
    });
  }

  /**
   * Process analysis for uploaded files using native Gemini document understanding
   * @param uploadId - Unique identifier for the upload batch
   * @param fileReferences - Array of local file paths for uploaded files
   * @param userId - User ID who owns the files
   * @param options - Optional configuration
   * @returns Analysis report ID
   */
  async processAnalysis(
    uploadId: string,
    fileReferences: string[],
    userId: string,
    options: {
      reportTitle?: string;
      priority?: 'low' | 'normal' | 'high';
    } = {}
  ): Promise<string> {
    const startTime = Date.now();
    
    try {
      console.log(`Starting Gemini native analysis for upload ${uploadId} with ${fileReferences.length} files`);

      // Validate inputs
      if (!fileReferences || fileReferences.length === 0) {
        throw new AnalysisError('No file references provided for analysis');
      }

      if (!userId) {
        throw new AnalysisError('User ID is required for analysis');
      }

      // Create initial analysis report record
      const reportTitle = options.reportTitle || `Financial Analysis - ${new Date().toLocaleDateString()}`;
      const analysisReport = await this.createInitialReport({
        userId,
        uploadId,
        reportTitle,
        sourceDocumentCount: fileReferences.length,
        status: 'processing',
        progress: 0,
      });

      console.log(`Created analysis report ${analysisReport._id}`);

      try {
        // Update progress: Starting file processing
        await this.updateProgress(analysisReport._id, 20, 'Processing documents with AI...');

        // Process files directly with Gemini
        const analysisResults = await this.analyzeDocumentsWithGemini(fileReferences, userId);

        console.log('Gemini native analysis completed successfully');

        // Update progress: Analysis complete, saving results
        await this.updateProgress(analysisReport._id, 80, 'Saving analysis results...');

        // Enhance analysis results with metadata
        const enhancedResults = {
          ...analysisResults,
          metadata: {
            processingTime: Date.now() - startTime,
            filesProcessed: fileReferences.length,
            analysisTimestamp: new Date().toISOString(),
            modelUsed: this.modelName,
            useNativeDocumentUnderstanding: true
          }
        };

        // Save analysis results to database
        await this.completeAnalysis(analysisReport._id, enhancedResults);

        console.log(`Analysis completed successfully for report ${analysisReport._id}`);
        return analysisReport._id;

      } catch (error) {
        // Mark analysis as failed
        await this.markAnalysisFailed(analysisReport._id, error);
        throw error;
      }

    } catch (error) {
      console.error('Analysis failed:', error);
      
      if (error instanceof AnalysisError) {
        throw error;
      }
      
      throw new AnalysisError(
        `Failed to process financial analysis: ${error instanceof Error ? error.message : String(error)}`,
        error
      );
    }
  }

  /**
   * Analyze documents using Gemini's native document understanding
   * @param fileReferences - Array of file references (local:// paths)
   * @param userId - User ID for access control
   * @returns Analysis results from Gemini
   */
  private async analyzeDocumentsWithGemini(
    fileReferences: string[],
    userId: string
  ): Promise<any> {
    if (!this.client) {
      console.log('Gemini client not available, returning placeholder analysis');
      return this.generatePlaceholderAnalysis(fileReferences);
    }

    try {
      // Prepare document contents for Gemini
      const contents = [];
      
      // Add the financial analysis prompt
      contents.push({
        text: `You are a financial analyst AI. Analyze the following bank statement/financial documents and provide a comprehensive financial analysis.

Please analyze this financial data and return a JSON response with the following structure:
{
  "totalIncome": number,
  "totalExpenses": number,
  "netCashFlow": number,
  "categories": {
    "income": [
      { "category": "string", "amount": number, "percentage": number }
    ],
    "expenses": [
      { "category": "string", "amount": number, "percentage": number }
    ]
  },
  "monthlyTrends": [
    { "month": "string", "income": number, "expenses": number }
  ],
  "insights": [
    { "type": "string", "description": "string", "severity": "low|medium|high" }
  ],
  "recommendations": [
    { "category": "string", "suggestion": "string", "potentialSavings": number }
  ],
  "summary": "string"
}

Focus on:
1. Categorizing transactions (salary, groceries, utilities, entertainment, etc.)
2. Identifying spending patterns and trends
3. Calculating totals and percentages
4. Providing actionable insights and recommendations
5. Highlighting any unusual or concerning patterns

Important guidelines:
- Ensure all amounts are positive numbers
- Percentages should be calculated accurately and sum to 100 for each category type
- Provide meaningful insights based on the data patterns
- Include at least 3-5 actionable recommendations
- Categorize expenses into common categories like: Housing, Transportation, Food, Entertainment, Healthcare, Utilities, Shopping, etc.
- For income, categorize into: Salary, Freelance, Investment, Benefits, etc.
- Only return valid JSON without any markdown formatting or additional text
- If data is insufficient for certain fields, use reasonable defaults (0 for amounts, empty arrays for categories)`
      });

      // Process each file
      for (let i = 0; i < fileReferences.length; i++) {
        const fileRef = fileReferences[i];
        console.log(`Processing file ${i + 1}/${fileReferences.length}: ${fileRef}`);

        try {
          if (fileRef.startsWith('local://')) {
            // Handle local file
            const localPath = fileRef.replace('local://', '');
            const filePath = join(process.cwd(), 'uploads', localPath);
            
            // Read file as buffer
            const fileBuffer = await readFile(filePath);
            const filename = this.extractFilename(fileRef) || `document-${i + 1}`;
            
            // Determine file type
            const extension = localPath.toLowerCase().split('.').pop();
            
            if (extension === 'pdf') {
              // Use Gemini's native PDF processing
              contents.push({
                inlineData: {
                  mimeType: 'application/pdf',
                  data: fileBuffer.toString('base64')
                }
              });
            } else if (extension === 'txt' || extension === 'csv') {
              // For text files, add as text content
              const textContent = fileBuffer.toString('utf-8');
              contents.push({
                text: `Document: ${filename}\n\n${textContent}`
              });
            } else {
              console.warn(`Unsupported file type for ${filename}, skipping`);
            }
          }
        } catch (error) {
          console.error(`Failed to process file ${fileRef}:`, error);
          // Continue with other files
        }
      }

      // Call Gemini API
      console.log('Sending documents to Gemini for analysis...');
      const response = await this.client.models.generateContent({
        model: this.modelName,
        contents
      });

      if (!response || !response.text) {
        throw new AnalysisError('Empty response from Gemini API');
      }

      // Parse JSON response
      const cleanedText = this.cleanJsonResponse(response.text);
      const analysisData = JSON.parse(cleanedText);
      
      return this.validateAnalysisStructure(analysisData);

    } catch (error) {
      console.error('Gemini analysis failed:', error);
      
      if (error instanceof AnalysisError) {
        throw error;
      }
      
      throw new AnalysisError(
        `Gemini document analysis failed: ${error instanceof Error ? error.message : String(error)}`,
        error
      );
    }
  }

  /**
   * Clean JSON response from potential markdown formatting
   * @param text - Raw response text
   * @returns Cleaned JSON string
   */
  private cleanJsonResponse(text: string): string {
    // Remove markdown code blocks if present
    let cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Remove any leading/trailing whitespace
    cleaned = cleaned.trim();
    
    // If the response starts with explanation text, try to extract just the JSON
    if (!cleaned.startsWith('{')) {
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleaned = jsonMatch[0];
      }
    }
    
    return cleaned;
  }

  /**
   * Validate the structure of the AI analysis response
   * @param data - Raw analysis data from AI
   * @returns Validated and normalized analysis data
   */
  private validateAnalysisStructure(data: any): any {
    if (!data || typeof data !== 'object') {
      throw new AnalysisError('AI response is not a valid object');
    }

    // Check required fields
    const requiredFields = ['totalIncome', 'totalExpenses', 'categories', 'insights', 'recommendations', 'summary'];
    const missingFields = requiredFields.filter(field => !(field in data));
    
    if (missingFields.length > 0) {
      throw new AnalysisError(`Missing required fields in AI response: ${missingFields.join(', ')}`);
    }

    // Validate and normalize numeric fields
    data.totalIncome = this.validateNumber(data.totalIncome, 'totalIncome');
    data.totalExpenses = this.validateNumber(data.totalExpenses, 'totalExpenses');
    
    // Calculate netCashFlow if not provided or incorrect
    data.netCashFlow = data.totalIncome - data.totalExpenses;

    // Validate categories structure
    if (!data.categories || typeof data.categories !== 'object') {
      throw new AnalysisError('Categories field must be an object');
    }

    if (!Array.isArray(data.categories.income)) {
      data.categories.income = [];
    }

    if (!Array.isArray(data.categories.expenses)) {
      data.categories.expenses = [];
    }

    // Validate arrays
    data.monthlyTrends = Array.isArray(data.monthlyTrends) ? data.monthlyTrends : [];
    data.insights = Array.isArray(data.insights) ? data.insights : [];
    data.recommendations = Array.isArray(data.recommendations) ? data.recommendations : [];

    // Ensure summary is a string
    if (typeof data.summary !== 'string') {
      data.summary = String(data.summary || '');
    }

    return data;
  }

  /**
   * Generate placeholder analysis when Gemini is not available
   * @param fileReferences - Array of file references
   * @returns Mock analysis data structure
   */
  private generatePlaceholderAnalysis(fileReferences: string[]): any {
    const estimatedIncome = 5000; // Mock estimation
    const estimatedExpenses = 3500;

    return {
      totalIncome: estimatedIncome,
      totalExpenses: estimatedExpenses,
      netCashFlow: estimatedIncome - estimatedExpenses,
      categories: {
        income: [
          { category: 'Salary', amount: estimatedIncome * 0.9, percentage: 90 },
          { category: 'Other Income', amount: estimatedIncome * 0.1, percentage: 10 }
        ],
        expenses: [
          { category: 'Housing', amount: estimatedExpenses * 0.3, percentage: 30 },
          { category: 'Food', amount: estimatedExpenses * 0.2, percentage: 20 },
          { category: 'Transportation', amount: estimatedExpenses * 0.15, percentage: 15 },
          { category: 'Utilities', amount: estimatedExpenses * 0.1, percentage: 10 },
          { category: 'Entertainment', amount: estimatedExpenses * 0.1, percentage: 10 },
          { category: 'Other', amount: estimatedExpenses * 0.15, percentage: 15 }
        ]
      },
      monthlyTrends: [
        { month: 'Current', income: estimatedIncome, expenses: estimatedExpenses }
      ],
      insights: [
        { type: 'Demo Mode', description: 'AI analysis requires Gemini API key configuration', severity: 'low' },
        { type: 'File Processing', description: 'Files uploaded successfully and ready for analysis', severity: 'low' }
      ],
      recommendations: [
        { category: 'Setup', suggestion: 'Configure Gemini API key for real AI insights', potentialSavings: 0 },
        { category: 'Analysis', suggestion: 'Upload bank statements for comprehensive analysis', potentialSavings: 0 }
      ],
      summary: `Demo analysis completed for ${fileReferences.length} document(s). This is placeholder data. Configure GEMINI_API_KEY for real AI-powered insights.`,
      metadata: {
        isPlaceholderData: true
      }
    };
  }

  /**
   * Validate and normalize a numeric field
   * @param value - Value to validate
   * @param fieldName - Name of the field for error reporting
   * @returns Validated numeric value
   */
  private validateNumber(value: any, fieldName: string): number {
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      if (!isNaN(parsed)) {
        return Math.max(0, parsed);
      }
    }
    
    if (typeof value === 'number' && !isNaN(value)) {
      return Math.max(0, value);
    }
    
    console.warn(`Invalid ${fieldName} value: ${value}, defaulting to 0`);
    return 0;
  }

  /**
   * Extract filename from file URL
   * @param fileUrl - File URL
   * @returns Extracted filename
   */
  private extractFilename(fileUrl: string): string | null {
    try {
      const parts = fileUrl.split('/');
      return parts[parts.length - 1] || null;
    } catch (error) {
      console.warn(`Failed to extract filename from URL: ${fileUrl}`);
      return null;
    }
  }

  /**
   * Create initial analysis report in the database
   */
  private async createInitialReport(reportData: CreateAnalysisReportData): Promise<AnalysisReport> {
    try {
      return await analysisReportRepository.create(reportData);
    } catch (error) {
      throw new AnalysisError(
        `Failed to create analysis report: ${error instanceof Error ? error.message : String(error)}`,
        error
      );
    }
  }

  /**
   * Update analysis progress
   */
  private async updateProgress(reportId: string, progress: number, status?: string): Promise<void> {
    try {
      await analysisReportRepository.updateById(reportId, {
        progress: Math.max(0, Math.min(100, progress))
      });
      
      if (status) {
        console.log(`Analysis ${reportId}: ${progress}% - ${status}`);
      }
    } catch (error) {
      console.error(`Failed to update progress for analysis ${reportId}:`, error);
    }
  }

  /**
   * Complete analysis and save final results
   */
  private async completeAnalysis(reportId: string, analysisResults: any): Promise<void> {
    try {
      await analysisReportRepository.updateById(reportId, {
        generatedData: analysisResults,
        status: 'completed',
        progress: 100,
        completedAt: new Date()
      });
    } catch (error) {
      throw new AnalysisError(
        `Failed to save analysis results: ${error instanceof Error ? error.message : String(error)}`,
        error
      );
    }
  }

  /**
   * Mark analysis as failed
   */
  private async markAnalysisFailed(reportId: string, error: any): Promise<void> {
    try {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorData = {
        error: errorMessage,
        errorType: error.constructor.name,
        failedAt: new Date().toISOString()
      };

      await analysisReportRepository.updateById(reportId, {
        status: 'failed',
        generatedData: errorData as any,
        completedAt: new Date()
      });
    } catch (updateError) {
      console.error(`Failed to mark analysis ${reportId} as failed:`, updateError);
    }
  }

  /**
   * Get analysis status by report ID
   */
  async getAnalysisStatus(reportId: string, userId: string): Promise<AnalysisReport | null> {
    try {
      const report = await analysisReportRepository.findById(reportId);
      
      if (!report) {
        return null;
      }

      // Handle migration period: check both ObjectId and email formats
      let hasAccess = false;
      
      // Convert both values to strings for consistent comparison
      const reportUserIdStr = report.userId?.toString() || '';
      const providedUserIdStr = userId?.toString() || '';
      
      if (reportUserIdStr === providedUserIdStr) {
        // Direct match (both converted to strings)
        hasAccess = true;
      } else {
        // Check if the report's userId is an email and we need to convert the provided ObjectId
        try {
          const { userRepository } = await import('db/src/repositories/UserRepository');
          
          // If the report userId looks like an email, try to find user by email and compare ObjectIds
          if (typeof reportUserIdStr === 'string' && reportUserIdStr.includes('@')) {
            // Report has email, check if provided userId is ObjectId of that user
            const userByEmail = await userRepository.findByEmail(reportUserIdStr);
            if (userByEmail && userByEmail._id === providedUserIdStr) {
              hasAccess = true;
              console.log(`Migration: Report ${reportId} has email userId, matched with ObjectId`);
            }
          } else {
            // Report has ObjectId, check if provided userId might be from user with that ObjectId
            const userByObjectId = await userRepository.findById(providedUserIdStr);
            if (userByObjectId && reportUserIdStr === userByObjectId.email) {
              hasAccess = true;
              console.log(`Migration: Report ${reportId} comparison between ObjectId and email`);
            }
          }
        } catch (error) {
          console.error('Error during migration-compatible access check:', error);
        }
      }

      console.log('Access check result:', {
        reportId,
        reportUserId: report.userId,
        providedUserId: userId,
        hasAccess
      });

      if (!hasAccess) {
        throw new AnalysisError('Access denied: Analysis belongs to different user');
      }

      return report;
    } catch (error) {
      if (error instanceof AnalysisError) {
        throw error;
      }
      
      throw new AnalysisError(
        `Failed to get analysis status: ${error instanceof Error ? error.message : String(error)}`,
        error
      );
    }
  }

  /**
   * Get all analysis reports for a user
   */
  async getUserAnalyses(userId: string, limit: number = 50): Promise<AnalysisReport[]> {
    try {
      // During migration, we need to query for both ObjectId and email formats
      let reports = await analysisReportRepository.findByUserId(userId, limit);
      
      // If no reports found and userId looks like an ObjectId, also try finding by email
      if (reports.length === 0 && userId.length === 24 && !userId.includes('@')) {
        try {
          const { userRepository } = await import('db/src/repositories/UserRepository');
          const user = await userRepository.findById(userId);
          if (user && user.email) {
            // Try finding reports by email for migration compatibility
            const emailReports = await analysisReportRepository.findByUserId(user.email, limit);
            reports = [...reports, ...emailReports];
            console.log(`Migration: Found ${emailReports.length} reports by email for user ObjectId ${userId}`);
          }
        } catch (error) {
          console.error('Error during migration-compatible user analysis lookup:', error);
        }
      }
      
      return reports;
    } catch (error) {
      throw new AnalysisError(
        `Failed to get user analyses: ${error instanceof Error ? error.message : String(error)}`,
        error
      );
    }
  }

  /**
   * Delete an analysis report
   */
  async deleteAnalysis(reportId: string, userId: string): Promise<boolean> {
    try {
      // Use getAnalysisStatus for access control (handles migration compatibility)
      const report = await this.getAnalysisStatus(reportId, userId);
      
      if (!report) {
        return false;
      }

      return await analysisReportRepository.deleteById(reportId);
    } catch (error) {
      throw new AnalysisError(
        `Failed to delete analysis: ${error instanceof Error ? error.message : String(error)}`,
        error
      );
    }
  }

  /**
   * Test the analysis service
   */
  async testService(): Promise<{
    geminiConnection: boolean;
    database: boolean;
    overall: boolean;
  }> {
    const results = {
      geminiConnection: false,
      database: false,
      overall: false
    };

    try {
      if (this.client) {
        // Test with simple content
        const response = await this.client.models.generateContent({
          model: this.modelName,
          contents: [{ text: 'Respond with exactly: {"test": "success"}' }]
        });
        
        if (response.text && response.text.includes('success')) {
          results.geminiConnection = true;
        }
      }
    } catch (error) {
      console.error('Gemini connection test failed:', error);
    }

    try {
      await analysisReportRepository.countByUserId('test-user-id');
      results.database = true;
    } catch (error) {
      console.error('Database test failed:', error);
    }

    results.overall = results.geminiConnection && results.database;
    
    return results;
  }
}

// Export singleton instance for use in API routes
export const analysisService = new AnalysisService();
