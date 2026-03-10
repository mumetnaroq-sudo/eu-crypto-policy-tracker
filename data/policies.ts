import { Regulation, Politician, Alert, Prediction, TimelineEvent } from '@/types';

export const activeRegulations: Regulation[] = [
  {
    id: 'mica-2024',
    title: 'MiCA Framework Implementation',
    category: 'licensing',
    status: 'active',
    probability: 95,
    timeline: 'Q2 2024',
    description: 'Markets in Crypto-Assets regulation full implementation across EU member states',
    keyActors: ['ESMA', 'ECB', 'National Regulators'],
  },
  {
    id: 'travel-rule-2024',
    title: 'Travel Rule Extension',
    category: 'aml-compliance',
    status: 'pending',
    probability: 78,
    timeline: 'Q3 2024',
    description: 'Extended AML requirements for DeFi protocols and NFT marketplaces',
    keyActors: ['Europol', 'FATF', 'EU Parliament'],
  },
  {
    id: 'defi-licensing',
    title: 'DeFi Licensing Framework',
    category: 'licensing',
    status: 'draft',
    probability: 45,
    timeline: '2025',
    description: 'Comprehensive licensing regime for DeFi protocols operating in EU',
    keyActors: ['ESMA', 'DeFi Alliance', 'ECB'],
  },
  {
    id: 'stablecoin-reserves',
    title: 'Stablecoin Reserve Requirements',
    category: 'consumer-protection',
    status: 'active',
    probability: 88,
    timeline: 'Immediate',
    description: 'Mandatory 1:1 reserves for significant stablecoins',
    keyActors: ['ECB', 'Bank of France', 'Bundesbank'],
  },
  {
    id: 'crypto-tax-harmonization',
    title: 'Crypto Tax Harmonization',
    category: 'taxation',
    status: 'draft',
    probability: 62,
    timeline: '2025',
    description: 'Unified taxation framework for crypto gains across EU',
    keyActors: ['ECOFIN', 'Eurogroup', 'OECD'],
  },
  {
    id: 'nft-securities',
    title: 'NFT Securities Classification',
    category: 'consumer-protection',
    status: 'pending',
    probability: 55,
    timeline: 'Q4 2024',
    description: 'Clarification on when NFTs qualify as securities',
    keyActors: ['ESMA', 'SEC (consultation)', 'EU Commission'],
  },
];

export const keyPoliticians: Politician[] = [
  {
    id: 'lagarde',
    name: 'Christine Lagarde',
    country: 'EU',
    role: 'ECB President',
    stance: 'opposed',
    influence: 10,
    predictions: [
      {
        id: 'pred-1',
        target: 'Support CBDC over private crypto',
        probability: 92,
        confidence: 85,
        confidenceInterval: { lower: 88, upper: 96 },
        timeframe: '2024-2025',
        expectedDate: '2024-12-01',
        reasoning: 'Consistent public statements favoring digital euro',
        category: 'political',
        signals: ['Digital Euro project accelerated', 'Critical of Bitcoin', 'Pushed for MiCA strict implementation'],
      },
      {
        id: 'pred-4',
        target: 'Oppose DeFi lending unregulated',
        probability: 78,
        confidence: 72,
        confidenceInterval: { lower: 70, upper: 86 },
        timeframe: 'Q4 2024',
        expectedDate: '2024-10-15',
        reasoning: 'ECB financial stability concerns about uncollateralized lending',
        category: 'regulation',
        signals: ['ECB risk report highlighted DeFi', 'Called for expanded MiCA scope'],
      },
    ],
  },
  {
    id: 'mcdonald',
    name: 'Chris MacDonald',
    country: 'IE',
    role: 'MEP - ECON Committee',
    stance: 'supportive',
    influence: 7,
    predictions: [
      {
        id: 'pred-2',
        target: 'Push for innovation-friendly amendments',
        probability: 75,
        confidence: 70,
        confidenceInterval: { lower: 65, upper: 85 },
        timeframe: 'Q2 2024',
        expectedDate: '2024-05-20',
        reasoning: 'Voting record shows pro-innovation stance',
        category: 'regulation',
        signals: ['Voted against strict staking rules', 'Sponsored startup exemption clause'],
      },
      {
        id: 'pred-5',
        target: 'Support sandbox expansion',
        probability: 68,
        confidence: 65,
        confidenceInterval: { lower: 58, upper: 78 },
        timeframe: 'Q3 2024',
        expectedDate: '2024-08-01',
        reasoning: 'Previous advocacy for regulatory sandboxes in Ireland',
        category: 'regulation',
        signals: ['Spoke at Blockchain Ireland summit', 'Proposed pilot program amendment'],
      },
    ],
  },
  {
    id: 'ferrari',
    name: 'Stefano Ferrari',
    country: 'IT',
    role: 'MEP - Lead MiCA Negotiator',
    stance: 'neutral',
    influence: 9,
    predictions: [
      {
        id: 'pred-3',
        target: 'Support balanced regulatory approach',
        probability: 80,
        confidence: 75,
        confidenceInterval: { lower: 72, upper: 88 },
        timeframe: 'Ongoing',
        expectedDate: '2024-06-30',
        reasoning: 'Mediator role in MiCA negotiations',
        category: 'political',
        signals: ['Brokered DeFi compromise', 'Consistent centrist voting pattern'],
      },
      {
        id: 'pred-6',
        target: 'NFT classification clarification',
        probability: 65,
        confidence: 60,
        confidenceInterval: { lower: 50, upper: 80 },
        timeframe: '2025',
        expectedDate: '2025-03-15',
        reasoning: 'ESMA consultation response indicates direction',
        category: 'regulation',
        signals: ['Requested ESMA guidance', 'Met with NFT industry groups'],
      },
    ],
  },
  {
    id: 'tinagli',
    name: 'Irene Tinagli',
    country: 'IT',
    role: 'MEP - ECON Chair',
    stance: 'neutral',
    influence: 8,
    predictions: [
      {
        id: 'pred-7',
        target: 'Tax harmonization priority push',
        probability: 55,
        confidence: 58,
        confidenceInterval: { lower: 40, upper: 70 },
        timeframe: '2025',
        expectedDate: '2025-01-15',
        reasoning: 'ECON Committee agenda prioritization vote upcoming',
        category: 'political',
        signals: ['ECOFIN coordination meeting scheduled', 'Eurogroup tax brief requested'],
      },
    ],
  },
];

export const recentAlerts: Alert[] = [
  {
    id: 'alert-1',
    severity: 'critical',
    message: 'Germany proposes stricter DeFi reporting requirements',
    timestamp: '2024-03-09T14:30:00Z',
    source: 'Bundestag Committee',
  },
  {
    id: 'alert-2',
    severity: 'warning',
    message: 'France delays crypto license approvals pending MiCA clarity',
    timestamp: '2024-03-08T09:15:00Z',
    source: 'AMF',
  },
  {
    id: 'alert-3',
    severity: 'info',
    message: 'Malta updates VFA framework to align with MiCA',
    timestamp: '2024-03-07T16:45:00Z',
    source: 'MFSA',
  },
];

export const getProbabilityColor = (probability: number): string => {
  if (probability >= 80) return '#22c55e'; // green
  if (probability >= 50) return '#eab308'; // yellow
  return '#ef4444'; // red
};

export const getStanceEmoji = (stance: string): string => {
  switch (stance) {
    case 'supportive':
    case 'pro-crypto':
      return '▲';
    case 'opposed':
    case 'restrictive':
      return '▼';
    default:
      return '◆';
  }
};

export const getSeverityEmoji = (severity: string): string => {
  switch (severity) {
    case 'critical':
      return '●';
    case 'warning':
      return '◐';
    default:
      return '○';
  }
};

// Timeline events derived from regulations and predictions
export const timelineEvents: TimelineEvent[] = [
  {
    id: 'evt-1',
    date: '2024-06-30',
    title: 'MiCA Full Implementation',
    description: 'All EU member states must have MiCA frameworks operational',
    probability: 95,
    type: 'deadline',
    relatedRegulationId: 'mica-2024',
  },
  {
    id: 'evt-2',
    date: '2024-08-15',
    title: 'Travel Rule Extension Vote',
    description: 'European Parliament vote on extended AML requirements',
    probability: 78,
    type: 'vote',
    relatedRegulationId: 'travel-rule-2024',
  },
  {
    id: 'evt-3',
    date: '2024-10-01',
    title: 'DeFi Licensing Proposal',
    description: 'Expected proposal date for comprehensive DeFi framework',
    probability: 45,
    type: 'announcement',
    relatedRegulationId: 'defi-licensing',
  },
  {
    id: 'evt-4',
    date: '2024-11-30',
    title: 'NFT Securities Guidance',
    description: 'ESMA expected to publish NFT classification guidance',
    probability: 65,
    type: 'announcement',
    relatedRegulationId: 'nft-securities',
  },
  {
    id: 'evt-5',
    date: '2025-01-01',
    title: 'Tax Harmonization Framework',
    description: 'Proposed effective date for unified crypto taxation',
    probability: 40,
    type: 'regulation',
    relatedRegulationId: 'crypto-tax-harmonization',
  },
  {
    id: 'evt-6',
    date: '2024-09-20',
    title: 'ECB Digital Euro Phase 2',
    description: 'Preparation phase launch for digital euro',
    probability: 88,
    type: 'announcement',
  },
];

// All predictions flattened for easy access
export const allPredictions: Prediction[] = keyPoliticians.flatMap(p => p.predictions);

// Helper to get confidence interval display
export const getConfidenceIntervalDisplay = (pred: Prediction): string => {
  const { lower, upper } = pred.confidenceInterval;
  return `${lower}% - ${upper}%`;
};

// Helper to get prediction strength based on confidence
export const getPredictionStrength = (confidence: number): { label: string; icon: string } => {
  if (confidence >= 80) return { label: 'High', icon: '▲' };
  if (confidence >= 60) return { label: 'Medium', icon: '◆' };
  return { label: 'Low', icon: '▼' };
};

// Helper to sort timeline events by date
export const getSortedTimeline = (): TimelineEvent[] => {
  return [...timelineEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Helper to get upcoming events (next 90 days)
export const getUpcomingEvents = (): TimelineEvent[] => {
  const now = new Date();
  const cutoff = new Date();
  cutoff.setDate(now.getDate() + 90);
  return getSortedTimeline().filter(e => {
    const date = new Date(e.date);
    return date >= now && date <= cutoff;
  });
};

// Calculate prediction summary statistics
export const getPredictionSummary = () => {
  const preds = allPredictions;
  const avgConfidence = Math.round(preds.reduce((acc, p) => acc + p.confidence, 0) / preds.length);
  const highConfidenceCount = preds.filter(p => p.confidence >= 80).length;
  const regulatoryRiskScore = Math.round(
    preds.filter(p => p.category === 'regulation')
      .reduce((acc, p) => acc + p.probability, 0) /
      Math.max(preds.filter(p => p.category === 'regulation').length, 1)
  );
  return {
    avgConfidence,
    totalPredictions: preds.length,
    highConfidenceCount,
    regulatoryRiskScore,
  };
};
