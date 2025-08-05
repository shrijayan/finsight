'use client';

import React from 'react';
import { FileUpload } from '@/components/features/FileUpload';
import { useRouter } from 'next/navigation';
import type { FileUploadResponse, FileValidationError } from 'lib/types';

export default function HomePage() {
  const router = useRouter();

  const handleUploadComplete = React.useCallback((response: FileUploadResponse) => {
    console.log('Upload completed:', response);
    
    // Store upload info in sessionStorage to connect with user after login
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pendingUpload', JSON.stringify({
        uploadId: response.uploadId,
        fileReferences: response.fileReferences,
        uploadedAt: new Date().toISOString()
      }));
    }
    
    // After successful upload, redirect to sign-in page with a message
    // that their files have been uploaded and they need to sign in to view results
    router.push('/login?message=upload-complete');
  }, [router]);

  const handleUploadError = React.useCallback((error: string | FileValidationError[]) => {
    console.error('Upload error:', error);
    // TODO: Add toast notification for errors in future enhancement
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 px-4 py-8">
      <div className="w-full max-w-2xl space-y-8 text-center">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Bank Statement Analyzer
          </h1>
          <p className="text-lg text-gray-600">
            Upload and analyze your bank statements with ease. Get insights into your spending patterns and categorize transactions automatically.
          </p>
        </div>

        {/* File Upload Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <FileUpload 
            onUploadComplete={handleUploadComplete}
            onError={handleUploadError}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
