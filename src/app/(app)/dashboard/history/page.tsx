'use client';

import * as React from 'react';
import { ReportHistory } from '@/components/features/ReportHistory';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Report History</h1>
            <p className="text-gray-600">View and manage your financial analysis reports</p>
          </div>
        </div>

        <Link href="/dashboard">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
        </Link>
      </div>

      {/* Report History Component */}
      <ReportHistory />
    </div>
  );
}
