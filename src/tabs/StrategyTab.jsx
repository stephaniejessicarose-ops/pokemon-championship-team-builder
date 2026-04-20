import React, { useState } from 'react';
import { callAI } from '../utils/ai';
import { AIPanel } from '../components/AIPanel';
import PokemonSprite from '../components/PokemonSprite';

const SYSTEM = `You are an expert Pokémon VGC strategist specialising in the brand-new Pokémon Champions game (launched April 8 2026, Nintendo Switch). The current regulation is M-A which bans all Legendaries/Mythicals, allows 59 Mega Evolutions (one per match via Omni Ring), and uses Stat Points instead of EVs (508 total, max 252/stat). This is a Double Battle format. Be specific, actionable, and use ### headers.`;

export default function StrategyTab({ team }) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const filled = team.filter(Boolean);

  async function generate() {
    if (filled.length < 2) { alert('Add at least 2 Pokémon to your team first!'); return; }
    setLoading(true); setText('');
    const desc = filled.map(p =>
      `${p.name} (${p.types.join('/')}) holding ${p.heldItem || 'no item'}, moves: ${(p.moves || []).join(', ')}${p.hasMega ? ' [Mega capable]' : ''}`
    ).join('\n');
    try {
      const result = await callAI(
        `Analyse this Pokémon Champions Regulation M-A team and give me a comprehensive battle strategy:\n\n${desc}\n\nCover: 1) Best lead combos 2) Core synergies & win conditions 3) How to use Mega Evolution optimally (only one per game) 4) Speed control & priority plays 5) How to close out games`,
        SYSTEM
      );
      setText(result);
    } catch (e) {
      setText(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 14, gap: 10, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--gold)',
            letterSpacing: 2, textTransform: 'uppercase' }}>Battle Strategy</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
            AI-powered analysis for your Regulation M-A team
          </div>
        </div>
        <button onClick={generate} disabled={loading} style={{
          background: 'linear-gradient(135deg,var(--gold) 0%,#D4A020 100%)', border: 'none',
          borderRadius: 7, padding: '9px 18px', fontFamily: 'var(--font-display)', fontSize: 10,
          fontWeight: 700, color: 'var(--navy)', cursor: loading ? 'not-allowed' : 'pointer',
          letterSpacing: 1, opacity: loading ? 0.6 : 1, textTransform: 'uppercase',
        }}>
          {loading ? 'Generating…' : 'Generate Strategy ↗'}
        </button>
      </div>

      {/* Mini team preview */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {filled.length === 0
          ? <span style={{ color: 'var(--muted)', fontSize: 12 }}>No team selected yet</span>
          : filled.map(p => (
            <div key={p.name} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 7, padding: 7,
            }}>
              <PokemonSprite id={p.id} types={p.types} size={38} />
              <span style={{ fontSize: 8, textTransform: 'uppercase', color: 'var(--muted)' }}>{p.name}</span>
            </div>
          ))}
      </div>

      <AIPanel
        loading={loading}
        text={text}
        loadingMessage="Analysing your Reg M-A team…"
        placeholder="Build your team in the Team Builder tab, then generate your personalised strategy here."
      />
    </div>
  );
}
