import React, { useState } from 'react';
import { REGULATION } from './data/pokemon';
import BuilderTab  from './tabs/BuilderTab';
import StrategyTab from './tabs/StrategyTab';
import ThreatsTab  from './tabs/ThreatsTab';
import RulesTab    from './tabs/RulesTab';

const TABS = [
  { id: 'builder',  label: 'Team Builder' },
  { id: 'strategy', label: 'Battle Strategy' },
  { id: 'threats',  label: 'Threat Analysis' },
  { id: 'rules',    label: 'Rules & Regs' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('builder');
  const [team, setTeam] = useState(Array(6).fill(null));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)', fontFamily: 'var(--font-body)' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg,#0D1220 0%,var(--navy) 100%)',
        borderBottom: '1px solid rgba(240,192,64,0.3)', padding: '14px 20px',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="14" stroke="#F0C040" strokeWidth="1.5"/>
          <path d="M1 15h28" stroke="#F0C040" strokeWidth="1.5"/>
          <circle cx="15" cy="15" r="5" fill="#0A0E1A" stroke="#F0C040" strokeWidth="1.5"/>
          <circle cx="15" cy="15" r="2.5" fill="#F0C040"/>
        </svg>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 900,
            color: 'var(--gold)', letterSpacing: 2 }}>Champions Builder</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: 1 }}>
            Pokémon Champions · {REGULATION.season}
          </div>
        </div>
        <div style={{
          marginLeft: 'auto', background: 'rgba(77,217,232,0.12)',
          border: '1px solid rgba(77,217,232,0.3)', borderRadius: 6, padding: '4px 12px',
          fontFamily: 'var(--font-display)', textAlign: 'center',
        }}>
          <span style={{ fontSize: 14, fontWeight: 900, display: 'block', color: 'var(--gold)' }}>
            {REGULATION.name}
          </span>
          <span style={{ fontSize: 9, color: 'var(--cyan)', letterSpacing: 1 }}>REGULATION SET</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', background: 'var(--navy2)',
        borderBottom: '1px solid var(--border)', padding: '0 20px', overflowX: 'auto',
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: '11px 16px', fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700,
            letterSpacing: 1, cursor: 'pointer', background: 'none', whiteSpace: 'nowrap',
            borderBottom: `2px solid ${activeTab === t.id ? 'var(--gold)' : 'transparent'}`,
            color: activeTab === t.id ? 'var(--gold)' : 'var(--muted)',
            transition: 'all 0.2s', textTransform: 'uppercase',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: '16px 20px', maxWidth: 900, margin: '0 auto' }}>
        {activeTab === 'builder'  && <BuilderTab  team={team} onTeamChange={setTeam} />}
        {activeTab === 'strategy' && <StrategyTab team={team} />}
        {activeTab === 'threats'  && <ThreatsTab  team={team} />}
        {activeTab === 'rules'    && <RulesTab />}
      </div>

      {/* AI text styles */}
      <style>{`
        .ai-text h3 {
          font-family: var(--font-display);
          font-size: 12px;
          color: var(--gold);
          letter-spacing: 1px;
          margin: 14px 0 6px;
          text-transform: uppercase;
        }
        .ai-text h3:first-child { margin-top: 0; }
        .ai-text ul { padding-left: 18px; }
        .ai-text li { margin-bottom: 5px; }
        .ai-text strong { color: var(--cyan); }
        .ai-text em { color: var(--muted); font-style: italic; }
      `}</style>
    </div>
  );
}
