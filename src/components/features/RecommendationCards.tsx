import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, DollarSign, TrendingUp, Target, Star } from 'lucide-react';
import { AnalysisReport } from 'lib/src/types';

interface RecommendationCardsProps {
  recommendations: NonNullable<AnalysisReport['generatedData']>['recommendations'];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'savings':
    case 'save':
      return DollarSign;
    case 'investment':
    case 'invest':
      return TrendingUp;
    case 'budget':
    case 'budgeting':
      return Target;
    case 'optimization':
    case 'optimize':
      return Star;
    default:
      return Lightbulb;
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'savings':
    case 'save':
      return 'bg-green-50 border-green-200 text-green-800';
    case 'investment':
    case 'invest':
      return 'bg-blue-50 border-blue-200 text-blue-800';
    case 'budget':
    case 'budgeting':
      return 'bg-purple-50 border-purple-200 text-purple-800';
    case 'optimization':
    case 'optimize':
      return 'bg-orange-50 border-orange-200 text-orange-800';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-800';
  }
};

export function RecommendationCards({ recommendations }: RecommendationCardsProps) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">No recommendations available</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate total potential savings
  const totalSavings = recommendations.reduce((sum, rec) => sum + (rec.potentialSavings || 0), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5" />
            <span>Recommendations</span>
            <Badge variant="secondary" className="ml-2">
              {recommendations.length}
            </Badge>
          </div>
          {totalSavings > 0 && (
            <div className="text-sm text-green-600 font-medium">
              Potential Savings: {formatCurrency(totalSavings)}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((recommendation, index) => {
          const IconComponent = getCategoryIcon(recommendation.category);
          const colorClass = getCategoryColor(recommendation.category);

          return (
            <div
              key={index}
              className={`rounded-lg border p-4 ${colorClass}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <IconComponent className="h-5 w-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium capitalize">
                      {recommendation.category}
                    </h4>
                    {recommendation.potentialSavings > 0 && (
                      <Badge variant="secondary" className="bg-white text-green-700 border-green-300">
                        Save {formatCurrency(recommendation.potentialSavings)}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm leading-relaxed">
                    {recommendation.suggestion}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Recommendations Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Action Items</h4>
          
          <div className="space-y-2">
            {recommendations.slice(0, 3).map((rec, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                <span className="text-gray-700">
                  Focus on {rec.category.toLowerCase()} 
                  {rec.potentialSavings > 0 && (
                    <span className="text-green-600 font-medium ml-1">
                      ({formatCurrency(rec.potentialSavings)} potential savings)
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>

          {totalSavings > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  Total Potential Monthly Savings:
                </span>
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(totalSavings)}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
