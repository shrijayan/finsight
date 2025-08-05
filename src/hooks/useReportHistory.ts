'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { ReportHistoryItem, ReportHistoryPagination } from 'lib/src/types';

interface UseReportHistoryState {
  reports: ReportHistoryItem[];
  pagination: ReportHistoryPagination;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedReports: string[];
}

export function useReportHistory() {
  const { data: session } = useSession();
  const [state, setState] = useState<UseReportHistoryState>({
    reports: [],
    pagination: { page: 1, limit: 10, total: 0, pages: 0 },
    isLoading: false,
    error: null,
    searchQuery: '',
    selectedReports: []
  });

  const fetchReports = useCallback(async (page = 1, search = '') => {
    if (!session?.user) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: state.pagination.limit.toString(),
        ...(search && { search })
      });

      const response = await fetch(`/api/reports?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch report history');
      }

      const data = await response.json();
      
      setState(prev => ({
        ...prev,
        reports: data.reports || [],
        pagination: data.pagination || { page: 1, limit: 10, total: 0, pages: 0 },
        isLoading: false
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isLoading: false,
        reports: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 }
      }));
    }
  }, [session, state.pagination.limit]);

  useEffect(() => {
    if (session?.user) {
      fetchReports();
    }
  }, [session, fetchReports]);

  const setSearchQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
    fetchReports(1, query);
  }, [fetchReports]);

  const loadPage = useCallback((page: number) => {
    fetchReports(page, state.searchQuery);
  }, [fetchReports, state.searchQuery]);

  const toggleReportSelection = useCallback((reportId: string) => {
    setState(prev => ({
      ...prev,
      selectedReports: prev.selectedReports.includes(reportId)
        ? prev.selectedReports.filter(id => id !== reportId)
        : [...prev.selectedReports, reportId]
    }));
  }, []);

  const deleteReports = useCallback(async (reportIds: string[]) => {
    if (!session?.user || reportIds.length === 0) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const deletePromises = reportIds.map(reportId =>
        fetch(`/api/reports/${reportId}`, { method: 'DELETE' })
      );

      const responses = await Promise.all(deletePromises);
      const failedDeletes = responses.filter(response => !response.ok);

      if (failedDeletes.length > 0) {
        throw new Error(`Failed to delete ${failedDeletes.length} report(s)`);
      }

      // Clear selection and refresh data
      setState(prev => ({ ...prev, selectedReports: [], isLoading: false }));
      await fetchReports(state.pagination.page, state.searchQuery);

    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to delete reports',
        isLoading: false
      }));
    }
  }, [session, fetchReports, state.pagination.page, state.searchQuery]);

  const downloadReports = useCallback(async (reportIds: string[]) => {
    if (!session?.user || reportIds.length === 0) return;

    try {
      const downloadPromises = reportIds.map(async (reportId) => {
        const response = await fetch(`/api/reports/${reportId}/download`);
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const contentDisposition = response.headers.get('Content-Disposition');
          const filename = contentDisposition
            ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
            : `report-${reportId}.pdf`;
          
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } else {
          console.error(`Failed to download report ${reportId}`);
        }
      });

      await Promise.all(downloadPromises);

    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to download reports'
      }));
    }
  }, [session]);

  const refetch = useCallback(() => {
    fetchReports(state.pagination.page, state.searchQuery);
  }, [fetchReports, state.pagination.page, state.searchQuery]);

  return {
    ...state,
    setSearchQuery,
    loadPage,
    toggleReportSelection,
    deleteReports,
    downloadReports,
    refetch
  };
}
