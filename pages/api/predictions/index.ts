import type { NextApiRequest, NextApiResponse } from 'next';

interface PredictionEndpoint {
  path: string;
  description: string;
  methods: string[];
}

interface ApiIndexResponse {
  service: string;
  version: string;
  endpoints: PredictionEndpoint[];
  documentation: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiIndexResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  res.status(200).json({
    service: 'EU Crypto Predictions API',
    version: '1.0.0',
    endpoints: [
      {
        path: '/api/predictions/regulations',
        description: 'Active regulations with probability scores and confidence intervals',
        methods: ['GET'],
      },
      {
        path: '/api/predictions/politicians',
        description: 'Politician stance predictions and influence metrics',
        methods: ['GET'],
      },
      {
        path: '/api/predictions/timeline',
        description: 'Chronological timeline of expected regulatory events',
        methods: ['GET'],
      },
    ],
    documentation: 'Data provided by Judas Intelligence Feed',
  });
}
