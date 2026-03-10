import type { NextApiRequest, NextApiResponse } from 'next';
import { keyPoliticians } from '@/data/policies';
import type { PoliticianPrediction, PredictionsResponse } from './types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PredictionsResponse<PoliticianPrediction>>
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  // Transform politicians to include stance probability
  const predictions: PoliticianPrediction[] = keyPoliticians.map(pol => {
    // Calculate stance probability based on stance category
    // This represents the likelihood they maintain their current position
    const stanceProbability = pol.stance === 'neutral' ? 60 : 85;

    return {
      id: pol.id,
      name: pol.name,
      country: pol.country,
      role: pol.role,
      stance: pol.stance,
      stanceProbability,
      influence: pol.influence,
      predictions: pol.predictions.map(pred => ({
        id: pred.id,
        target: pred.target,
        probability: pred.probability,
        confidence: pred.confidence,
        timeframe: pred.timeframe,
        reasoning: pred.reasoning,
      })),
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
