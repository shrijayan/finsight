import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { userRepository } from 'db/src/repositories/UserRepository';

// Validation schema for connecting upload
const connectUploadSchema = z.object({
  uploadId: z.string().min(1, 'Upload ID is required'),
  fileReferences: z.array(z.string()).min(1, 'File references are required'),
});

/**
 * POST /api/uploads/connect
 * Connect a guest upload to an authenticated user and trigger analysis
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Check authentication - required for this endpoint
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' }, 
        { status: 401 }
      );
    }

    const userEmail = session.user.email;

    // 2. Look up user to get their ObjectId
    const user = await userRepository.findByEmail(userEmail);
    if (!user) {
      return NextResponse.json(
        { error: 'User account not found' }, 
        { status: 404 }
      );
    }

    const userId = user._id; // Use the ObjectId instead of email

    // 3. Parse and validate request
    const body = await request.json();
    const validationResult = connectUploadSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: validationResult.error.issues.map(e => e.message)
        }, 
        { status: 400 }
      );
    }

    const { uploadId, fileReferences } = validationResult.data;

    // 4. Trigger analysis workflow for authenticated user
    try {
      // Import AnalysisService dynamically to avoid circular dependencies
      const { analysisService } = await import('@/lib/services/AnalysisService');
      
      // Start the analysis process with authenticated user ID
      const analysisId = await analysisService.processAnalysis(
        uploadId,
        fileReferences,
        userId
      );
      
      console.log('Connected upload to authenticated user:', { 
        uploadId, 
        analysisId, 
        userId, 
        fileCount: fileReferences.length 
      });
      
      return NextResponse.json({
        success: true,
        analysisId,
        message: 'Upload successfully connected to your account and analysis started'
      }, { status: 200 });
      
    } catch (analysisError) {
      console.error('Failed to trigger analysis for connected upload:', analysisError);
      
      return NextResponse.json(
        { 
          error: 'Failed to start analysis for your uploaded files. Please try again.',
          details: analysisError instanceof Error ? analysisError.message : String(analysisError)
        }, 
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Connect upload API error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' }, 
      { status: 500 }
    );
  }
}
