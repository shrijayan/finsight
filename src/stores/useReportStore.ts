import { create } from 'zustand';
import { AnalysisReport } from 'lib/src/types';

interface ReportStore {
  currentReport: AnalysisReport | null;
  isLoading: boolean;
  error: string | null;
  setReport: (report: AnalysisReport) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearReport: () => void;
  updateReportStatus: (status: AnalysisReport['status'], progress?: number) => void;
}

export const useReportStore = create<ReportStore>((set, get) => ({
  currentReport: null,
  isLoading: false,
  error: null,
  
  setReport: (report) => set({ 
    currentReport: report, 
    error: null,
    isLoading: false 
  }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ 
    error, 
    isLoading: false 
  }),
  
  clearReport: () => set({ 
    currentReport: null, 
    error: null,
    isLoading: false 
  }),
  
  updateReportStatus: (status, progress) => {
    const currentReport = get().currentReport;
    if (currentReport) {
      set({
        currentReport: {
          ...currentReport,
          status,
          progress: progress !== undefined ? progress : currentReport.progress
        }
      });
    }
  }
}));
