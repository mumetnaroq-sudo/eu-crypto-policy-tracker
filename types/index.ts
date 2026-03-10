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
  probability: number;
  confidence: number; // 0-100
  timeframe: string;
  reasoning: string;
}

export interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: string;
  source: string;
}
