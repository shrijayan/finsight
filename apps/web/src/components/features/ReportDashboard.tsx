import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FinancialCharts } from './FinancialCharts';
import { InsightsList } from './InsightsList';
import { RecommendationCards } from './RecommendationCards';
import { AnalysisReport } from 'lib/src/types';

interface MetricCardProps {
  title: string;
  value: number;
  type: 'income' | 'expense' | 'net';
  className?: string;
}

function MetricCard({ title, value, type, className }: MetricCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getColorClasses = (type: 'income' | 'expense' | 'net', value: number) => {
    switch (type) {
      case 'income':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'expense':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'net':
        return value >= 0 
          ? 'text-green-600 bg-green-50 border-green-200'
          : 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className={cn(getColorClasses(type, value), className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(value)}</div>
      </CardContent>
    </Card>
  );
}

function ReportSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Metrics skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
      
      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
      
      {/* Large chart skeleton */}
      <div className="h-80 bg-gray-200 rounded-lg"></div>
      
      {/* Insights and recommendations skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}

interface ReportDashboardProps {
  reportData?: AnalysisReport['generatedData'];
  isLoading?: boolean;
  status?: AnalysisReport['status'];
  onError?: (error: string) => void;
  className?: string;
}

const ReportDashboard = React.forwardRef<HTMLDivElement, ReportDashboardProps>(
  ({ className, reportData, isLoading, status, onError, ...props }, ref) => {
    if (isLoading) {
      return <ReportSkeleton />;
    }

    if (status === 'processing') {
      return (
        <div className="text-center py-8">
          <p className="text-blue-600 mb-2">Report is still being generated...</p>
          <p className="text-gray-500">Please wait while we analyze your financial data.</p>
        </div>
      );
    }

    if (status === 'failed') {
      return (
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">Report generation failed</p>
          <p className="text-gray-500">Please try regenerating the report or contact support.</p>
        </div>
      );
    }

    if (!reportData) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No report data available</p>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('space-y-6', className)} {...props}>
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard 
            title="Total Income" 
            value={reportData.totalIncome || 0}
            type="income"
          />
          <MetricCard 
            title="Total Expenses" 
            value={reportData.totalExpenses || 0}
            type="expense"
          />
          <MetricCard 
            title="Net Cash Flow" 
            value={reportData.netCashFlow || 0}
            type="net"
          />
        </div>

        {/* Summary Section */}
        {reportData.summary && (
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{reportData.summary}</p>
            </CardContent>
          </Card>
        )}

        {/* Charts Section */}
        <FinancialCharts data={reportData} />

        {/* Insights and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reportData.insights && reportData.insights.length > 0 && (
            <InsightsList insights={reportData.insights} />
          )}
          {reportData.recommendations && reportData.recommendations.length > 0 && (
            <RecommendationCards recommendations={reportData.recommendations} />
          )}
        </div>
      </div>
    );
  }
);

ReportDashboard.displayName = 'ReportDashboard';

export { ReportDashboard };
