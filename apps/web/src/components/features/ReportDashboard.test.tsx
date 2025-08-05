import { render, screen } from '@testing-library/react';
import { ReportDashboard } from './ReportDashboard';

// Mock the chart components to avoid Recharts rendering issues in tests
jest.mock('./FinancialCharts', () => ({
  FinancialCharts: ({ data }: any) => <div data-testid="financial-charts">Financial Charts</div>
}));

jest.mock('./InsightsList', () => ({
  InsightsList: ({ insights }: any) => <div data-testid="insights-list">Insights List</div>
}));

jest.mock('./RecommendationCards', () => ({
  RecommendationCards: ({ recommendations }: any) => <div data-testid="recommendation-cards">Recommendation Cards</div>
}));

const mockReportData = {
  totalIncome: 5000,
  totalExpenses: 3500,
  netCashFlow: 1500,
  categories: {
    income: [
      { category: 'Salary', amount: 4000, percentage: 80 },
      { category: 'Freelance', amount: 1000, percentage: 20 }
    ],
    expenses: [
      { category: 'Housing', amount: 1500, percentage: 43 },
      { category: 'Food', amount: 800, percentage: 23 },
      { category: 'Transportation', amount: 600, percentage: 17 },
      { category: 'Entertainment', amount: 600, percentage: 17 }
    ]
  },
  monthlyTrends: [
    { month: 'Jan', income: 4800, expenses: 3200 },
    { month: 'Feb', income: 5200, expenses: 3800 }
  ],
  insights: [
    { type: 'spending', description: 'High entertainment spending detected', severity: 'medium' as const },
    { type: 'savings', description: 'Good savings rate of 30%', severity: 'low' as const }
  ],
  recommendations: [
    { category: 'budgeting', suggestion: 'Consider reducing entertainment expenses', potentialSavings: 200 },
    { category: 'savings', suggestion: 'Increase emergency fund contributions', potentialSavings: 300 }
  ],
  summary: 'Your financial health looks good with a positive cash flow of $1,500 per month.'
};

describe('ReportDashboard', () => {
  it('renders loading skeleton when isLoading is true', () => {
    render(<ReportDashboard isLoading={true} />);
    
    expect(screen.queryByTestId('financial-charts')).not.toBeInTheDocument();
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders no data message when reportData is undefined', () => {
    render(<ReportDashboard />);
    
    expect(screen.getByText('No report data available')).toBeInTheDocument();
  });

  it('renders processing message when status is processing', () => {
    render(<ReportDashboard status="processing" />);
    
    expect(screen.getByText('Report is still being generated...')).toBeInTheDocument();
    expect(screen.getByText('Please wait while we analyze your financial data.')).toBeInTheDocument();
  });

  it('renders failed message when status is failed', () => {
    render(<ReportDashboard status="failed" />);
    
    expect(screen.getByText('Report generation failed')).toBeInTheDocument();
    expect(screen.getByText('Please try regenerating the report or contact support.')).toBeInTheDocument();
  });

  it('renders financial metrics correctly', () => {
    render(<ReportDashboard reportData={mockReportData} status="completed" />);
    
    expect(screen.getByText('Total Income')).toBeInTheDocument();
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
    expect(screen.getByText('Net Cash Flow')).toBeInTheDocument();
    
    expect(screen.getByText('$5,000.00')).toBeInTheDocument();
    expect(screen.getByText('$3,500.00')).toBeInTheDocument();
    expect(screen.getByText('$1,500.00')).toBeInTheDocument();
  });

  it('renders summary section when summary is provided', () => {
    render(<ReportDashboard reportData={mockReportData} status="completed" />);
    
    expect(screen.getByText('Financial Summary')).toBeInTheDocument();
    expect(screen.getByText(mockReportData.summary)).toBeInTheDocument();
  });

  it('renders charts and insights components when data is available', () => {
    render(<ReportDashboard reportData={mockReportData} status="completed" />);
    
    expect(screen.getByTestId('financial-charts')).toBeInTheDocument();
    expect(screen.getByTestId('insights-list')).toBeInTheDocument();
    expect(screen.getByTestId('recommendation-cards')).toBeInTheDocument();
  });

  it('applies correct color classes for positive net cash flow', () => {
    render(<ReportDashboard reportData={mockReportData} status="completed" />);
    
    const netCashFlowCard = screen.getByText('$1,500.00').closest('.text-green-600');
    expect(netCashFlowCard).toBeInTheDocument();
  });

  it('applies correct color classes for negative net cash flow', () => {
    const negativeData = {
      ...mockReportData,
      netCashFlow: -500
    };
    
    render(<ReportDashboard reportData={negativeData} status="completed" />);
    
    const netCashFlowCard = screen.getByText('-$500.00').closest('.text-red-600');
    expect(netCashFlowCard).toBeInTheDocument();
  });

  it('handles missing insights gracefully', () => {
    const dataWithoutInsights = {
      ...mockReportData,
      insights: []
    };
    
    render(<ReportDashboard reportData={dataWithoutInsights} status="completed" />);
    
    expect(screen.getByTestId('financial-charts')).toBeInTheDocument();
    expect(screen.queryByTestId('insights-list')).not.toBeInTheDocument();
  });

  it('handles missing recommendations gracefully', () => {
    const dataWithoutRecommendations = {
      ...mockReportData,
      recommendations: []
    };
    
    render(<ReportDashboard reportData={dataWithoutRecommendations} status="completed" />);
    
    expect(screen.getByTestId('financial-charts')).toBeInTheDocument();
    expect(screen.queryByTestId('recommendation-cards')).not.toBeInTheDocument();
  });

  it('formats currency values correctly', () => {
    const dataWithDecimals = {
      ...mockReportData,
      totalIncome: 5432.67,
      totalExpenses: 3210.45
    };
    
    render(<ReportDashboard reportData={dataWithDecimals} status="completed" />);
    
    expect(screen.getByText('$5,432.67')).toBeInTheDocument();
    expect(screen.getByText('$3,210.45')).toBeInTheDocument();
  });
});
