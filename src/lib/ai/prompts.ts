/**
 * AI prompts for financial document analysis
 * These prompts are designed to generate structured JSON responses from Gemini AI
 */

export const FINANCIAL_ANALYSIS_PROMPT = `
You are a financial analyst AI. Analyze the following bank statement/financial documents and provide a comprehensive financial analysis.

DOCUMENT CONTENT:
{DOCUMENT_CONTENT}

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
- If data is insufficient for certain fields, use reasonable defaults (0 for amounts, empty arrays for categories)
`;

export const DOCUMENT_CLASSIFICATION_PROMPT = `
You are a document classification AI. Analyze the provided document content and classify what type of financial document this is.

DOCUMENT CONTENT:
{DOCUMENT_CONTENT}

Please analyze this document and return a JSON response with the following structure:
{
  "documentType": "bank_statement" | "credit_card_statement" | "invoice" | "receipt" | "tax_document" | "investment_statement" | "unknown",
  "confidence": number, // 0-1 scale
  "dateRange": {
    "startDate": "YYYY-MM-DD" | null,
    "endDate": "YYYY-MM-DD" | null
  },
  "accountInfo": {
    "accountNumber": "string" | null,
    "accountType": "string" | null,
    "bankName": "string" | null
  },
  "transactionCount": number,
  "currency": "string" | null,
  "extractionQuality": "high" | "medium" | "low"
}

Guidelines:
- Set confidence based on how certain you are about the document type
- Extract date range from statement periods or transaction dates
- Mask account numbers for security (show only last 4 digits)
- Count approximate number of transactions visible
- Assess extraction quality based on text clarity and completeness
- Only return valid JSON without additional formatting
`;

export const TREND_ANALYSIS_PROMPT = `
You are a financial trend analysis AI. Given historical financial data, identify patterns and trends.

HISTORICAL DATA:
{HISTORICAL_DATA}

Please analyze the trends and return a JSON response with the following structure:
{
  "trendAnalysis": {
    "incomeGrowth": {
      "rate": number, // percentage change
      "trend": "increasing" | "decreasing" | "stable",
      "confidence": number // 0-1 scale
    },
    "expenseGrowth": {
      "rate": number,
      "trend": "increasing" | "decreasing" | "stable",
      "confidence": number
    },
    "savingsRate": {
      "current": number, // percentage
      "trend": "improving" | "declining" | "stable",
      "monthlyAverage": number
    }
  },
  "seasonalPatterns": [
    {
      "category": "string",
      "pattern": "string",
      "months": ["string"],
      "impact": number
    }
  ],
  "anomalies": [
    {
      "month": "string",
      "category": "string",
      "description": "string",
      "severity": "low" | "medium" | "high"
    }
  ],
  "forecasting": {
    "nextMonthIncome": number,
    "nextMonthExpenses": number,
    "confidenceLevel": number
  }
}

Focus on:
1. Identifying growth rates and trends over time
2. Detecting seasonal spending patterns
3. Highlighting unusual transactions or patterns
4. Providing short-term financial forecasts
5. Calculating savings rates and financial health metrics

Only return valid JSON without additional formatting.
`;

/**
 * Helper function to replace placeholders in prompts
 */
export function fillPromptTemplate(prompt: string, replacements: Record<string, string>): string {
  let filledPrompt = prompt;
  
  for (const [placeholder, value] of Object.entries(replacements)) {
    filledPrompt = filledPrompt.replace(
      new RegExp(`{${placeholder}}`, 'g'),
      value
    );
  }
  
  return filledPrompt;
}

/**
 * Validation schema for financial analysis response
 */
export const FINANCIAL_ANALYSIS_SCHEMA = {
  type: 'object',
  required: ['totalIncome', 'totalExpenses', 'netCashFlow', 'categories', 'insights', 'recommendations', 'summary'],
  properties: {
    totalIncome: { type: 'number', minimum: 0 },
    totalExpenses: { type: 'number', minimum: 0 },
    netCashFlow: { type: 'number' },
    categories: {
      type: 'object',
      required: ['income', 'expenses'],
      properties: {
        income: {
          type: 'array',
          items: {
            type: 'object',
            required: ['category', 'amount', 'percentage'],
            properties: {
              category: { type: 'string' },
              amount: { type: 'number', minimum: 0 },
              percentage: { type: 'number', minimum: 0, maximum: 100 }
            }
          }
        },
        expenses: {
          type: 'array',
          items: {
            type: 'object',
            required: ['category', 'amount', 'percentage'],
            properties: {
              category: { type: 'string' },
              amount: { type: 'number', minimum: 0 },
              percentage: { type: 'number', minimum: 0, maximum: 100 }
            }
          }
        }
      }
    },
    monthlyTrends: {
      type: 'array',
      items: {
        type: 'object',
        required: ['month', 'income', 'expenses'],
        properties: {
          month: { type: 'string' },
          income: { type: 'number', minimum: 0 },
          expenses: { type: 'number', minimum: 0 }
        }
      }
    },
    insights: {
      type: 'array',
      items: {
        type: 'object',
        required: ['type', 'description', 'severity'],
        properties: {
          type: { type: 'string' },
          description: { type: 'string' },
          severity: { type: 'string', enum: ['low', 'medium', 'high'] }
        }
      }
    },
    recommendations: {
      type: 'array',
      items: {
        type: 'object',
        required: ['category', 'suggestion', 'potentialSavings'],
        properties: {
          category: { type: 'string' },
          suggestion: { type: 'string' },
          potentialSavings: { type: 'number', minimum: 0 }
        }
      }
    },
    summary: { type: 'string', minLength: 50 }
  }
};
