import React from 'react';
import { Package, TrendingUp, Truck } from 'lucide-react';

interface ShippingMetricsProps {
  totalShipments: number;
  averageShippingCost: number;
  shippingMethods: { [key: string]: number };
}

export default function ShippingMetrics({
  totalShipments,
  averageShippingCost,
  shippingMethods,
}: ShippingMetricsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Truck className="w-6 h-6" />
        Shipping Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">Total Shipments</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{totalShipments}</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-green-900">Avg. Shipping Cost</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">
            ${averageShippingCost.toFixed(2)}
          </p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">
            Shipping Methods
          </h3>
          <div className="space-y-2">
            {Object.entries(shippingMethods).map(([method, count]) => (
              <div key={method} className="flex justify-between items-center">
                <span className="text-purple-700">{method}</span>
                <span className="font-semibold text-purple-900">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}