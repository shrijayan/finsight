import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { analysisReportRepository } from 'db/repositories/AnalysisReportRepository';
import { userRepository } from 'db/repositories/UserRepository';

/**
 * DELETE /api/reports/[reportId]
 * Delete analysis report by ID
 * Requires authentication and user ownership verification
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { reportId: string } }
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

    // 3. Validate reportId parameter
    if (!params.reportId || params.reportId.trim() === '') {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      );
    }

    // 4. Delete report with user ownership check
    const deleted = await analysisReportRepository.deleteByIdAndUserId(
      params.reportId,
      user._id
    );

    if (!deleted) {
      return NextResponse.json(
        { error: 'Report not found or access denied' },
        { status: 404 }
      );
    }

    // 4. Return success confirmation
    return NextResponse.json({
      message: 'Report deleted successfully',
      deletedId: params.reportId
    });

  } catch (error) {
    console.error('Report delete API error:', error);
    return NextResponse.json(
      { error: 'Failed to delete report' },
      { status: 500 }
    );
  }
}
