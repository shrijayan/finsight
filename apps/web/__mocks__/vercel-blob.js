// Mock for @vercel/blob
module.exports = {
  put: jest.fn(() => Promise.resolve({ url: 'https://test-blob-url.com/file.pdf' })),
  del: jest.fn(() => Promise.resolve()),
  head: jest.fn(() => Promise.resolve({ url: 'https://test-blob-url.com/file.pdf' })),
  list: jest.fn(() => Promise.resolve({ blobs: [] })),
};
