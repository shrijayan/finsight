import { NextRequest, NextResponse } from 'next/server';
import { analysisService } from '@/lib/services/AnalysisService';
import { join } from 'path';
import { readdir } from 'fs/promises';

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

/**
 * Debug endpoint to test the analysis service
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    console.log('=== Debug Analysis Service ===');
    
    // 1. Test service status
    console.log('Testing service status...');
    const serviceTest = await analysisService.testService();
    console.log('Service test results:', serviceTest);
    
    // 2. Check upload directory
    console.log('Checking upload directory...');
    try {
      const uploadsPath = join(process.cwd(), 'apps', 'web', 'uploads');
      console.log('Uploads path:', uploadsPath);
      const uploadDirs = await readdir(uploadsPath);
      console.log('Upload directories:', uploadDirs.slice(0, 5)); // Show first 5
      
      if (uploadDirs.length > 0) {
        const firstDir = uploadDirs[0];
        const firstDirPath = join(uploadsPath, firstDir);
        const filesInDir = await readdir(firstDirPath);
        console.log(`Files in ${firstDir}:`, filesInDir);
      }
    } catch (error) {
      console.error('Error reading uploads directory:', error);
    }
    
    // 3. Test with a sample file if available
    console.log('Testing with sample data...');
    try {
      const testResult = await analysisService.processAnalysis(
        'test-upload-id',
        ['test-file-reference'],
        'test-user@example.com',
        { reportTitle: 'Debug Test Analysis' }
      );
      console.log('Test analysis result:', testResult);
    } catch (error) {
      console.error('Test analysis failed:', error);
    }
    
    return NextResponse.json({
      service: serviceTest,
      message: 'Debug completed, check console logs'
    });
    
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
