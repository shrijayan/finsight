'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useReportStore } from '@/stores/useReportStore';
import { AnalysisReport } from 'lib/src/types';

export function useReportData(reportId: string) {
  const { data: session } = useSession();
  const { 
    setReport, 
    setLoading, 
    setError, 
    clearReport,
    updateReportStatus 
  } = useReportStore();
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    if (!session?.user || !reportId) {
      return;
    }

    const fetchReportData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/analysis/${reportId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Report not found');
          } else if (response.status === 403) {
            throw new Error('Access denied to this report');
          } else if (response.status === 401) {
            throw new Error('Please log in to view this report');
          }
          throw new Error('Failed to load report');
        }

        const reportData: AnalysisReport = await response.json();
        setReport(reportData);

        // If report is still processing, set up auto-refresh
        if (reportData.status === 'processing') {
          setTimeout(() => setRefetchTrigger(prev => prev + 1), 5000);
        }

      } catch (error) {
        console.error('Error fetching report:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      }
    };

    fetchReportData();
  }, [reportId, session, refetchTrigger, setReport, setLoading, setError]);

  // Cleanup when component unmounts or reportId changes
  useEffect(() => {
    return () => {
      if (!reportId) {
        clearReport();
      }
    };
  }, [reportId, clearReport]);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  return { refetch };
}
