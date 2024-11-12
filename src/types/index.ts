export interface Promotion {
  id: string;
  type: 'percentage' | 'bogo' | 'shipping';
  value: string;
  startDate: Date;
  endDate: Date;
  targetSegment: 'new' | 'loyal' | 'all';
}

export interface SalesMetric {
  date: Date;
  revenue: number;
  orders: number;
  averageOrderValue: number;
  conversionRate: number;
}

export interface PromotionImpact {
  metric: string;
  withPromotion: number;
  withoutPromotion: number;
  difference: number;
  percentageChange: number;
}