import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'lucide-react';
import type { SalesMetric } from '../types';

interface MetricsDisplayProps {
  data: SalesMetric[];
  promotionPeriods: { start: Date; end: Date }[];
}

export default function MetricsDisplay({ data, promotionPeriods }: MetricsDisplayProps) {
  const metrics = [
    { name: 'Revenue', key: 'revenue', color: '#2563eb' },
    { name: 'Orders', key: 'orders', color: '#16a34a' },
    { name: 'Avg Order Value', key: 'averageOrderValue', color: '#9333ea' },
    { name: 'Conversion Rate', key: 'conversionRate', color: '#dc2626' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <BarChart className="w-6 h-6" />
        Sales Metrics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {metrics.map((metric) => (
          <div key={metric.key} className="h-[300px]">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">{metric.name}</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  formatter={(value) => [value, metric.name]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={metric.key}
                  stroke={metric.color}
                  strokeWidth={2}
                  dot={false}
                />
                {promotionPeriods.map((period, index) => (
                  <rect
                    key={index}
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill={metric.color}
                    fillOpacity="0.1"
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}