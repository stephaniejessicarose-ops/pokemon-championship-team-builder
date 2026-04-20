import React, { useState } from 'react';
import { callAI } from '../utils/ai';
import { AIPanel } from '../components/AIPanel';
import PokemonSprite from '../components/PokemonSprite';

const SYSTEM = `You are an expert Pokémon VGC analyst specialising in Pokémon Champions Regulation M-A (the new game launched April 8 2026). The top meta picks in this format include Whimsicott (S-tier support, Prankster Tailwind/Encore), Incineroar (S-tier, Fake Out+Intimidate+Parting Shot), Garchomp (S-tier, sand abuser), Excadrill (S-tier in sand), Kingambit (S-tier, Supreme Overlord), Greninja (S-tier Mega), Dragapult, Sneasler, Toxapex, Clefable, Rotom-W. Mega Gengar (Shadow Tag trapping) and Mega Kangaskhan (Parental Bond) are also top threats. Use ### headers. Be specific about counters and damage limitation.`;

export default function ThreatsTab({ team }) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const filled = team.filter(Boolean);

  async function generate() {
    if (filled.length < 2) { alert('Add at least 2 Pokémon to your team first!'); return; }
    setLoading(true); setText('');
    const desc = filled.map(p =>
      `${p.name} (${p.types.join('/')}) holding ${p.heldItem || 'no item'}${p.hasMega ? ' [Mega]' : ''}`
    ).join(', ');
    try {
      const result = await callAI(
        `My Pokémon Champions Regulation M-A team: ${desc}\n\nProvide: 1) Top 5 specific threat Pokémon in the current meta and why they threaten my team 2) Specific counterplay for each 3) Problematic team archetypes to prepare for (Trick Room, weather, hyper offence etc.) 4) One threat I genuinely struggle to overcome and damage-limitation strategies 5) Key Mega Evolution threats to watch out for`,
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
            letterSpacing: 2, textTransform: 'uppercase' }}>Threat Analysis</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
            Meta threats for the current Regulation M-A format
          </div>
        </div>
        <button onClick={generate} disabled={loading} style={{
          background: 'linear-gradient(135deg,var(--gold) 0%,#D4A020 100%)', border: 'none',
          borderRadius: 7, padding: '9px 18px', fontFamily: 'var(--font-display)', fontSize: 10,
          fontWeight: 700, color: 'var(--navy)', cursor: loading ? 'not-allowed' : 'pointer',
          letterSpacing: 1, opacity: loading ? 0.6 : 1, textTransform: 'uppercase',
        }}>
          {loading ? 'Analysing…' : 'Analyse Threats ↗'}
        </button>
      </div>

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
        loadingMessage="Scanning the Reg M-A meta for threats…"
        placeholder="Generate a threat analysis based on your confirmed team composition."
      />
    </div>
  );
}
