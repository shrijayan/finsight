import { POST, GET } from './route';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { put } from '@vercel/blob';

// Mock dependencies
jest.mock('next-auth/next');
jest.mock('@vercel/blob');

const mockGetServerSession = getServerSession as jest.MockedFunction<typeof getServerSession>;
const mockPut = put as jest.MockedFunction<typeof put>;

// Helper to create NextRequest
function createRequest(url: string, options: RequestInit): NextRequest {
  return new NextRequest(url, options);
}

describe('/api/uploads', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/uploads', () => {
    it('should require authentication', async () => {
      mockGetServerSession.mockResolvedValue(null);

      const request = createRequest('http://localhost/api/uploads', {
        method: 'POST',
        body: new FormData()
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toContain('Authentication required');
    });

    it('should reject empty requests', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { email: 'test@example.com', name: 'Test User' }
      });

      const formData = new FormData();
      const request = new Request('http://localhost/api/uploads', {
        method: 'POST',
        body: formData
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('No files provided');
    });

    it('should validate file types', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { email: 'test@example.com', name: 'Test User' }
      });

      const formData = new FormData();
      const invalidFile = new File(['test'], 'test.exe', { type: 'application/exe' });
      formData.append('files', invalidFile);

      const request = new Request('http://localhost/api/uploads', {
        method: 'POST',
        body: formData
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('File validation failed');
      expect(data.validationErrors).toHaveLength(1);
      expect(data.validationErrors[0].code).toBe('INVALID_TYPE');
    });

    it('should validate file sizes', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { email: 'test@example.com', name: 'Test User' }
      });

      const formData = new FormData();
      // Create a file larger than 10MB
      const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.pdf', { 
        type: 'application/pdf' 
      });
      formData.append('files', largeFile);

      const request = new Request('http://localhost/api/uploads', {
        method: 'POST',
        body: formData
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('File validation failed');
      expect(data.validationErrors[0].code).toBe('FILE_TOO_LARGE');
    });

    it('should reject empty files', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { email: 'test@example.com', name: 'Test User' }
      });

      const formData = new FormData();
      const emptyFile = new File([], 'empty.pdf', { type: 'application/pdf' });
      formData.append('files', emptyFile);

      const request = new Request('http://localhost/api/uploads', {
        method: 'POST',
        body: formData
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('File validation failed');
      expect(data.validationErrors[0].code).toBe('INVALID_FILE');
    });

    it('should enforce maximum file count', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { email: 'test@example.com', name: 'Test User' }
      });

      const formData = new FormData();
      // Add 6 files (max is 5)
      for (let i = 0; i < 6; i++) {
        const file = new File(['content'], `test${i}.pdf`, { type: 'application/pdf' });
        formData.append('files', file);
      }

      const request = new Request('http://localhost/api/uploads', {
        method: 'POST',
        body: formData
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid request');
      expect(data.details).toContain('Maximum 5 files allowed');
    });

    it('should successfully upload valid files', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { email: 'test@example.com', name: 'Test User' }
      });

      mockPut.mockResolvedValue({
        url: 'https://blob.vercel-storage.com/test-file.pdf'
      });

      const formData = new FormData();
      const validFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      formData.append('files', validFile);

      const request = new Request('http://localhost/api/uploads', {
        method: 'POST',
        body: formData
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.message).toBe('Files uploaded successfully');
      expect(data.fileReferences).toHaveLength(1);
      expect(data.uploadId).toMatch(/^upload_\d+_[a-z0-9]+$/);
      expect(mockPut).toHaveBeenCalledWith(
        expect.stringMatching(/test@example\.com\/\d+-[a-z0-9]+-test\.pdf/),
        validFile,
        expect.objectContaining({
          access: 'public',
          addRandomSuffix: false
        })
      );
    });

    it('should handle multiple valid files', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { email: 'test@example.com', name: 'Test User' }
      });

      mockPut
        .mockResolvedValueOnce({ url: 'https://blob.vercel-storage.com/file1.pdf' })
        .mockResolvedValueOnce({ url: 'https://blob.vercel-storage.com/file2.csv' });

      const formData = new FormData();
      const file1 = new File(['content1'], 'test1.pdf', { type: 'application/pdf' });
      const file2 = new File(['content2'], 'test2.csv', { type: 'text/csv' });
      formData.append('files', file1);
      formData.append('files', file2);

      const request = new Request('http://localhost/api/uploads', {
        method: 'POST',
        body: formData
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.fileReferences).toHaveLength(2);
      expect(mockPut).toHaveBeenCalledTimes(2);
    });

    it('should handle blob storage errors', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { email: 'test@example.com', name: 'Test User' }
      });

      mockPut.mockRejectedValue(new Error('Blob storage error'));

      const formData = new FormData();
      const validFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      formData.append('files', validFile);

      const request = new Request('http://localhost/api/uploads', {
        method: 'POST',
        body: formData
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toContain('Failed to upload files');
    });

    it('should organize files by user', async () => {
      const userEmail = 'user@example.com';
      mockGetServerSession.mockResolvedValue({
        user: { email: userEmail, name: 'Test User' }
      });

      mockPut.mockResolvedValue({
        url: 'https://blob.vercel-storage.com/test-file.pdf'
      });

      const formData = new FormData();
      const validFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      formData.append('files', validFile);

      const request = new Request('http://localhost/api/uploads', {
        method: 'POST',
        body: formData
      });

      await POST(request);

      expect(mockPut).toHaveBeenCalledWith(
        expect.stringMatching(new RegExp(`^${userEmail.replace('@', '\\@')}\\/`)),
        validFile,
        expect.any(Object)
      );
    });
  });

  describe('GET /api/uploads', () => {
    it('should require authentication', async () => {
      mockGetServerSession.mockResolvedValue(null);

      const request = new Request('http://localhost/api/uploads', {
        method: 'GET'
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toContain('Authentication required');
    });

    it('should return not implemented message for authenticated users', async () => {
      mockGetServerSession.mockResolvedValue({
        user: { email: 'test@example.com', name: 'Test User' }
      });

      const request = new Request('http://localhost/api/uploads', {
        method: 'GET'
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(501);
      expect(data.message).toContain('not yet implemented');
    });
  });
});
