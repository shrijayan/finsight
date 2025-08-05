'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReportHistoryItem } from './ReportHistoryItem';
import { ReportSearchFilter } from './ReportSearchFilter';
import { useReportHistory } from '@/hooks/useReportHistory';
import { Search, Download, Trash2 } from 'lucide-react';

interface ReportHistoryProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ReportHistory({ className, ...props }: ReportHistoryProps) {
  const {
    reports,
    pagination,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedReports,
    toggleReportSelection,
    deleteReports,
    downloadReports,
    loadPage
  } = useReportHistory();

  const [showFilters, setShowFilters] = React.useState(false);

  if (error) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading History</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)} {...props}>
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
          
          {selectedReports.length > 0 && (
            <>
              <Button
                variant="outline"
                onClick={() => downloadReports(selectedReports)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download ({selectedReports.length})
              </Button>
              <Button
                variant="outline"
                onClick={() => deleteReports(selectedReports)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete ({selectedReports.length})
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card className="p-4">
          <ReportSearchFilter />
        </Card>
      )}

      {/* Report History List */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="bg-gray-100 animate-pulse h-32 rounded-lg" />
          ))
        ) : reports.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-600 mb-2">No Reports Found</h3>
            <p className="text-gray-500">You haven't generated any financial analysis reports yet.</p>
          </div>
        ) : (
          reports.map((report) => (
            <ReportHistoryItem
              key={report.id}
              report={report}
              isSelected={selectedReports.includes(report.id)}
              onToggleSelect={() => toggleReportSelection(report.id)}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            disabled={pagination.page === 1}
            onClick={() => loadPage(pagination.page - 1)}
          >
            Previous
          </Button>
          
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.pages}
          </span>
          
          <Button
            variant="outline"
            disabled={pagination.page === pagination.pages}
            onClick={() => loadPage(pagination.page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
