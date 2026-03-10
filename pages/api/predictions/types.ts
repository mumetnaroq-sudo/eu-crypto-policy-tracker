export interface RegulationPrediction {
  id: string;
  title: string;
  category: 'licensing' | 'taxation' | 'consumer-protection' | 'aml-compliance';
  status: 'draft' | 'pending' | 'active' | 'rejected';
  probability: number;
  confidenceInterval: {
    low: number;
    high: number;
  };
  timeline: string;
  description: string;
  keyActors: string[];
  lastUpdated: string;
  dataSource: string;
}

export interface PoliticianPrediction {
  id: string;
  name: string;
  country: string;
  role: string;
  stance: 'supportive' | 'neutral' | 'opposed';
  stanceProbability: number;
  influence: number;
  predictions: {
    id: string;
    target: string;
    probability: number;
    confidence: number;
    timeframe: string;
    reasoning: string;
  }[];
  lastUpdated: string;
  dataSource: string;
}

export interface TimelineEvent {
  id: string;
  type: 'regulation' | 'politician' | 'alert';
  title: string;
  description: string;
  probability: number;
  confidence: number;
  expectedDate: string;
  timeframe: string;
  category: string;
  relatedEntities: string[];
  lastUpdated: string;
}

export interface PredictionsResponse<T> {
  data: T[];
  meta: {
    total: number;
    generatedAt: string;
    dataSource: string;
    version: string;
  };
}
