import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, X } from 'lucide-react';

interface ReportSearchFilterProps {
  onFilterChange?: (filters: FilterOptions) => void;
  onClearFilters?: () => void;
}

interface FilterOptions {
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  keywords?: string;
  status?: string;
}

export function ReportSearchFilter({ 
  onFilterChange, 
  onClearFilters 
}: ReportSearchFilterProps) {
  const [filters, setFilters] = React.useState<FilterOptions>({});

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      dateRange: {
        ...filters.dateRange,
        startDate: e.target.value,
        endDate: filters.dateRange?.endDate || ''
      }
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      dateRange: {
        startDate: filters.dateRange?.startDate || '',
        endDate: e.target.value
      }
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      keywords: e.target.value
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...filters,
      status: e.target.value || undefined
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    onClearFilters?.();
  };

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof FilterOptions];
    if (key === 'dateRange' && value) {
      return (value as any).startDate || (value as any).endDate;
    }
    return !!value;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Advanced Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="text-gray-600 hover:text-gray-800"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date Range Filter */}
        <div className="space-y-2">
          <Label htmlFor="start-date" className="text-sm font-medium">
            Date Range
          </Label>
          <div className="space-y-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="start-date"
                type="date"
                placeholder="Start date"
                value={filters.dateRange?.startDate || ''}
                onChange={handleStartDateChange}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="date"
                placeholder="End date"
                value={filters.dateRange?.endDate || ''}
                onChange={handleEndDateChange}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Keywords Filter */}
        <div className="space-y-2">
          <Label htmlFor="keywords" className="text-sm font-medium">
            Keywords
          </Label>
          <Input
            id="keywords"
            placeholder="Search in report content..."
            value={filters.keywords || ''}
            onChange={handleKeywordsChange}
          />
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium">
            Status
          </Label>
          <select
            id="status"
            value={filters.status || ''}
            onChange={handleStatusChange}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="pt-2 border-t">
          <p className="text-sm text-gray-600 mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.dateRange?.startDate && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs">
                From: {new Date(filters.dateRange.startDate).toLocaleDateString()}
              </span>
            )}
            {filters.dateRange?.endDate && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs">
                To: {new Date(filters.dateRange.endDate).toLocaleDateString()}
              </span>
            )}
            {filters.keywords && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 text-green-800 text-xs">
                Keywords: "{filters.keywords}"
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-100 text-purple-800 text-xs">
                Status: {filters.status}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
