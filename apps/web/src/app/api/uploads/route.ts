import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import type { FileUploadResponse, FileValidationError } from 'lib/types';

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

// File validation constants
const ACCEPTED_FILE_TYPES = ['application/pdf', 'text/csv', 'text/plain'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;

// Validation schema
const uploadSchema = z.object({
  files: z.array(z.instanceof(File)).min(1, 'At least one file required').max(MAX_FILES, `Maximum ${MAX_FILES} files allowed`),
});

/**
 * Validates a single file for type and size
 */
function validateFile(file: File): FileValidationError | null {
  // Check file type
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    return {
      filename: file.name,
      error: `File type ${file.type} is not supported. Please upload PDF, CSV, or TXT files only.`,
      code: 'INVALID_TYPE'
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      filename: file.name,
      error: `File size ${(file.size / (1024 * 1024)).toFixed(2)}MB exceeds the ${(MAX_FILE_SIZE / (1024 * 1024))}MB limit.`,
      code: 'FILE_TOO_LARGE'
    };
  }

  // Basic file integrity check
  if (file.size === 0) {
    return {
      filename: file.name,
      error: 'File is empty or corrupted.',
      code: 'INVALID_FILE'
    };
  }

  return null;
}

/**
 * Generates a unique upload ID for tracking
 */
function generateUploadId(): string {
  return `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Trigger analysis workflow for uploaded files
 * Integrated with AnalysisService from Story 2.2
 */
async function triggerAnalysisWorkflow(
  uploadId: string, 
  fileReferences: string[], 
  userId: string
): Promise<string | null> {
  try {
    // Import AnalysisService dynamically to avoid circular dependencies
    const { analysisService } = await import('@/lib/services/AnalysisService');
    
    // Start the analysis process
    const analysisId = await analysisService.processAnalysis(
      uploadId,
      fileReferences,
      userId
    );
    
    console.log('Analysis workflow started successfully:', { uploadId, analysisId, fileCount: fileReferences.length });
    return analysisId;
    
  } catch (error) {
    console.error('Failed to trigger analysis workflow:', error);
    // Don't throw error to avoid breaking the upload flow
    return null;
  }
}

/**
 * POST /api/uploads
 * Handles file upload with optional authentication (allows guest uploads)
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Check authentication (optional for guest uploads)
    const session = await getServerSession();
    const isAuthenticated = !!session?.user?.email;
    const userId = session?.user?.email || `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 2. Parse form data
    const formData = await request.formData();
    const files: File[] = [];
    
    // Collect all files from form data
    const entries = Array.from(formData.entries());
    for (const [key, value] of entries) {
      if (key === 'files' && value instanceof File) {
        files.push(value);
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided. Please select files to upload.' }, 
        { status: 400 }
      );
    }

    // 3. Validate request structure
    const validationResult = uploadSchema.safeParse({ files });
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid request', 
          details: validationResult.error.issues.map((e: any) => e.message)
        }, 
        { status: 400 }
      );
    }

    // 4. Validate individual files
    const validationErrors: FileValidationError[] = [];
    for (const file of files) {
      const error = validateFile(file);
      if (error) {
        validationErrors.push(error);
      }
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'File validation failed', 
          validationErrors 
        }, 
        { status: 400 }
      );
    }

    // 5. Store files locally (development) or in cloud storage (production)
    const uploadPromises = files.map(async (file, index) => {
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substr(2, 9);
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${timestamp}-${randomId}-${safeName}`;
      
      try {
        // Create uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), 'apps', 'web', 'uploads', userId.replace(/[^a-zA-Z0-9.-]/g, '_'));
        if (!existsSync(uploadsDir)) {
          await mkdir(uploadsDir, { recursive: true });
        }

        // Convert file to buffer and save locally
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filepath = join(uploadsDir, filename);
        
        await writeFile(filepath, buffer);
        
        // Return local file path as reference
        return `local://${userId.replace(/[^a-zA-Z0-9.-]/g, '_')}/${filename}`;
      } catch (error) {
        console.error('File upload error:', error);
        throw new Error(`Failed to upload ${file.name}`);
      }
    });

    let fileReferences: string[];
    try {
      fileReferences = await Promise.all(uploadPromises);
    } catch (error) {
      console.error('File upload error:', error);
      return NextResponse.json(
        { error: 'Failed to upload files. Please try again.' }, 
        { status: 500 }
      );
    }

    // 6. Generate upload ID and trigger analysis workflow
    const uploadId = generateUploadId();
    
    try {
      await triggerAnalysisWorkflow(uploadId, fileReferences, userId);
    } catch (error) {
      console.error('Analysis workflow trigger error:', error);
      // Don't fail the upload if analysis trigger fails
    }

    // 7. Return success response
    const response: FileUploadResponse = {
      message: 'Files uploaded successfully',
      fileReferences,
      uploadId
    };

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Upload API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again.' }, 
      { status: 500 }
    );
  }
}

/**
 * GET /api/uploads
 * Optional: List user's uploaded files (for future enhancement)
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  // Verify authentication
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Authentication required' }, 
      { status: 401 }
    );
  }

  // TODO: Implement file listing functionality in future stories
  return NextResponse.json(
    { message: 'File listing not yet implemented' }, 
    { status: 501 }
  );
}
