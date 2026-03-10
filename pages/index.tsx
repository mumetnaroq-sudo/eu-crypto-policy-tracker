import Head from 'next/head';
import { activeRegulations, keyPoliticians, recentAlerts, getProbabilityColor, getStanceEmoji, getSeverityEmoji } from '@/data/policies';
import { euCountries } from '@/data/eu-countries';

export default function Dashboard() {
  const now = new Date().toISOString();

  return (
    <>
      <Head>
        <title>EU Crypto Policy Tracker</title>
      </Head>
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
          <div className="card">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Predictions Panel */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">◆ PREDICTION SIGNALS</span>
              <span className="timestamp">AI GENERATED</span>
            </div>
            <ul className="list">
              {keyPoliticians.flatMap(p => p.predictions).map((pred) => (
                <li key={pred.id} className="list-item">
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>{pred.target}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {pred.timeframe} | CONFIDENCE: {pred.confidence}%
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '5px' }}>
                      {pred.reasoning}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginLeft: '15px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: getProbabilityColor(pred.probability) }}>
                      {pred.probability}%
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
          EU CRYPTO POLICY TRACKER v1.0.0 | BUILT FOR PREDICTION MARKETS |
          DATA SOURCES: ESMA, ECB, EU PARLIAMENT, NATIONAL REGULATORS |
          NOT FINANCIAL ADVICE
        </footer>
      </main>
    </>
  );
}
