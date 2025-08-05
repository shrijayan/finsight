import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Download, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';
import { ReportHistoryItem as ReportHistoryItemType } from 'lib/src/types';

interface ReportHistoryItemProps {
  report: ReportHistoryItemType;
  isSelected: boolean;
  onToggleSelect: () => void;
}

export function ReportHistoryItem({ 
  report, 
  isSelected, 
  onToggleSelect 
}: ReportHistoryItemProps) {
  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const response = await fetch(`/api/reports/${report.id}/download`);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
          : `${report.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download report');
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'processing': return 'Processing';
      case 'failed': return 'Failed';
      default: return status;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggleSelect}
            className="mt-1"
          />
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {report.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    {report.sourceDocumentCount} {report.sourceDocumentCount === 1 ? 'document' : 'documents'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(report.status)}>
                  {getStatusText(report.status)}
                </Badge>
              </div>
            </div>

            {/* Key Metrics Preview */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-600">Income</p>
                <p className="font-semibold text-green-600">
                  ${report.keyMetrics.totalIncome.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Expenses</p>
                <p className="font-semibold text-red-600">
                  ${report.keyMetrics.totalExpenses.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Net Flow</p>
                <p className={`font-semibold ${
                  report.keyMetrics.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${report.keyMetrics.netCashFlow.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-2">
              {report.status === 'completed' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download PDF
                </Button>
              )}
              
              <Link href={`/dashboard/reports/${report.id}`}>
                <Button size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View Report
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
