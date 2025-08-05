import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FileUpload } from './FileUpload';
import type { FileUploadResponse, FileValidationError } from 'lib/types';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('FileUpload', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('renders file upload interface correctly', () => {
    render(<FileUpload />);
    
    expect(screen.getByText('Upload Bank Statements')).toBeInTheDocument();
    expect(screen.getByText('Drag & drop files here')).toBeInTheDocument();
    expect(screen.getByText('or click to browse files')).toBeInTheDocument();
    expect(screen.getByText('Supports: PDF, CSV, TXT files')).toBeInTheDocument();
  });

  it('accepts valid file types', async () => {
    const onUploadComplete = jest.fn();
    render(<FileUpload onUploadComplete={onUploadComplete} />);
    
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/upload bank statements/i) as HTMLInputElement;
    
    // Mock successful upload response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: 'Files uploaded successfully',
        fileReferences: ['blob-url-1'],
        uploadId: 'upload_123'
      } as FileUploadResponse)
    });
    
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText('test.pdf')).toBeInTheDocument();
    });
  });

  it('rejects invalid file types', async () => {
    const onError = jest.fn();
    render(<FileUpload onError={onError} />);
    
    const file = new File(['test content'], 'test.exe', { type: 'application/exe' });
    const input = screen.getByLabelText(/upload bank statements/i) as HTMLInputElement;
    
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith([{
        filename: 'test.exe',
        error: expect.stringContaining('not supported'),
        code: 'INVALID_TYPE'
      }]);
    });
    
    // Check for error message in DOM
    await waitFor(() => {
      expect(screen.getByText(/not supported/)).toBeInTheDocument();
    });
  });

  it('rejects files that exceed size limit', async () => {
    const onError = jest.fn();
    render(<FileUpload maxSize={1024} onError={onError} />);
    
    // Create a file larger than 1KB
    const largeFile = new File(['x'.repeat(2000)], 'large.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/upload bank statements/i) as HTMLInputElement;
    
    fireEvent.change(input, { target: { files: [largeFile] } });
    
    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith([{
        filename: 'large.pdf',
        error: expect.stringContaining('exceeds'),
        code: 'FILE_TOO_LARGE'
      }]);
    });
    
    // Check for error message in DOM
    await waitFor(() => {
      expect(screen.getByText(/exceeds/)).toBeInTheDocument();
    });
  });

  it('limits number of files', async () => {
    const onError = jest.fn();
    render(<FileUpload maxFiles={2} onError={onError} />);
    
    const files = [
      new File(['content1'], 'test1.pdf', { type: 'application/pdf' }),
      new File(['content2'], 'test2.pdf', { type: 'application/pdf' }),
      new File(['content3'], 'test3.pdf', { type: 'application/pdf' })
    ];
    
    const input = screen.getByLabelText(/upload bank statements/i) as HTMLInputElement;
    fireEvent.change(input, { target: { files } });
    
    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith([{
        filename: 'Multiple files',
        error: expect.stringContaining('Cannot upload more than 2 files'),
        code: 'INVALID_FILE'
      }]);
    });
    
    // Check for error message in DOM
    await waitFor(() => {
      expect(screen.getByText(/Cannot upload more than 2 files/)).toBeInTheDocument();
    });
  });

  it('shows upload progress during file upload', async () => {
    render(<FileUpload />);
    
    const file = new File(['test content'], 'test.csv', { type: 'text/csv' });
    const input = screen.getByLabelText(/upload bank statements/i) as HTMLInputElement;
    
    // Mock fetch to simulate slow upload
    mockFetch.mockImplementation(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({
          ok: true,
          json: async () => ({
            message: 'Files uploaded successfully',
            fileReferences: ['blob-url-1'],
            uploadId: 'upload_123'
          })
        }), 100)
      )
    );
    
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText('test.csv')).toBeInTheDocument();
    });
  });

  it('handles upload errors gracefully', async () => {
    const onError = jest.fn();
    render(<FileUpload onError={onError} />);
    
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/upload bank statements/i) as HTMLInputElement;
    
    // Mock failed upload response
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Upload failed' })
    });
    
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith('Upload failed');
    });
  });

  it('allows removing files before upload', async () => {
    // Mock fetch to prevent actual upload
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        message: 'Files uploaded successfully',
        fileReferences: ['blob-url-1'],
        uploadId: 'upload_123'
      })
    });

    render(<FileUpload />);
    
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/upload bank statements/i) as HTMLInputElement;
    
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText('test.pdf')).toBeInTheDocument();
    });
    
    // Wait for upload to complete, then look for remove button
    await waitFor(() => {
      const removeButtons = screen.getAllByLabelText(/Remove/);
      expect(removeButtons.length).toBeGreaterThan(0);
    });
    
    const removeButton = screen.getByLabelText(/Remove test.pdf/);
    fireEvent.click(removeButton);
    
    await waitFor(() => {
      expect(screen.queryByText('test.pdf')).not.toBeInTheDocument();
    });
  });

  it('clears all files when clear all button is clicked', async () => {
    // Mock fetch to complete upload quickly
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        message: 'Files uploaded successfully',
        fileReferences: ['blob-url-1', 'blob-url-2'],
        uploadId: 'upload_123'
      })
    });

    render(<FileUpload />);
    
    const files = [
      new File(['content1'], 'test1.pdf', { type: 'application/pdf' }),
      new File(['content2'], 'test2.csv', { type: 'text/csv' })
    ];
    const input = screen.getByLabelText(/upload bank statements/i) as HTMLInputElement;
    
    fireEvent.change(input, { target: { files } });
    
    await waitFor(() => {
      expect(screen.getByText('test1.pdf')).toBeInTheDocument();
      expect(screen.getByText('test2.csv')).toBeInTheDocument();
    });
    
    // Wait for upload to complete so Clear all button appears
    await waitFor(() => {
      expect(screen.getByText('Clear all')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    const clearButton = screen.getByText('Clear all');
    fireEvent.click(clearButton);
    
    await waitFor(() => {
      expect(screen.queryByText('test1.pdf')).not.toBeInTheDocument();
      expect(screen.queryByText('test2.csv')).not.toBeInTheDocument();
    });
  });

  it('disables upload when disabled prop is true', () => {
    render(<FileUpload disabled />);
    
    // Find the actual dropzone container that has the disabled classes
    const dropzoneContainer = screen.getByRole('button');
    expect(dropzoneContainer).toHaveClass('cursor-not-allowed', 'opacity-50');
  });

  it('supports accessibility features', () => {
    render(<FileUpload />);
    
    const input = screen.getByLabelText(/upload bank statements/i);
    expect(input).toHaveAttribute('id', 'file-upload');
    
    const description = screen.getByText(/supported formats are pdf, csv, and txt/i);
    expect(description).toHaveClass('sr-only');
  });

  it('calls onUploadComplete when upload succeeds', async () => {
    const onUploadComplete = jest.fn();
    render(<FileUpload onUploadComplete={onUploadComplete} />);
    
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const input = screen.getByLabelText(/upload bank statements/i) as HTMLInputElement;
    
    const mockResponse: FileUploadResponse = {
      message: 'Files uploaded successfully',
      fileReferences: ['blob-url-1'],
      uploadId: 'upload_123'
    };
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });
    
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(onUploadComplete).toHaveBeenCalledWith(mockResponse);
    });
  });
});
