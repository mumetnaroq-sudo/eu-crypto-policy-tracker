import type { NextApiRequest, NextApiResponse } from 'next';
import { activeRegulations, keyPoliticians, recentAlerts } from '@/data/policies';
import type { TimelineEvent, PredictionsResponse } from './types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PredictionsResponse<TimelineEvent>>
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const events: TimelineEvent[] = [];

  // Add regulation events
  activeRegulations.forEach(reg => {
    const expectedDate = parseTimelineToDate(reg.timeline);
    events.push({
      id: `reg-${reg.id}`,
      type: 'regulation',
      title: reg.title,
      description: reg.description,
      probability: reg.probability,
      confidence: Math.round(reg.probability * 0.9), // Confidence correlates with probability
      expectedDate,
      timeframe: reg.timeline,
      category: reg.category,
      relatedEntities: reg.keyActors,
      lastUpdated: new Date().toISOString(),
    });
  });

  // Add politician prediction events
  keyPoliticians.forEach(pol => {
    pol.predictions.forEach(pred => {
      events.push({
        id: `pol-${pred.id}`,
        type: 'politician',
        title: `${pol.name}: ${pred.target}`,
        description: pred.reasoning,
        probability: pred.probability,
        confidence: pred.confidence,
        expectedDate: parseTimeframeToDate(pred.timeframe),
        timeframe: pred.timeframe,
        category: 'political-stance',
        relatedEntities: [pol.name, pol.role],
        lastUpdated: new Date().toISOString(),
      });
    });
  });

  // Add critical alerts as events
  recentAlerts
    .filter(alert => alert.severity === 'critical')
    .forEach(alert => {
      events.push({
        id: `alert-${alert.id}`,
        type: 'alert',
        title: alert.message,
        description: `Source: ${alert.source}`,
        probability: 90, // Critical alerts are high probability
        confidence: 85,
        expectedDate: alert.timestamp,
        timeframe: 'Immediate',
        category: 'intelligence-alert',
        relatedEntities: [alert.source],
        lastUpdated: new Date().toISOString(),
      });
    });

  // Sort by expected date (soonest first)
  events.sort((a, b) => {
    return new Date(a.expectedDate).getTime() - new Date(b.expectedDate).getTime();
  });

  res.status(200).json({
    data: events,
    meta: {
      total: events.length,
      generatedAt: new Date().toISOString(),
      dataSource: 'Judas Intelligence Feed',
      version: '1.0.0',
    },
  });
}

// Parse timeline strings to approximate dates
function parseTimelineToDate(timeline: string): string {
  const now = new Date();
  const year = now.getFullYear();

  // Handle quarters
  if (timeline.includes('Q1')) {
    return `${year}-03-31T00:00:00Z`;
  } else if (timeline.includes('Q2')) {
    return `${year}-06-30T00:00:00Z`;
  } else if (timeline.includes('Q3')) {
    return `${year}-09-30T00:00:00Z`;
  } else if (timeline.includes('Q4')) {
    return `${year}-12-31T00:00:00Z`;
  }

  // Handle years
  if (timeline.includes('2025')) {
    return `2025-06-30T00:00:00Z`;
  } else if (timeline.includes('2024')) {
    return `2024-12-31T00:00:00Z`;
  }

  // Handle special cases
  if (timeline.toLowerCase().includes('immediate')) {
    return now.toISOString();
  }
  if (timeline.toLowerCase().includes('ongoing')) {
    return now.toISOString();
  }

  // Default to 6 months out
  return new Date(now.setMonth(now.getMonth() + 6)).toISOString();
}

// Parse politician prediction timeframes
function parseTimeframeToDate(timeframe: string): string {
  const now = new Date();

  // Handle year ranges
  if (timeframe.includes('2024-2025')) {
    return `2024-12-31T00:00:00Z`;
  } else if (timeframe.includes('2024')) {
    return `2024-12-31T00:00:00Z`;
  } else if (timeframe.includes('2025')) {
    return `2025-06-30T00:00:00Z`;
  }

  // Handle quarters
  if (timeframe.includes('Q1')) {
    return `${now.getFullYear()}-03-31T00:00:00Z`;
  } else if (timeframe.includes('Q2')) {
    return `${now.getFullYear()}-06-30T00:00:00Z`;
  } else if (timeframe.includes('Q3')) {
    return `${now.getFullYear()}-09-30T00:00:00Z`;
  } else if (timeframe.includes('Q4')) {
    return `${now.getFullYear()}-12-31T00:00:00Z`;
  }

  // Handle special cases
  if (timeframe.toLowerCase().includes('ongoing')) {
    return now.toISOString();
  }

  // Default to 3 months out
  return new Date(now.setMonth(now.getMonth() + 3)).toISOString();
}
