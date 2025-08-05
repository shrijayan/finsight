'use client';

import React from 'react';
import { FileUpload } from '@/components/features/FileUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Clock, CheckCircle, History, Plus } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import type { FileUploadResponse, FileValidationError } from 'lib/types';

interface PendingUpload {
  uploadId: string;
  fileReferences: string[];
  uploadedAt: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [pendingUpload, setPendingUpload] = React.useState<PendingUpload | null>(null);
  const [analysisProgress, setAnalysisProgress] = React.useState<number>(0);
  const [analysisStatus, setAnalysisStatus] = React.useState<'idle' | 'processing' | 'completed' | 'failed'>('idle');
  const [showUploadForm, setShowUploadForm] = React.useState(false);
  const [uploadHistory, setUploadHistory] = React.useState<Array<{
    id: string;
    filename: string;
    uploadedAt: Date;
    status: 'processing' | 'completed' | 'failed';
  }>>([]);

  // Check for pending upload from sessionStorage when component mounts
  React.useEffect(() => {
    if (typeof window !== 'undefined' && session?.user?.email) {
      const pendingUploadData = sessionStorage.getItem('pendingUpload');
      if (pendingUploadData) {
        try {
          const uploadData = JSON.parse(pendingUploadData) as PendingUpload;
          setPendingUpload(uploadData);
          setAnalysisStatus('processing');
          
          // Clear the pending upload from sessionStorage
          sessionStorage.removeItem('pendingUpload');
          
          // Start connecting the guest upload to authenticated user
          connectUploadToUser(uploadData);
        } catch (error) {
          console.error('Failed to parse pending upload data:', error);
          sessionStorage.removeItem('pendingUpload');
        }
      }
    }
  }, [session?.user?.email]);

  // Connect the guest upload to the authenticated user
  const connectUploadToUser = React.useCallback(async (uploadData: PendingUpload) => {
    if (!session?.user?.email) return;

    try {
      // Re-trigger analysis for the authenticated user
      const response = await fetch('/api/uploads/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uploadId: uploadData.uploadId,
          fileReferences: uploadData.fileReferences,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Start polling for analysis progress using the analysisId
        pollAnalysisProgress(data.analysisId);
      } else {
        setAnalysisStatus('failed');
      }
    } catch (error) {
      console.error('Failed to connect upload to user:', error);
      setAnalysisStatus('failed');
    }
  }, [session?.user?.email]);

  // Poll analysis progress
  const pollAnalysisProgress = React.useCallback((analysisId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/analysis/status/${analysisId}`);
        if (response.ok) {
          const data = await response.json();
          setAnalysisProgress(data.progress || 0);
          
          if (data.status === 'completed') {
            setAnalysisStatus('completed');
            clearInterval(pollInterval);
          } else if (data.status === 'failed') {
            setAnalysisStatus('failed');
            clearInterval(pollInterval);
          }
        }
      } catch (error) {
        console.error('Failed to poll analysis progress:', error);
      }
    }, 2000); // Poll every 2 seconds

    // Clean up interval after 5 minutes
    setTimeout(() => clearInterval(pollInterval), 5 * 60 * 1000);
  }, []);

  const handleUploadComplete = React.useCallback(async (response: FileUploadResponse) => {
    console.log('Upload completed:', response);
    
    // Add files to upload history
    response.fileReferences.forEach((fileRef, index) => {
      setUploadHistory(prev => [...prev, {
        id: `${response.uploadId}-${index}`,
        filename: `File ${index + 1}`, // We don't have original filenames in the response
        uploadedAt: new Date(),
        status: 'processing' as const
      }]);
    });

    setShowUploadForm(false);
    
    // For authenticated users, immediately trigger analysis
    if (session?.user?.email) {
      setAnalysisStatus('processing');
      setAnalysisProgress(0);
      
      try {
        // Trigger analysis directly via the connect endpoint
        const connectResponse = await fetch('/api/uploads/connect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uploadId: response.uploadId,
            fileReferences: response.fileReferences,
          }),
        });

        if (connectResponse.ok) {
          const data = await connectResponse.json();
          console.log('Analysis started with ID:', data.analysisId);
          // Start polling for progress
          pollAnalysisProgress(data.analysisId);
        } else {
          console.error('Failed to start analysis');
          setAnalysisStatus('failed');
        }
      } catch (error) {
        console.error('Failed to trigger analysis:', error);
        setAnalysisStatus('failed');
      }
    }
  }, [session?.user?.email, pollAnalysisProgress]);

  const handleUploadError = React.useCallback((error: string | FileValidationError[]) => {
    console.error('Upload error:', error);
    // TODO: Add toast notification for errors in future enhancement
  }, []);

  const handleShowUploadForm = React.useCallback(() => {
    setShowUploadForm(true);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            {analysisStatus === 'processing' ? 'Analyzing your uploaded documents...' : 
             analysisStatus === 'completed' ? 'Your analysis is ready!' :
             'Upload your bank statements to get started with AI-powered analysis'}
          </p>
        </div>
        <div className="flex gap-2">
          {analysisStatus === 'completed' && (
            <Button onClick={handleShowUploadForm} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Upload More Files
            </Button>
          )}
          <Link href="/dashboard/history">
            <Button variant="outline" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              View Report History
            </Button>
          </Link>
        </div>
      </div>

      {/* Analysis Progress Section */}
      {analysisStatus === 'processing' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Analyzing Your Documents
            </CardTitle>
            <CardDescription>
              {pendingUpload 
                ? `Processing ${pendingUpload.fileReferences.length} uploaded file(s) from ${new Date(pendingUpload.uploadedAt).toLocaleString()}`
                : `Processing your uploaded documents with AI analysis...`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${analysisProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                {analysisProgress}% complete - This usually takes 1-2 minutes
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Complete Section */}
      {analysisStatus === 'completed' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Analysis Complete!
            </CardTitle>
            <CardDescription>
              Your financial analysis is ready. View your detailed insights and reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Link href="/dashboard/history">
                <Button>View Analysis Report</Button>
              </Link>
              <Button variant="outline" onClick={handleShowUploadForm}>
                Upload More Files
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Failed Section */}
      {analysisStatus === 'failed' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="rounded-full h-5 w-5 bg-red-600"></div>
              Analysis Failed
            </CardTitle>
            <CardDescription>
              There was an issue processing your documents. Please try uploading again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setShowUploadForm(true)}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Upload Section - Only show when explicitly requested or no pending upload */}
      {(showUploadForm || (analysisStatus === 'idle' && !pendingUpload)) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              {analysisStatus === 'completed' ? 'Upload Additional Documents' : 'Upload Bank Statements'}
            </CardTitle>
            <CardDescription>
              Upload your PDF, CSV, or TXT bank statement files for analysis. 
              Our AI will automatically categorize transactions and provide insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload 
              onUploadComplete={handleUploadComplete}
              onError={handleUploadError}
              className="w-full"
            />
          </CardContent>
        </Card>
      )}

      {/* Upload History Section */}
      {uploadHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Uploads
            </CardTitle>
            <CardDescription>
              Track the status of your recent file uploads and analysis progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadHistory.map((upload) => (
                <div key={upload.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{upload.filename}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded {upload.uploadedAt.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {upload.status === 'processing' && (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                        Processing
                      </div>
                    )}
                    {upload.status === 'completed' && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="h-3 w-3" />
                        Completed
                      </div>
                    )}
                    {upload.status === 'failed' && (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <div className="rounded-full h-3 w-3 bg-red-600"></div>
                        Failed
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Getting Started Section - Only show when no activity */}
      {analysisStatus === 'idle' && !pendingUpload && uploadHistory.length === 0 && !showUploadForm && (
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              New to Bank Statement Analyzer? Here's how to get the most out of your analysis:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Upload className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold">1. Upload Files</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload your bank statements in PDF, CSV, or TXT format
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <div className="h-4 w-4 rounded-full bg-primary animate-pulse" />
                  </div>
                  <h3 className="font-semibold">2. AI Analysis</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our AI automatically categorizes and analyzes your transactions
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold">3. View Reports</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get detailed insights and downloadable reports
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
