import type { NextApiRequest, NextApiResponse } from 'next';
import { activeRegulations } from '@/data/policies';
import type { RegulationPrediction, PredictionsResponse } from './types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PredictionsResponse<RegulationPrediction>>
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  // Transform regulations to include confidence intervals
  const predictions: RegulationPrediction[] = activeRegulations.map(reg => {
    // Calculate confidence interval based on probability
    // Higher probability = tighter interval (more certain)
    // Lower probability = wider interval (less certain)
    const uncertainty = Math.max(5, Math.min(20, 100 - reg.probability) / 3);

    return {
      ...reg,
      confidenceInterval: {
        low: Math.max(0, Math.round(reg.probability - uncertainty)),
        high: Math.min(100, Math.round(reg.probability + uncertainty)),
      },
      lastUpdated: new Date().toISOString(),
      dataSource: 'Judas Intelligence Feed',
    };
  });

  res.status(200).json({
    data: predictions,
    meta: {
      total: predictions.length,
      generatedAt: new Date().toISOString(),
      dataSource: 'Judas Intelligence Feed',
      version: '1.0.0',
    },
  });
}
