import React, { useState, useMemo } from 'react';
import { POKEMON, ITEMS, MOVE_TYPES, EV_STATS, TYPE_WEAK } from '../data/pokemon';
import TypeChip from '../components/TypeChip';
import PokemonSprite from '../components/PokemonSprite';

const TIER_COLORS = { S: '#F0C040', A: '#4DD9E8', B: '#aaa', C: '#E8424D' };
const MAX_SP = 508;

function OverviewBar({ team }) {
  const weaknesses = useMemo(() => {
    const w = {};
    team.filter(Boolean).forEach(p =>
      p.types.forEach(t => (TYPE_WEAK[t]?.weak || []).forEach(wt => { w[wt] = (w[wt] || 0) + 1; }))
    );
    return Object.entries(w).sort((a, b) => b[1] - a[1]);
  }, [team]);

  const teamTypes = useMemo(() => [...new Set(team.filter(Boolean).flatMap(p => p.types))], [team]);
  const missing = ['Water','Fire','Electric','Ice','Ground','Fairy'].filter(t => !teamTypes.includes(t));
  const heavyWeaks = weaknesses.filter(([, c]) => c >= 2).map(([t]) => t);

  return (
    <div style={{
      background: 'var(--navy2)', border: '1px solid rgba(240,192,64,0.2)',
      borderRadius: 10, padding: '14px 16px', marginBottom: 16,
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: 'var(--gold)',
        letterSpacing: 2, marginBottom: 10 }}>Live Team Overview</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        <div>
          <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase',
            letterSpacing: 1, marginBottom: 6 }}>Weaknesses</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {weaknesses.length === 0
              ? <span style={{ fontSize: 11, color: 'var(--muted)' }}>Add Pokémon to analyse</span>
              : weaknesses.slice(0, 8).map(([t, c]) => (
                  <TypeChip key={t} type={t} size="sm" />
                ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase',
            letterSpacing: 1, marginBottom: 6 }}>Coverage Gaps</div>
          <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7 }}>
            {missing.length === 0
              ? <span style={{ color: 'var(--gold)' }}>Good coverage!</span>
              : missing.slice(0, 3).map(t => (
                  <span key={t}><span style={{ color: 'var(--cyan)' }}>{t}</span> coverage, </span>
                ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase',
            letterSpacing: 1, marginBottom: 6 }}>Item Recommendations</div>
          <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7 }}>
            {heavyWeaks.length === 0
              ? <span style={{ color: 'var(--gold)' }}>Team looks balanced</span>
              : heavyWeaks.slice(0, 2).map(t => (
                  <span key={t}><span style={{ color: 'var(--gold)' }}>Resist Berry</span> vs {t}, </span>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamSlot({ pokemon, index, isSelected, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--navy2)', border: `1px solid ${isSelected ? 'var(--gold)' : pokemon ? 'rgba(77,217,232,0.25)' : 'var(--border)'}`,
      borderRadius: 10, padding: 12, cursor: 'pointer', minHeight: 170,
      position: 'relative', transition: 'all 0.2s',
      boxShadow: isSelected ? '0 0 0 1px rgba(240,192,64,0.2)' : 'none',
    }}>
      <span style={{ position: 'absolute', top: 8, left: 10, fontFamily: 'var(--font-display)',
        fontSize: 9, color: 'var(--muted)' }}>{index + 1}</span>
      {pokemon ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, paddingTop: 8 }}>
          <PokemonSprite id={pokemon.id} types={pokemon.types} size={64} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700,
            color: 'var(--text)', textTransform: 'uppercase' }}>{pokemon.name}</span>
          <div style={{ display: 'flex', gap: 3 }}>
            {pokemon.types.map(t => <TypeChip key={t} type={t} size="sm" />)}
          </div>
          {pokemon.hasMega && (
            <span style={{ background: 'rgba(239,112,239,0.2)', color: '#EF70EF', fontSize: 8,
              fontWeight: 700, padding: '2px 5px', borderRadius: 3 }}>MEGA</span>
          )}
          <span style={{ fontSize: 10, color: 'var(--gold-dim)' }}>{pokemon.heldItem || '— No item'}</span>
          <div style={{ display: 'flex', gap: 5 }}>
            <span style={{ background: `rgba(${TIER_COLORS[pokemon.tier]},0.15)`, color: TIER_COLORS[pokemon.tier],
              fontSize: 8, fontWeight: 700, padding: '2px 5px', borderRadius: 3 }}>{pokemon.tier}</span>
            <span style={{ fontSize: 9, color: 'var(--muted)' }}>{pokemon.usage}</span>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', height: 140, gap: 6, color: 'var(--muted)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.5" opacity="0.3">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          <span style={{ fontSize: 11, letterSpacing: 1 }}>Empty Slot</span>
        </div>
      )}
    </div>
  );
}

function EVSliders({ evVals, onChange }) {
  const total = Object.values(evVals).reduce((a, b) => a + b, 0);
  return (
    <div>
      {EV_STATS.map(stat => (
        <div key={stat} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
          <span style={{ fontSize: 11, fontWeight: 600, width: 34, color: 'var(--muted)' }}>{stat}</span>
          <input type="range" min="0" max="252" step="4" value={evVals[stat]}
            onChange={e => {
              const val = parseInt(e.target.value);
              const rest = total - evVals[stat];
              onChange(stat, Math.min(val, MAX_SP - rest));
            }}
            style={{ flex: 1, accentColor: 'var(--gold)' }}
          />
          <span style={{ fontSize: 10, fontWeight: 700, width: 26, textAlign: 'right',
            color: 'var(--cyan)' }}>{evVals[stat]}</span>
        </div>
      ))}
      <div style={{ fontSize: 10, color: 'var(--muted)', textAlign: 'right', marginTop: 3 }}>
        Total: <span style={{ color: total >= 504 ? 'var(--cyan)' : 'var(--gold)', fontWeight: 700 }}>{total}</span> / {MAX_SP}
      </div>
    </div>
  );
}

export default function BuilderTab({ team, onTeamChange }) {
  const [selSlot, setSelSlot] = useState(0);
  const [selPoke, setSelPoke] = useState(null);
  const [evVals, setEvVals] = useState({ HP: 0, Atk: 0, Def: 0, SpA: 0, SpD: 0, Spe: 0 });
  const [selItem, setSelItem] = useState(null);
  const [selMoves, setSelMoves] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [genFilter, setGenFilter] = useState('');
  const [tierFilter, setTierFilter] = useState('');

  const filtered = useMemo(() => POKEMON.filter(p =>
    (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
    (!typeFilter || p.types.includes(typeFilter)) &&
    (!genFilter || p.gen === genFilter) &&
    (!tierFilter || p.tier === tierFilter)
  ), [search, typeFilter, genFilter, tierFilter]);

  function pickPokemon(p) {
    setSelPoke(p);
    setEvVals({ HP: 0, Atk: 0, Def: 0, SpA: 0, SpD: 0, Spe: 0 });
    setSelItem(p.item);
    setSelMoves(p.moves.slice(0, 4));
  }

  function updateEV(stat, val) {
    setEvVals(prev => ({ ...prev, [stat]: val }));
  }

  function toggleMove(move) {
    setSelMoves(prev =>
      prev.includes(move) ? prev.filter(m => m !== move)
        : prev.length < 4 ? [...prev, move] : prev
    );
  }

  function addToTeam() {
    if (!selPoke) return;
    const updated = [...team];
    updated[selSlot] = { ...selPoke, heldItem: selItem, evs: { ...evVals }, moves: [...selMoves] };
    onTeamChange(updated);
    if (selSlot < 5) setSelSlot(s => s + 1);
  }

  function removeFromSlot(i) {
    const updated = [...team];
    updated[i] = null;
    onTeamChange(updated);
  }

  const allMoves = selPoke
    ? [...new Set([...selPoke.moves, 'Earthquake','Ice Beam','Thunderbolt','Protect',
        'Rock Slide','Tailwind','Helping Hand','Trick Room','Wide Guard','Fake Out'])]
    : [];

  const TYPES_LIST = ['Normal','Fire','Water','Grass','Electric','Ice','Fighting','Poison',
    'Ground','Flying','Psychic','Bug','Rock','Ghost','Dragon','Dark','Steel','Fairy'];
  const GENS_LIST = ['Kanto','Johto','Hoenn','Sinnoh','Unova','Kalos','Alola','Galar','Paldea'];

  const inputStyle = {
    background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 7,
    padding: '7px 10px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 13,
    outline: 'none',
  };

  return (
    <div>
      <OverviewBar team={team} />

      {/* Team Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 16 }}>
        {team.map((p, i) => (
          <TeamSlot key={i} pokemon={p} index={i} isSelected={i === selSlot}
            onClick={() => { setSelSlot(i); if (p) pickPokemon(p); }} />
        ))}
      </div>

      {/* Pokédex Picker */}
      <div style={{ background: 'var(--navy2)', border: '1px solid var(--border)',
        borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: 'var(--gold)',
          letterSpacing: 2, marginBottom: 10 }}>Pokédex — Regulation M-A (187 Pokémon)</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
          <input style={{ ...inputStyle, flex: 1, minWidth: 120 }} placeholder="Search Pokémon…"
            value={search} onChange={e => setSearch(e.target.value)} />
          <select style={inputStyle} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="">All Types</option>
            {TYPES_LIST.map(t => <option key={t}>{t}</option>)}
          </select>
          <select style={inputStyle} value={genFilter} onChange={e => setGenFilter(e.target.value)}>
            <option value="">All Gens</option>
            {GENS_LIST.map(g => <option key={g}>{g}</option>)}
          </select>
          <select style={inputStyle} value={tierFilter} onChange={e => setTierFilter(e.target.value)}>
            <option value="">All Tiers</option>
            {['S','A','B','C'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(82px,1fr))',
          gap: 6, maxHeight: 260, overflowY: 'auto' }}>
          {filtered.map(p => (
            <div key={`${p.id}-${p.name}`} onClick={() => pickPokemon(p)}
              style={{
                background: selPoke?.name === p.name ? 'rgba(240,192,64,0.08)' : 'var(--navy3)',
                border: `1px solid ${selPoke?.name === p.name ? 'var(--gold)' : 'var(--border)'}`,
                borderRadius: 7, padding: 6, cursor: 'pointer', textAlign: 'center',
                transition: 'all 0.15s',
              }}>
              <PokemonSprite id={p.id} types={p.types} size={52}
                style={{ display: 'block', margin: '0 auto 3px' }} />
              <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--text)', textTransform: 'uppercase',
                letterSpacing: 0.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {p.name}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
                {p.types.map(t => <TypeChip key={t} type={t} size="xs" />)}
              </div>
              <div style={{ fontSize: 8, color: 'var(--muted)', marginTop: 2 }}>
                <span style={{ color: TIER_COLORS[p.tier], fontWeight: 700 }}>{p.tier}</span>
                {' '}{p.usage}{p.hasMega ? ' ✨' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      {selPoke && (
        <div style={{ background: 'var(--navy2)', border: '1px solid rgba(240,192,64,0.2)',
          borderRadius: 10, padding: 14, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12, flexWrap: 'wrap' }}>
            <PokemonSprite id={selPoke.id} types={selPoke.types} size={72} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 900,
                color: 'var(--text)', textTransform: 'uppercase' }}>{selPoke.name}</div>
              <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
                {selPoke.types.map(t => <TypeChip key={t} type={t} />)}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>
                {selPoke.tier}-Tier · {selPoke.usage} usage · {selPoke.gen}
                {selPoke.hasMega ? ' · Mega Evolution available' : ''}
              </div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <button onClick={addToTeam} style={{
                background: 'linear-gradient(135deg,var(--gold) 0%,#D4A020 100%)', border: 'none',
                borderRadius: 7, padding: '9px 18px', fontFamily: 'var(--font-display)',
                fontSize: 10, fontWeight: 700, color: 'var(--navy)', cursor: 'pointer',
                letterSpacing: 1, textTransform: 'uppercase',
              }}>+ Add to Team</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {/* Stat Points */}
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: 'var(--gold)',
                letterSpacing: 1.5, marginBottom: 8, borderBottom: '1px solid var(--border)', paddingBottom: 5,
                textTransform: 'uppercase' }}>
                Stat Points <span style={{ fontSize: 8, color: 'var(--muted)' }}>(Replaces EVs · 508 max)</span>
              </div>
              <EVSliders evVals={evVals} onChange={updateEV} />
            </div>

            {/* Held Item */}
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: 'var(--gold)',
                letterSpacing: 1.5, marginBottom: 8, borderBottom: '1px solid var(--border)', paddingBottom: 5,
                textTransform: 'uppercase' }}>Held Item</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 5 }}>
                {ITEMS.map(item => (
                  <div key={item.name} onClick={() => setSelItem(item.name)} style={{
                    background: selItem === item.name ? 'rgba(240,192,64,0.08)' : 'var(--navy3)',
                    border: `1px solid ${selItem === item.name ? 'var(--gold)' : 'var(--border)'}`,
                    borderRadius: 5, padding: 6, cursor: 'pointer', textAlign: 'center',
                    transition: 'all 0.15s',
                  }}>
                    <span style={{ fontSize: 16, display: 'block', marginBottom: 1 }}>{item.icon}</span>
                    <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text)' }}>{item.name}</div>
                    <div style={{ fontSize: 8, color: 'var(--muted)' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Moves */}
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: 'var(--gold)',
                letterSpacing: 1.5, marginBottom: 8, borderBottom: '1px solid var(--border)', paddingBottom: 5,
                textTransform: 'uppercase' }}>Moves — Select up to 4</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                {allMoves.map(move => {
                  const mtype = MOVE_TYPES[move] || 'Normal';
                  const isSel = selMoves.includes(move);
                  return (
                    <div key={move} onClick={() => toggleMove(move)} style={{
                      background: isSel ? 'rgba(240,192,64,0.07)' : 'var(--navy3)',
                      border: `1px solid ${isSel ? 'var(--gold)' : 'var(--border)'}`,
                      borderRadius: 5, padding: '7px 8px', cursor: 'pointer', transition: 'all 0.15s',
                    }}>
                      <span style={{ float: 'right', fontSize: 9, color: 'var(--muted)' }}>
                        {isSel ? '✓' : ''}
                      </span>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{move}</div>
                      <TypeChip type={mtype} size="sm" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
