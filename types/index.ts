export interface Country {
  code: string;
  name: string;
  stance: 'pro-crypto' | 'neutral' | 'restrictive';
  regulations: Regulation[];
  lastUpdated: string;
}

export interface Regulation {
  id: string;
  title: string;
  category: 'licensing' | 'taxation' | 'consumer-protection' | 'aml-compliance';
  status: 'draft' | 'pending' | 'active' | 'rejected';
  probability: number; // 0-100% chance of passing/remaining
  timeline: string;
  description: string;
  keyActors: string[];
}

export interface Politician {
  id: string;
  name: string;
  country: string;
  role: string;
  stance: 'supportive' | 'neutral' | 'opposed';
  influence: number; // 1-10
  predictions: Prediction[];
}

export interface Prediction {
  id: string;
  target: string;
  probability: number; // 0-100
  confidence: number; // 0-100 model confidence
  confidenceInterval: {
    lower: number; // lower bound of probability
    upper: number; // upper bound of probability
  };
  timeframe: string;
  expectedDate: string; // ISO date for timeline sorting
  reasoning: string;
  category: 'regulation' | 'political' | 'market';
  signals: string[]; // key signals supporting prediction
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  probability: number;
  type: 'regulation' | 'vote' | 'deadline' | 'announcement';
  relatedRegulationId?: string;
}

export interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: string;
  source: string;
}

export interface PredictionSummary {
  avgConfidence: number;
  totalPredictions: number;
  highConfidenceCount: number; // >80%
  regulatoryRiskScore: number; // 0-100 aggregated risk
}
