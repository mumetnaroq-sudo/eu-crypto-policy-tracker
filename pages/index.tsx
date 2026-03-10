import {
  activeRegulations,
  keyPoliticians,
  recentAlerts,
  getProbabilityColor,
  getStanceEmoji,
  getSeverityEmoji,
  allPredictions,
  timelineEvents,
  getSortedTimeline,
  getUpcomingEvents,
  getPredictionSummary,
  getConfidenceIntervalDisplay,
  getPredictionStrength,
} from '@/data/policies';
import { euCountries } from '@/data/eu-countries';
import { Prediction, TimelineEvent } from '@/types';

// Components
const ConfidenceBar = ({ lower, upper, probability }: { lower: number; upper: number; probability: number }) => (
  <div style={{ marginTop: '8px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '2px' }}>
      <span>Confidence Interval</span>
      <span>{lower}% - {upper}%</span>
    </div>
    <div className="progress-bar" style={{ height: '6px' }}>
      <div
        className="progress-fill"
        style={{
          width: `${upper - lower}%`,
          marginLeft: `${lower}%`,
          backgroundColor: 'var(--text-muted)',
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${probability}%`,
          width: '2px',
          height: '100%',
          backgroundColor: getProbabilityColor(probability),
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  </div>
);

const SignalTags = ({ signals }: { signals: string[] }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
    {signals.map((signal, idx) => (
      <span
        key={idx}
        style={{
          fontSize: '9px',
          padding: '2px 6px',
          backgroundColor: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-secondary)',
        }}
      >
        {signal}
      </span>
    ))}
  </div>
);

const TimelineItem = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const date = new Date(event.date);
  const isPast = date < new Date();
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <div
      style={{
        display: 'flex',
        gap: '15px',
        padding: '12px 0',
        borderLeft: '2px solid var(--border-color)',
        paddingLeft: '20px',
        position: 'relative',
        opacity: isPast ? 0.5 : 1,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '-6px',
          top: '14px',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: getProbabilityColor(event.probability),
          border: '2px solid var(--bg-secondary)',
        }}
      />
      <div style={{ minWidth: '50px', textAlign: 'center' }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
          {date.getDate()}
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
          {months[date.getMonth()]} '{date.getFullYear().toString().slice(2)}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{event.title}</span>
          <span
            style={{
              fontSize: '9px',
              padding: '1px 5px',
              border: `1px solid ${getProbabilityColor(event.probability)}`,
              color: getProbabilityColor(event.probability),
            }}
          >
            {event.type.toUpperCase()}
          </span>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
          {event.description}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: getProbabilityColor(event.probability),
              }}
            />
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              {event.probability}% probability
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PredictionCard = ({ pred, politicianName, politicianStance }: { pred: Prediction; politicianName: string; politicianStance: string }) => {
  const strength = getPredictionStrength(pred.confidence);
  return (
    <div className="list-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontWeight: 'bold' }}>{pred.target}</span>
            <span
              style={{
                fontSize: '9px',
                padding: '1px 5px',
                backgroundColor: 'var(--bg-tertiary)',
                color: pred.category === 'regulation' ? 'var(--warning)' : 'var(--text-secondary)',
              }}
            >
              {pred.category.toUpperCase()}
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>By: {politicianName}</span>
            <span style={{ color: politicianStance === 'supportive' ? 'var(--success)' : politicianStance === 'opposed' ? 'var(--error)' : 'var(--warning)' }}>
              {getStanceEmoji(politicianStance)} {politicianStance}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right', marginLeft: '15px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: getProbabilityColor(pred.probability) }}>
            {pred.probability}%
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>probability</div>
        </div>
      </div>

      <ConfidenceBar lower={pred.confidenceInterval.lower} upper={pred.confidenceInterval.upper} probability={pred.probability} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
          <span style={{ color: 'var(--text-muted)' }}>Expected: {pred.timeframe}</span>
          <span style={{ marginLeft: '10px', color: 'var(--text-muted)' }}>
            Model confidence: {strength.icon} {strength.label} ({pred.confidence}%)
          </span>
        </div>
      </div>

      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px', padding: '8px', backgroundColor: 'var(--bg-tertiary)', borderLeft: '2px solid var(--border-color)' }}>
        {pred.reasoning}
      </div>

      <SignalTags signals={pred.signals} />
    </div>
  );
};

export default function Dashboard() {
  const now = new Date().toISOString();
  const sortedTimeline = getSortedTimeline();
  const upcomingEvents = getUpcomingEvents();
  const predictionSummary = getPredictionSummary();

  return (
    <main className="terminal">
        {/* Header */}
        <header className="terminal-header">
          <h1 className="terminal-title glow">
            EU CRYPTO POLICY TRACKER v1.0.0
          </h1>
          <div className="terminal-subtitle">
            SYSTEM STATUS: OPERATIONAL | LAST UPDATE: {now} | MONITORING: {euCountries.length} JURISDICTIONS
            <span className="cursor">_</span>
          </div>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-3" style={{ marginBottom: '20px' }}>
          <div className="card stat">
            <div className="stat-value">{activeRegulations.length}</div>
            <div className="stat-label">Active Regulations</div>
          </div>
          <div className="card stat">
            <div className="stat-value">{euCountries.length}</div>
            <div className="stat-label">EU Countries</div>
          </div>
          <div className="card stat">
            <div className="stat-value">
              {Math.round(activeRegulations.reduce((acc, r) => acc + r.probability, 0) / activeRegulations.length)}%
            </div>
            <div className="stat-label">Avg Pass Probability</div>
          </div>
        </div>

        {/* Prediction Stats Row */}
        <div className="grid grid-3" style={{ marginBottom: '20px' }}>
          <div className="card stat">
            <div className="stat-value" style={{ color: predictionSummary.avgConfidence >= 70 ? 'var(--success)' : 'var(--warning)' }}>
              {predictionSummary.avgConfidence}%
            </div>
            <div className="stat-label">Avg Model Confidence</div>
          </div>
          <div className="card stat">
            <div className="stat-value">{predictionSummary.totalPredictions}</div>
            <div className="stat-label">Active Predictions</div>
          </div>
          <div className="card stat">
            <div className="stat-value" style={{ color: predictionSummary.regulatoryRiskScore > 60 ? 'var(--error)' : 'var(--success)' }}>
              {predictionSummary.regulatoryRiskScore}%
            </div>
            <div className="stat-label">Regulatory Risk Score</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-2">
          {/* Regulations Panel */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">◆ REGULATORY PIPELINE</span>
              <span className="timestamp">LIVE</span>
            </div>
            <ul className="list">
              {activeRegulations.map((reg) => (
                <li key={reg.id} className="list-item">
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                      <span style={{ fontWeight: 'bold' }}>{reg.title}</span>
                      <span className={`badge badge-${reg.status}`}>{reg.status.toUpperCase()}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {reg.category.replace('-', ' ').toUpperCase()} | {reg.timeline}
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${reg.probability}%`,
                          backgroundColor: getProbabilityColor(reg.probability),
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginLeft: '15px', minWidth: '50px' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: getProbabilityColor(reg.probability) }}>
                      {reg.probability}%
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>PASS</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Predictions Panel - Enhanced */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">◆ PREDICTION SIGNALS</span>
              <span className="timestamp">AI GENERATED • {predictionSummary.highConfidenceCount} HIGH CONF</span>
            </div>
            <ul className="list">
              {allPredictions.map((pred) => {
                const politician = keyPoliticians.find(p => p.predictions.some(pp => pp.id === pred.id));
                return (
                  <PredictionCard
                    key={pred.id}
                    pred={pred}
                    politicianName={politician?.name || 'Unknown'}
                    politicianStance={politician?.stance || 'neutral'}
                  />
                );
              })}
            </ul>
          </div>

          {/* Timeline Panel - New */}
          <div className="card" style={{ gridColumn: 'span 1' }}>
            <div className="card-header">
              <span className="card-title">◆ EVENT TIMELINE</span>
              <span className="timestamp">{upcomingEvents.length} UPCOMING (90d)</span>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
              {sortedTimeline.map((event, idx) => (
                <TimelineItem key={event.id} event={event} index={idx} />
              ))}
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">◆ INTELLIGENCE ALERTS</span>
              <span className="timestamp">STREAM</span>
            </div>
            <div>
              {recentAlerts.map((alert) => (
                <div key={alert.id} className={`alert alert-${alert.severity}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ color: alert.severity === 'critical' ? 'var(--error)' : alert.severity === 'warning' ? 'var(--warning)' : 'var(--text-secondary)' }}>
                      {getSeverityEmoji(alert.severity)} {alert.message}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '5px' }}>
                    {new Date(alert.timestamp).toLocaleString()} | SOURCE: {alert.source}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Politicians Panel */}
          <div className="card" style={{ gridColumn: 'span 2' }}>
            <div className="card-header">
              <span className="card-title">◆ KEY ACTORS</span>
              <span className="timestamp">PROFILES</span>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Actor</th>
                  <th>Role</th>
                  <th>Stance</th>
                  <th>Influence</th>
                  <th>Predictions</th>
                  <th>Active Signals</th>
                </tr>
              </thead>
              <tbody>
                {keyPoliticians.map((pol) => (
                  <tr key={pol.id}>
                    <td>{pol.name}</td>
                    <td>{pol.role}</td>
                    <td style={{ color: pol.stance === 'supportive' ? 'var(--success)' : pol.stance === 'opposed' ? 'var(--error)' : 'var(--warning)' }}>
                      {getStanceEmoji(pol.stance)} {pol.stance}
                    </td>
                    <td>{'◆'.repeat(pol.influence)}</td>
                    <td>{pol.predictions.length}</td>
                    <td>
                      {pol.predictions.reduce((acc, p) => acc + p.signals.length, 0)} signals
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
          EU CRYPTO POLICY TRACKER v1.0.0 | BUILT FOR PREDICTION MARKETS |
          DATA SOURCES: ESMA, ECB, EU PARLIAMENT, NATIONAL REGULATORS |
          NOT FINANCIAL ADVICE
        </footer>
      </main>
  );
}
