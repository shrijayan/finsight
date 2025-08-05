import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { analysisService } from '@/lib/services/AnalysisService';
import { userRepository } from 'db/src/repositories/UserRepository';
import { AnalysisError } from '@/lib/errors/AnalysisError';

/**
 * GET /api/analysis/[analysisId]
 * Get detailed analysis report by ID
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
        { error: 'Authentication required. Please log in to view analysis reports.' },
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

    // 4. Get analysis report
    const analysis = await analysisService.getAnalysisStatus(params.analysisId, userId);

    if (!analysis) {
      return NextResponse.json(
        { error: 'Analysis not found or access denied' },
        { status: 404 }
      );
    }

    // 4. Return complete analysis data
    return NextResponse.json({
      id: analysis._id,
      uploadId: analysis.uploadId,
      reportTitle: analysis.reportTitle,
      status: analysis.status,
      progress: analysis.progress || 0,
      sourceDocumentCount: analysis.sourceDocumentCount,
      generatedData: analysis.generatedData,
      createdAt: analysis.createdAt,
      updatedAt: analysis.updatedAt,
      completedAt: analysis.completedAt,
    });

  } catch (error) {
    console.error('Analysis detail API error:', error);

    if (error instanceof AnalysisError) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to retrieve analysis report. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/analysis/[analysisId]
 * Delete analysis report by ID
 * Requires authentication and user ownership verification
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { analysisId: string } }
): Promise<NextResponse> {
  try {
    // 1. Verify authentication
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required. Please log in to delete analysis reports.' },
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

    // 4. Delete analysis report
    const deleted = await analysisService.deleteAnalysis(params.analysisId, userId);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Analysis not found or access denied' },
        { status: 404 }
      );
    }

    // 4. Return success confirmation
    return NextResponse.json({
      message: 'Analysis report deleted successfully',
      deletedId: params.analysisId
    });

  } catch (error) {
    console.error('Analysis delete API error:', error);

    if (error instanceof AnalysisError) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete analysis report. Please try again.' },
      { status: 500 }
    );
  }
}
