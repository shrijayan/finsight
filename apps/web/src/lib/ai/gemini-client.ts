import { GoogleGenAI } from '@google/genai';
import { FINANCIAL_ANALYSIS_PROMPT, fillPromptTemplate, FINANCIAL_ANALYSIS_SCHEMA } from './prompts';
import { GeminiAPIError } from '../errors/AnalysisError';
import { retryWithRateLimit } from '../utils/retry';

/**
 * Gemini AI client for financial document analysis
 * Handles communication with Google's Gemini AI API using the new @google/genai library
 */
export class GeminiClient {
  private client: GoogleGenAI | null;
  private readonly maxRetries = 3;
  private readonly timeoutMs = 60000; // 60 seconds
  private readonly apiKeyConfigured: boolean;
  private readonly modelName: string;

  constructor() {
    this.apiKeyConfigured = !!process.env.GEMINI_API_KEY;
    this.modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';
    
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
   * Analyze financial document content using Gemini AI
   * @param documentContents - Array of extracted document text content
   * @param options - Optional configuration for analysis
   * @returns Structured financial analysis data or placeholder data if API key not configured
   */
  async analyzeFinancialData(
    documentContents: string[],
    options: {
      retries?: number;
      timeout?: number;
    } = {}
  ): Promise<any> {
    if (!documentContents || documentContents.length === 0) {
      throw new GeminiAPIError('No document content provided for analysis');
    }

    // If API key is not configured, return placeholder data
    if (!this.apiKeyConfigured) {
      console.log('Gemini API key not configured, returning placeholder analysis data');
      return this.generatePlaceholderAnalysis(documentContents);
    }

    const { retries = this.maxRetries, timeout = this.timeoutMs } = options;

    // Combine all document contents with separators
    const combinedContent = documentContents.join('\n\n--- DOCUMENT SEPARATOR ---\n\n');
    
    // Fill the prompt template
    const prompt = fillPromptTemplate(FINANCIAL_ANALYSIS_PROMPT, {
      DOCUMENT_CONTENT: combinedContent
    });

    try {
      // Use retry logic with rate limiting support
      const analysisResult = await retryWithRateLimit(async () => {
        return await this.generateAnalysis(prompt, timeout);
      }, retries);

      // Validate the response structure
      const validatedResult = this.validateAnalysisStructure(analysisResult);
      
      return validatedResult;

    } catch (error) {
      console.error('Gemini AI analysis failed:', error);
      
      if (error instanceof GeminiAPIError) {
        throw error;
      }
      
      throw new GeminiAPIError(
        `Failed to analyze financial data: ${error instanceof Error ? error.message : String(error)}`,
        undefined,
        error
      );
    }
  }

  /**
   * Generate analysis using Gemini AI with timeout
   * @param prompt - The analysis prompt
   * @param timeout - Timeout in milliseconds
   * @returns Raw analysis result
   */
  private async generateAnalysis(prompt: string, timeout: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // Set up timeout
      const timeoutId = setTimeout(() => {
        reject(new GeminiAPIError('Analysis request timed out', 408));
      }, timeout);

      try {
        console.log('Sending request to Gemini AI...');
        
        if (!this.client) {
          throw new GeminiAPIError('Gemini client not initialized');
        }

        const response = await this.client.models.generateContent({
          model: this.modelName,
          contents: [{ text: prompt }]
        });
        
        clearTimeout(timeoutId);
        
        if (!response) {
          throw new GeminiAPIError('No response received from Gemini AI');
        }

        const text = response.text;
        
        if (!text || text.trim().length === 0) {
          throw new GeminiAPIError('Empty response received from Gemini AI');
        }

        console.log('Received response from Gemini AI, parsing JSON...');
        
        // Parse the JSON response
        let analysisData;
        try {
          // Clean the response text in case it has markdown formatting
          const cleanedText = this.cleanJsonResponse(text);
          analysisData = JSON.parse(cleanedText);
        } catch (parseError) {
          console.error('JSON parsing failed, raw response:', text);
          throw new GeminiAPIError(
            'Failed to parse AI response as JSON. The AI may have returned malformed data.',
            400,
            parseError
          );
        }

        resolve(analysisData);

      } catch (error: any) {
        clearTimeout(timeoutId);
        
        // Handle specific Gemini API errors
        if (error?.status === 429) {
          reject(new GeminiAPIError('Rate limit exceeded', 429, error));
        } else if (error?.status === 401) {
          reject(new GeminiAPIError('Invalid API key', 401, error));
        } else if (error?.status === 403) {
          reject(new GeminiAPIError('API access forbidden', 403, error));
        } else if (error?.status >= 500) {
          reject(new GeminiAPIError('Gemini AI service unavailable', error.status, error));
        } else {
          reject(error);
        }
      }
    });
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
      throw new GeminiAPIError('AI response is not a valid object');
    }

    // Check required fields
    const requiredFields = ['totalIncome', 'totalExpenses', 'categories', 'insights', 'recommendations', 'summary'];
    const missingFields = requiredFields.filter(field => !(field in data));
    
    if (missingFields.length > 0) {
      throw new GeminiAPIError(`Missing required fields in AI response: ${missingFields.join(', ')}`);
    }

    // Validate and normalize numeric fields
    data.totalIncome = this.validateNumber(data.totalIncome, 'totalIncome');
    data.totalExpenses = this.validateNumber(data.totalExpenses, 'totalExpenses');
    
    // Calculate netCashFlow if not provided or incorrect
    data.netCashFlow = data.totalIncome - data.totalExpenses;

    // Validate categories structure
    if (!data.categories || typeof data.categories !== 'object') {
      throw new GeminiAPIError('Categories field must be an object');
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
   * Generate placeholder analysis data when Gemini API is not configured
   * @param documentContents - Array of extracted document text content
   * @returns Mock analysis data structure
   */
  private generatePlaceholderAnalysis(documentContents: string[]): any {
    const totalChars = documentContents.reduce((sum, content) => sum + content.length, 0);
    const estimatedIncome = Math.floor(totalChars / 100) * 50; // Rough estimation
    const estimatedExpenses = Math.floor(estimatedIncome * 0.8);

    return {
      totalIncome: estimatedIncome,
      totalExpenses: estimatedExpenses,
      netCashFlow: estimatedIncome - estimatedExpenses,
      categories: {
        income: [
          { name: 'Salary', amount: estimatedIncome * 0.8, percentage: 80 },
          { name: 'Other Income', amount: estimatedIncome * 0.2, percentage: 20 }
        ],
        expenses: [
          { name: 'Housing', amount: estimatedExpenses * 0.3, percentage: 30 },
          { name: 'Food', amount: estimatedExpenses * 0.2, percentage: 20 },
          { name: 'Transportation', amount: estimatedExpenses * 0.15, percentage: 15 },
          { name: 'Utilities', amount: estimatedExpenses * 0.1, percentage: 10 },
          { name: 'Entertainment', amount: estimatedExpenses * 0.1, percentage: 10 },
          { name: 'Other', amount: estimatedExpenses * 0.15, percentage: 15 }
        ]
      },
      monthlyTrends: [
        { month: 'Jan', income: estimatedIncome * 0.9, expenses: estimatedExpenses * 0.8 },
        { month: 'Feb', income: estimatedIncome * 1.1, expenses: estimatedExpenses * 0.9 },
        { month: 'Mar', income: estimatedIncome * 1.0, expenses: estimatedExpenses * 1.0 }
      ],
      insights: [
        'Demo mode: AI analysis requires Gemini API key configuration',
        'Files uploaded successfully and are ready for AI analysis',
        'Configure GEMINI_API_KEY environment variable to enable real AI insights'
      ],
      recommendations: [
        'Set up your Gemini API key to get personalized financial recommendations',
        'Upload more bank statements for comprehensive analysis',
        'Consider tracking expenses in categories for better insights'
      ],
      summary: `Demo analysis completed for ${documentContents.length} document(s). This is placeholder data shown because the Gemini AI API key is not configured. To get real AI-powered financial insights, please configure your GEMINI_API_KEY environment variable.`,
      metadata: {
        processingTime: Date.now(),
        filesProcessed: documentContents.length,
        totalExtractedLength: totalChars,
        analysisTimestamp: new Date().toISOString(),
        modelUsed: 'placeholder-demo',
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
      // Try to parse string numbers
      const parsed = parseFloat(value);
      if (!isNaN(parsed)) {
        return Math.max(0, parsed); // Ensure non-negative
      }
    }
    
    if (typeof value === 'number' && !isNaN(value)) {
      return Math.max(0, value); // Ensure non-negative
    }
    
    console.warn(`Invalid ${fieldName} value: ${value}, defaulting to 0`);
    return 0;
  }

  /**
   * Get the current model configuration
   * @returns Model information
   */
  getModelInfo(): { model: string; apiKeyConfigured: boolean } {
    return {
      model: process.env.GEMINI_MODEL || 'gemini-pro',
      apiKeyConfigured: !!process.env.GEMINI_API_KEY
    };
  }

  /**
   * Test the API connection
   * @returns True if connection is successful, false if API key not configured or connection fails
   */
  async testConnection(): Promise<boolean> {
    if (!this.apiKeyConfigured || !this.client) {
      console.log('Gemini API key not configured, connection test skipped');
      return false;
    }

    try {
      const testPrompt = 'Respond with exactly: {"test": "success"}';
      
      const response = await this.client.models.generateContent({
        model: this.modelName,
        contents: [{ text: testPrompt }]
      });
      
      const text = response.text;
      
      if (!text || text.trim().length === 0) {
        console.error('Empty response received from Gemini API during connection test');
        return false;
      }
      
      const data = JSON.parse(this.cleanJsonResponse(text));
      return data.test === 'success';
      
    } catch (error) {
      console.error('Gemini API connection test failed:', error);
      return false;
    }
  }

  /**
   * Estimate token count for content (approximate)
   * @param content - Text content to estimate
   * @returns Estimated token count
   */
  estimateTokens(content: string): number {
    // Rough estimation: ~4 characters per token for English text
    return Math.ceil(content.length / 4);
  }

  /**
   * Check if content size is within limits
   * @param content - Content to check
   * @param maxTokens - Maximum tokens allowed (default: 30000 for input)
   * @returns True if within limits
   */
  isContentWithinLimits(content: string, maxTokens: number = 30000): boolean {
    return this.estimateTokens(content) <= maxTokens;
  }
}
