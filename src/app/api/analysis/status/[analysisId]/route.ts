import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { analysisService } from '@/lib/services/AnalysisService';
import { userRepository } from 'db/repositories/UserRepository';
import { AnalysisError } from '@/lib/errors/AnalysisError';

/**
 * GET /api/analysis/status/[analysisId]
 * Get analysis progress and status information
 * Lightweight endpoint optimized for frequent polling
 * Requires authentication and user ownership verification
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { analysisId: string } }
): Promise<NextResponse> {
  try {
    // 1. Verify authentication
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // 2. Look up user to get their ObjectId
    const user = await userRepository.findByEmail(session.user.email);
    if (!user) {
      return NextResponse.json(
        { error: 'User account not found' },
        { status: 404 }
      );
    }

    const userId = user._id;

    // 3. Validate analysisId parameter
    if (!params.analysisId || params.analysisId.trim() === '') {
      return NextResponse.json(
        { error: 'Analysis ID is required' },
        { status: 400 }
      );
    }

    // 4. Get analysis status (lightweight data only)
    const analysis = await analysisService.getAnalysisStatus(params.analysisId, userId);

    if (!analysis) {
      return NextResponse.json(
        { error: 'Analysis not found or access denied' },
        { status: 404 }
      );
    }

    // 4. Return lightweight status information (no generated data)
    return NextResponse.json({
      id: analysis._id,
      status: analysis.status,
      progress: analysis.progress || 0,
      reportTitle: analysis.reportTitle,
      sourceDocumentCount: analysis.sourceDocumentCount,
      createdAt: analysis.createdAt,
      updatedAt: analysis.updatedAt,
      completedAt: analysis.completedAt,
      // Include basic metadata if analysis is completed
      ...(analysis.status === 'completed' && analysis.generatedData && (analysis.generatedData as any)?.metadata && {
        metadata: {
          processingTime: (analysis.generatedData as any).metadata.processingTime,
          filesProcessed: (analysis.generatedData as any).metadata.filesProcessed,
          analysisTimestamp: (analysis.generatedData as any).metadata.analysisTimestamp
        }
      })
    });

  } catch (error) {
    console.error('Analysis status API error:', error);

    if (error instanceof AnalysisError) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to retrieve analysis status' },
      { status: 500 }
    );
  }
}
