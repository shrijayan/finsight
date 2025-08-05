// Mock for database repositories and models
const mockAnalysisReport = {
  _id: 'test-analysis-id',
  userId: 'test-user-id',
  uploadId: 'test-upload-id',
  reportTitle: 'Test Analysis',
  sourceDocumentCount: 1,
  status: 'completed',
  progress: 100,
  generatedData: {
    totalIncome: 5000,
    totalExpenses: 3000,
    netCashFlow: 2000,
    categories: { income: [], expenses: [] },
    insights: [],
    recommendations: [],
    summary: 'Test summary'
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  completedAt: new Date()
};

const analysisReportRepository = {
  create: jest.fn(() => Promise.resolve(mockAnalysisReport)),
  findById: jest.fn(() => Promise.resolve(mockAnalysisReport)),
  findByUserId: jest.fn(() => Promise.resolve([mockAnalysisReport])),
  updateById: jest.fn(() => Promise.resolve(mockAnalysisReport)),
  deleteById: jest.fn(() => Promise.resolve(true)),
  countByUserId: jest.fn(() => Promise.resolve(1)),
};

// Default export for db/src/repositories/AnalysisReportRepository
module.exports = { analysisReportRepository };
