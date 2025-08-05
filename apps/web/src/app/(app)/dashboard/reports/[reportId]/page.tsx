'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { ReportDashboard } from '@/components/features/ReportDashboard';
import { useReportData } from '@/hooks/useReportData';
import { useReportStore } from '@/stores/useReportStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function ReportPage() {
  const params = useParams();
  const reportId = params.reportId as string;
  const { currentReport, isLoading, error } = useReportStore();
  const { refetch } = useReportData(reportId);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: currentReport?.reportTitle || 'Financial Analysis Report',
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // In a real app, you'd show a toast notification here
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Report</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-x-2">
            <Button onClick={refetch}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with navigation and actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">
              {currentReport?.reportTitle || 'Financial Analysis Report'}
            </h1>
            {currentReport?.createdAt && (
              <p className="text-gray-600 text-sm">
                Generated on {new Date(currentReport.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        <div className="flex space-x-2 no-print">
          <Button variant="outline" onClick={handleShare}>
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Download className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Report Dashboard */}
      {currentReport?.status === 'processing' && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-800 font-medium">Report is processing...</p>
              <p className="text-blue-600 text-sm">
                Progress: {currentReport.progress || 0}%
              </p>
            </div>
            <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
          </div>
        </div>
      )}

      <ReportDashboard 
        reportData={currentReport?.generatedData} 
        isLoading={isLoading}
        status={currentReport?.status}
      />
    </div>
  );
}
