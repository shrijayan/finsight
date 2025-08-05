import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { analysisReportRepository } from 'db/src/repositories/AnalysisReportRepository';
import { userRepository } from 'db/src/repositories/UserRepository';
import { AnalysisReport } from 'lib/src/types';

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Look up user to get their ObjectId
    const user = await userRepository.findByEmail(session.user.email);
    if (!user) {
      return NextResponse.json({ error: 'User account not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const status = searchParams.get('status');

    // Build filter object
    const filters: any = {
      userId: user._id, // Use the ObjectId instead of email
    };

    // Add search filter
    if (search) {
      filters.reportTitle = { $regex: search, $options: 'i' };
    }

    // Add date range filter
    if (startDate && endDate) {
      filters.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate + 'T23:59:59.999Z'), // Include full end date
      };
    } else if (startDate) {
      filters.createdAt = { $gte: new Date(startDate) };
    } else if (endDate) {
      filters.createdAt = { $lte: new Date(endDate + 'T23:59:59.999Z') };
    }

    // Add status filter
    if (status && status !== '') {
      filters.status = status;
    }

    const reports = await analysisReportRepository.findPaginated(
      filters,
      { 
        page, 
        limit, 
        sort: { createdAt: -1 } 
      }
    );

    // Transform for history display
    const historyItems = reports.data.map((report: AnalysisReport) => ({
      id: report._id,
      title: report.reportTitle,
      createdAt: report.createdAt,
      sourceDocumentCount: report.sourceDocumentCount,
      status: report.status || 'completed',
      keyMetrics: {
        totalIncome: report.generatedData?.totalIncome || 0,
        totalExpenses: report.generatedData?.totalExpenses || 0,
        netCashFlow: report.generatedData?.netCashFlow || 0,
      }
    }));

    return NextResponse.json({
      reports: historyItems,
      pagination: {
        page: reports.page,
        limit: reports.limit,
        total: reports.total,
        pages: reports.pages
      }
    });

  } catch (error) {
    console.error('Report history error:', error);
    return NextResponse.json({ error: 'Failed to fetch report history' }, { status: 500 });
  }
}
