'use client';

import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Upload, FileText, AlertCircle, CheckCircle2, X } from 'lucide-react';
import type { FileUploadResponse, FileValidationError, UploadProgress } from 'lib/types';

interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onError'> {
  onUploadComplete?: (response: FileUploadResponse) => void;
  onError?: (error: string | FileValidationError[]) => void;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
}

const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'text/csv': ['.csv'],
  'text/plain': ['.txt'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp']
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;

interface FileWithProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  id: string;
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({ 
    className, 
    onUploadComplete, 
    onError, 
    maxFiles = MAX_FILES,
    maxSize = MAX_FILE_SIZE,
    disabled = false,
    ...props 
  }, ref) => {
    const [filesWithProgress, setFilesWithProgress] = React.useState<FileWithProgress[]>([]);
    const [isUploading, setIsUploading] = React.useState(false);
    const [validationErrors, setValidationErrors] = React.useState<FileValidationError[]>([]);
    const [isPasteActive, setIsPasteActive] = React.useState(false);

    const validateFile = React.useCallback((file: File): FileValidationError | null => {
      // Check file type
      const acceptedTypes = Object.keys(ACCEPTED_FILE_TYPES);
      if (!acceptedTypes.includes(file.type)) {
        return {
          filename: file.name,
          error: `File type ${file.type} is not supported. Please upload PDF, CSV, TXT, or image files only.`,
          code: 'INVALID_TYPE'
        };
      }

      // Check file size
      if (file.size > maxSize) {
        return {
          filename: file.name,
          error: `File size ${(file.size / (1024 * 1024)).toFixed(2)}MB exceeds the ${(maxSize / (1024 * 1024))}MB limit.`,
          code: 'FILE_TOO_LARGE'
        };
      }

      return null;
    }, [maxSize]);

    const uploadFile = React.useCallback(async (fileWithProgress: FileWithProgress): Promise<void> => {
      const formData = new FormData();
      formData.append('files', fileWithProgress.file);

      try {
        setFilesWithProgress(prev => prev.map(f => 
          f.id === fileWithProgress.id ? { ...f, status: 'uploading', progress: 0 } : f
        ));

        const response = await fetch('/api/uploads', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const result: FileUploadResponse = await response.json();
        
        setFilesWithProgress(prev => prev.map(f => 
          f.id === fileWithProgress.id ? { ...f, status: 'success', progress: 100 } : f
        ));

        onUploadComplete?.(result);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Upload failed';
        setFilesWithProgress(prev => prev.map(f => 
          f.id === fileWithProgress.id ? { ...f, status: 'error', error: errorMessage } : f
        ));
        onError?.(errorMessage);
      }
    }, [onUploadComplete, onError]);

    const handleFileUpload = React.useCallback(async (acceptedFiles: File[]) => {
      if (disabled) return;

      // Validate files
      const errors: FileValidationError[] = [];
      const validFiles: File[] = [];

      for (const file of acceptedFiles) {
        const error = validateFile(file);
        if (error) {
          errors.push(error);
        } else {
          validFiles.push(file);
        }
      }

      // Check total file count
      if (filesWithProgress.length + validFiles.length > maxFiles) {
        errors.push({
          filename: 'Multiple files',
          error: `Cannot upload more than ${maxFiles} files at once.`,
          code: 'INVALID_FILE'
        });
        setValidationErrors(errors);
        onError?.(errors);
        return;
      }

      if (errors.length > 0) {
        setValidationErrors(errors);
        onError?.(errors);
        return;
      }

      // Clear previous errors
      setValidationErrors([]);

      // Add files to progress tracking
      const newFilesWithProgress: FileWithProgress[] = validFiles.map(file => ({
        file,
        progress: 0,
        status: 'pending' as const,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }));

      setFilesWithProgress(prev => [...prev, ...newFilesWithProgress]);
      setIsUploading(true);

      // Upload files sequentially
      for (const fileWithProgress of newFilesWithProgress) {
        await uploadFile(fileWithProgress);
      }

      setIsUploading(false);
    }, [disabled, validateFile, filesWithProgress.length, maxFiles, onError, uploadFile]);

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
      handleFileUpload(acceptedFiles);
    }, [handleFileUpload]);

    const onDropRejected = React.useCallback((fileRejections: any[]) => {
      const errors: FileValidationError[] = [];
      let hasTooManyFilesError = false;
      
      fileRejections.forEach(({ file, errors: dropzoneErrors }) => {
        dropzoneErrors.forEach((error: any) => {
          if (error.code === 'file-invalid-type') {
            errors.push({
              filename: file.name,
              error: `File type ${file.type} is not supported. Please upload PDF, CSV, or TXT files only.`,
              code: 'INVALID_TYPE'
            });
          } else if (error.code === 'file-too-large') {
            errors.push({
              filename: file.name,
              error: `File size ${(file.size / (1024 * 1024)).toFixed(2)}MB exceeds the ${(maxSize / (1024 * 1024))}MB limit.`,
              code: 'FILE_TOO_LARGE'
            });
          } else if (error.code === 'too-many-files' && !hasTooManyFilesError) {
            errors.push({
              filename: 'Multiple files',
              error: `Cannot upload more than ${maxFiles} files at once.`,
              code: 'INVALID_FILE'
            });
            hasTooManyFilesError = true;
          }
        });
      });

      if (errors.length > 0) {
        setValidationErrors(errors);
        onError?.(errors);
      }
    }, [maxSize, maxFiles, onError]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      onDropRejected,
      accept: ACCEPTED_FILE_TYPES,
      maxSize,
      maxFiles,
      disabled: disabled || isUploading,
      multiple: true
    });

    const removeFile = React.useCallback((fileId: string) => {
      setFilesWithProgress(prev => prev.filter(f => f.id !== fileId));
    }, []);

    const clearAll = React.useCallback(() => {
      setFilesWithProgress([]);
      setValidationErrors([]);
    }, []);

    // Handle clipboard paste events
    const handlePaste = React.useCallback(async (event: ClipboardEvent) => {
      if (disabled || isUploading) return;
      
      event.preventDefault();
      
      const items = event.clipboardData?.items;
      if (!items) return;

      const files: File[] = [];
      
      // Process clipboard items
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        // Handle files
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            files.push(file);
          }
        }
      }

      if (files.length > 0) {
        setIsPasteActive(true);
        setTimeout(() => setIsPasteActive(false), 1000);
        await handleFileUpload(files);
      }
    }, [disabled, isUploading, handleFileUpload]);

    // Set up global paste event listener
    React.useEffect(() => {
      const handleGlobalPaste = (event: ClipboardEvent) => {
        // Only handle paste if the component is visible and focused
        if (document.activeElement?.closest('[data-paste-zone]')) {
          handlePaste(event);
        }
      };

      document.addEventListener('paste', handleGlobalPaste);
      return () => document.removeEventListener('paste', handleGlobalPaste);
    }, [handlePaste]);

    const successfulUploads = filesWithProgress.filter(f => f.status === 'success').length;
    const hasFiles = filesWithProgress.length > 0;
    const hasErrors = validationErrors.length > 0 || filesWithProgress.some(f => f.status === 'error');

    return (
      <div ref={ref} className={cn('space-y-4', className)} {...props}>
        <div className="space-y-2">
          <Label htmlFor="file-upload" className="text-sm font-medium">
            Upload Bank Statements
          </Label>
          <div
            {...getRootProps()}
            data-paste-zone
            className={cn(
              'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
              'hover:border-primary/50 hover:bg-primary/5',
              isDragActive && 'border-primary bg-primary/10',
              isPasteActive && 'border-green-500 bg-green-50',
              (disabled || isUploading) && 'cursor-not-allowed opacity-50',
              hasErrors && 'border-destructive/50 bg-destructive/5'
            )}
            role="button"
            tabIndex={0}
            aria-describedby="file-upload-description"
          >
            <input {...getInputProps()} id="file-upload" />
            <div className="flex flex-col items-center gap-3">
              <Upload className="h-12 w-12 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-lg font-medium">
                  {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse files
                </p>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Supports: PDF, CSV, TXT, and image files</p>
                <p>Press Cmd+V (or Ctrl+V) to paste from clipboard</p>
                <p>Max size: {(maxSize / (1024 * 1024))}MB per file, up to {maxFiles} files</p>
              </div>
            </div>
          </div>
          <p id="file-upload-description" className="sr-only">
            Upload your bank statement files. Supported formats are PDF, CSV, and TXT. 
            Maximum file size is {(maxSize / (1024 * 1024))}MB and you can upload up to {maxFiles} files.
          </p>
        </div>

        {/* Validation Errors */}
        {hasErrors && (
          <div className="space-y-2">
            {validationErrors.map((error, index) => (
              <div key={index} className="flex items-start gap-2 p-3 border border-destructive/20 bg-destructive/5 rounded-md">
                <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <p className="font-medium text-destructive">{error.filename}</p>
                  <p className="text-destructive/80">{error.error}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* File Progress List */}
        {hasFiles && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">
                Files ({successfulUploads}/{filesWithProgress.length} uploaded)
              </h4>
              {!isUploading && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAll}
                  className="h-6 px-2 text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filesWithProgress.map((fileWithProgress) => (
                <div key={fileWithProgress.id} className="flex items-center gap-3 p-3 border rounded-md bg-card">
                  <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium truncate">
                        {fileWithProgress.file.name}
                      </p>
                      <div className="flex items-center gap-2">
                        {fileWithProgress.status === 'success' && (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        )}
                        {fileWithProgress.status === 'error' && (
                          <AlertCircle className="h-4 w-4 text-destructive" />
                        )}
                        {!isUploading && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(fileWithProgress.id)}
                            className="h-6 w-6 p-0"
                            aria-label={`Remove ${fileWithProgress.file.name}`}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {(fileWithProgress.file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      {fileWithProgress.status === 'uploading' && (
                        <div className="flex-1">
                          <Progress value={fileWithProgress.progress} className="h-1" />
                        </div>
                      )}
                      {fileWithProgress.error && (
                        <p className="text-xs text-destructive">{fileWithProgress.error}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export { FileUpload };
export type { FileUploadProps };
