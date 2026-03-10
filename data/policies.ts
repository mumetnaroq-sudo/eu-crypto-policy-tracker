import { Regulation, Politician, Alert } from '@/types';

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
        timeframe: '2024-2025',
        reasoning: 'Consistent public statements favoring digital euro',
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
        timeframe: 'Q2 2024',
        reasoning: 'Voting record shows pro-innovation stance',
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
        timeframe: 'Ongoing',
        reasoning: 'Mediator role in MiCA negotiations',
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
