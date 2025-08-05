import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { analysisReportRepository } from 'db/repositories/AnalysisReportRepository';
import { userRepository } from 'db/repositories/UserRepository';
import { generateReportPDF } from '../../../../../lib/pdf-generator';

/**
 * GET /api/reports/[reportId]/download
 * Download analysis report as PDF
 * Requires authentication and user ownership verification
 */
export async function GET(
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

    // 4. Get report and verify ownership
    const report = await analysisReportRepository.findById(params.reportId);
    
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    // Verify user owns this report
    if (report.userId !== user._id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Check if report is completed
    if (report.status !== 'completed') {
      return NextResponse.json(
        { error: 'Report is not ready for download. Status: ' + report.status },
        { status: 400 }
      );
    }

    // 4. Generate PDF
    const pdfBuffer = await generateReportPDF(report);

    // 5. Create safe filename
    const safeTitle = report.reportTitle
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .substring(0, 50); // Limit length

    const filename = `${safeTitle}_${new Date(report.createdAt).toISOString().split('T')[0]}.pdf`;

    // 6. Return PDF as download
    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'private, max-age=0',
      },
    });

  } catch (error) {
    console.error('PDF download error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF. Please try again.' },
      { status: 500 }
    );
  }
}
