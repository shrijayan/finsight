import { NextRequest, NextResponse } from 'next/server';
import { GeminiClient } from '@/lib/ai/gemini-client';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Gemini API connection...');
    
    const client = new GeminiClient();
    const modelInfo = client.getModelInfo();
    
    console.log('Model info:', modelInfo);
    
    if (!modelInfo.apiKeyConfigured) {
      return NextResponse.json({
        success: false,
        error: 'Gemini API key not configured',
        modelInfo
      }, { status: 400 });
    }

    // Test connection
    const connectionTest = await client.testConnection();
    console.log('Connection test result:', connectionTest);

    if (!connectionTest) {
      return NextResponse.json({
        success: false,
        error: 'Failed to connect to Gemini API - possibly invalid API key',
        modelInfo
      }, { status: 500 });
    }

    // Test simple analysis with sample bank statement data
    const sampleData = [
      `Date: 2024-01-15
Transaction: Salary Deposit - $5,000.00
Balance: $5,000.00

Date: 2024-01-16  
Transaction: Grocery Store - $150.00
Balance: $4,850.00

Date: 2024-01-17
Transaction: Rent Payment - $1,200.00
Balance: $3,650.00

Date: 2024-01-18
Transaction: Utilities - $120.00
Balance: $3,530.00`
    ];

    console.log('Testing analysis with sample data...');
    
    const analysisResult = await client.analyzeFinancialData(sampleData);
    console.log('Analysis completed successfully:', analysisResult);

    return NextResponse.json({
      success: true,
      message: 'Gemini API is working correctly',
      modelInfo,
      connectionTest,
      sampleAnalysis: {
        totalIncome: analysisResult.totalIncome,
        totalExpenses: analysisResult.totalExpenses,
        netCashFlow: analysisResult.netCashFlow,
        insightsCount: analysisResult.insights?.length || 0,
        recommendationsCount: analysisResult.recommendations?.length || 0,
        hasPlaceholderData: analysisResult.metadata?.isPlaceholderData || false
      }
    });

  } catch (error) {
    console.error('Gemini test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      details: error instanceof Error ? {
        name: error.name,
        stack: error.stack
      } : null
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { documentContent } = await request.json();
    
    if (!documentContent) {
      return NextResponse.json({
        success: false,
        error: 'No document content provided'
      }, { status: 400 });
    }

    console.log('Testing analysis with provided content...');
    
    const client = new GeminiClient();
    const result = await client.analyzeFinancialData([documentContent]);
    
    return NextResponse.json({
      success: true,
      result
    });

  } catch (error) {
    console.error('Analysis test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
