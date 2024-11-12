import React from 'react';
import { TrendingUp } from 'lucide-react';
import type { PromotionImpact } from '../types';

interface ImpactAnalysisProps {
  impacts: PromotionImpact[];
}

export default function ImpactAnalysis({ impacts }: ImpactAnalysisProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <TrendingUp className="w-6 h-6" />
        Promotion Impact Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {impacts.map((impact) => (
          <div
            key={impact.metric}
            className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
          >
            <h3 className="text-sm font-medium text-gray-500">{impact.metric}</h3>
            <div className="mt-2 flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {typeof impact.withPromotion === 'number'
                    ? impact.withPromotion.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                    : impact.withPromotion}
                </p>
                <p className="text-sm text-gray-500">With Promotion</p>
              </div>
              <div className={`text-sm font-medium ${
                impact.percentageChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {impact.percentageChange >= 0 ? '+' : ''}
                {impact.percentageChange.toFixed(1)}%
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              vs {impact.withoutPromotion.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}