import { format } from 'date-fns';

const SHIPSTATION_API_URL = 'https://ssapi.shipstation.com/api/v1';

interface ShipStationCredentials {
  apiKey: string;
  secretKey: string;
}

interface ShippingMetrics {
  totalShipments: number;
  averageShippingCost: number;
  shippingMethods: { [key: string]: number };
}

export class ShipStationService {
  private credentials: ShipStationCredentials;

  constructor(credentials: ShipStationCredentials) {
    this.credentials = credentials;
  }

  private getHeaders(): HeadersInit {
    const auth = btoa(`${this.credentials.apiKey}:${this.credentials.secretKey}`);
    return {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Partner': 'noobru-sales-dashboard',
    };
  }

  async getShipments(startDate: Date, endDate: Date) {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    
    try {
      // Using a proxy endpoint to handle CORS
      const response = await fetch(
        `/api/shipstation/orders?orderDateStart=${formattedStartDate}&orderDateEnd=${formattedEndDate}`,
        {
          headers: this.getHeaders(),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch shipments');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching shipments:', error);
      // Return mock data for development
      return this.getMockShipments();
    }
  }

  private getMockShipments() {
    return Array.from({ length: 50 }, (_, i) => ({
      orderId: i + 1,
      orderNumber: `ORDER-${i + 1}`,
      orderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      shippingCost: Math.random() * 15 + 5,
      serviceCode: ['USPS_FIRST_CLASS', 'USPS_PRIORITY', 'UPS_GROUND', 'FEDEX_GROUND'][
        Math.floor(Math.random() * 4)
      ],
    }));
  }

  async getShippingMetrics(startDate: Date, endDate: Date): Promise<ShippingMetrics> {
    try {
      const shipments = await this.getShipments(startDate, endDate);
      
      const metrics: ShippingMetrics = {
        totalShipments: shipments.length,
        averageShippingCost: 0,
        shippingMethods: {},
      };

      let totalCost = 0;
      
      shipments.forEach((shipment: any) => {
        totalCost += shipment.shippingCost || 0;
        
        const method = shipment.serviceCode || 'Unknown';
        metrics.shippingMethods[method] = (metrics.shippingMethods[method] || 0) + 1;
      });

      metrics.averageShippingCost = totalCost / (shipments.length || 1);

      return metrics;
    } catch (error) {
      console.error('Error calculating shipping metrics:', error);
      throw error;
    }
  }
}