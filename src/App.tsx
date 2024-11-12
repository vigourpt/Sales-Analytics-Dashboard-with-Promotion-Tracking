import React, { useEffect, useState } from 'react';
import { LayoutDashboard } from 'lucide-react';
import PromotionForm from './components/PromotionForm';
import MetricsDisplay from './components/MetricsDisplay';
import ImpactAnalysis from './components/ImpactAnalysis';
import ShippingMetrics from './components/ShippingMetrics';
import { ShipStationService } from './services/shipstation';

// Mock data - replace with real API calls in production
const mockSalesData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2024, 0, i + 1),
  revenue: Math.random() * 100000 + 50000,
  orders: Math.floor(Math.random() * 1000 + 500),
  averageOrderValue: Math.random() * 200 + 100,
  conversionRate: Math.random() * 0.1 + 0.02,
}));

const mockImpacts = [
  {
    metric: 'Revenue',
    withPromotion: 85000,
    withoutPromotion: 75000,
    difference: 10000,
    percentageChange: 13.3,
  },
  {
    metric: 'Orders',
    withPromotion: 750,
    withoutPromotion: 600,
    difference: 150,
    percentageChange: 25,
  },
  {
    metric: 'Avg Order Value',
    withPromotion: 113.33,
    withoutPromotion: 125,
    difference: -11.67,
    percentageChange: -9.3,
  },
  {
    metric: 'Conversion Rate',
    withPromotion: 0.045,
    withoutPromotion: 0.035,
    difference: 0.01,
    percentageChange: 28.6,
  },
];

const shipStationService = new ShipStationService({
  apiKey: '904fd90644cb455b98282d4b94e2b68f',
  secretKey: '690a277df7a5419d96f08e3cec047c70',
});

function App() {
  const [shippingMetrics, setShippingMetrics] = useState({
    totalShipments: 0,
    averageShippingCost: 0,
    shippingMethods: {},
  });

  useEffect(() => {
    const fetchShippingMetrics = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        const metrics = await shipStationService.getShippingMetrics(startDate, endDate);
        setShippingMetrics(metrics);
      } catch (error) {
        console.error('Failed to fetch shipping metrics:', error);
      }
    };

    fetchShippingMetrics();
  }, []);

  const handlePromotionSubmit = (data: any) => {
    console.log('New promotion:', data);
    // In production: Make API call to save promotion
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Noobru Sales Analytics
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <PromotionForm onSubmit={handlePromotionSubmit} />
          
          <ShippingMetrics {...shippingMetrics} />
          
          <MetricsDisplay
            data={mockSalesData}
            promotionPeriods={[
              {
                start: new Date(2024, 0, 10),
                end: new Date(2024, 0, 20),
              },
            ]}
          />
          
          <ImpactAnalysis impacts={mockImpacts} />
        </div>
      </main>
    </div>
  );
}

export default App;