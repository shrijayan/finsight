import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Info, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { AnalysisReport } from 'lib/src/types';

interface InsightsListProps {
  insights: NonNullable<AnalysisReport['generatedData']>['insights'];
}

const severityConfig = {
  low: { 
    icon: Info, 
    color: 'bg-blue-100 text-blue-800 border-blue-200', 
    bgColor: 'bg-blue-50',
    badgeClass: 'bg-blue-100 text-blue-800'
  },
  medium: { 
    icon: AlertTriangle, 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
    bgColor: 'bg-yellow-50',
    badgeClass: 'bg-yellow-100 text-yellow-800'
  },
  high: { 
    icon: AlertCircle, 
    color: 'bg-red-100 text-red-800 border-red-200', 
    bgColor: 'bg-red-50',
    badgeClass: 'bg-red-100 text-red-800'
  }
};

const getInsightIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'spending':
    case 'expense':
      return TrendingDown;
    case 'income':
    case 'revenue':
      return TrendingUp;
    case 'trend':
    case 'pattern':
      return TrendingUp;
    default:
      return Info;
  }
};

export function InsightsList({ insights }: InsightsListProps) {
  if (!insights || insights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Financial Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">No insights available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Info className="h-5 w-5" />
          <span>Financial Insights</span>
          <Badge variant="secondary" className="ml-2">
            {insights.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => {
          const config = severityConfig[insight.severity] || severityConfig.low;
          const IconComponent = config.icon;
          const InsightTypeIcon = getInsightIcon(insight.type);

          return (
            <Alert key={index} className={`${config.bgColor} border ${config.color}`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <IconComponent className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <InsightTypeIcon className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">
                        {insight.type}
                      </span>
                    </div>
                    <Badge variant="secondary" className={config.badgeClass}>
                      {insight.severity}
                    </Badge>
                  </div>
                  
                  <AlertDescription className="text-sm leading-relaxed">
                    {insight.description}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          );
        })}

        {/* Insights Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Insights Summary</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-semibold text-red-600">
                {insights.filter(i => i.severity === 'high').length}
              </p>
              <p className="text-xs text-gray-600">High Priority</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-yellow-600">
                {insights.filter(i => i.severity === 'medium').length}
              </p>
              <p className="text-xs text-gray-600">Medium Priority</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-blue-600">
                {insights.filter(i => i.severity === 'low').length}
              </p>
              <p className="text-xs text-gray-600">Low Priority</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
