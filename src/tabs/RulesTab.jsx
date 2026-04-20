import React from 'react';
import { REGULATION } from '../data/pokemon';

function RuleCard({ title, rules }) {
  return (
    <div style={{ background: 'var(--navy2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: 14 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: 'var(--gold)',
        letterSpacing: 1.5, marginBottom: 10, textTransform: 'uppercase' }}>{title}</div>
      {rules.map((r, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start',
          marginBottom: 8, fontSize: 12, lineHeight: 1.5 }}>
          <div style={{
            width: 4, height: 4, borderRadius: '50%',
            background: r.warn ? 'var(--red)' : 'var(--cyan)',
            flexShrink: 0, marginTop: 6,
          }} />
          <span style={{ color: r.warn ? 'rgba(232,66,77,0.9)' : 'var(--text)' }}>{r.text}</span>
        </div>
      ))}
    </div>
  );
}

export default function RulesTab() {
  const statPills = [
    { label: '187', desc: 'available Pokémon' },
    { label: '59',  desc: 'Mega Evolutions' },
    { label: 'No',  desc: 'Legendaries/Mythicals' },
    { label: 'Open', desc: 'team list format' },
    { label: 'Double', desc: 'Battles only' },
  ];

  return (
    <div>
      {/* Season Banner */}
      <div style={{
        background: 'linear-gradient(135deg,rgba(77,217,232,0.08),rgba(240,192,64,0.06))',
        border: '1px solid rgba(240,192,64,0.2)', borderRadius: 10, padding: 16,
        marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 36 }}>🏆</span>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--gold)',
            marginBottom: 2 }}>Pokémon Champions — Regulation Set {REGULATION.name}</div>
          <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
            The first official competitive ruleset for the new Pokémon Champions platform (Nintendo Switch / Switch 2).
            This is the format for the 2026 VGC World Championships.
          </p>
          <div style={{ fontSize: 11, color: 'var(--cyan)', marginTop: 4 }}>
            📅 Active: {REGULATION.period} · Season {REGULATION.season_num} ends {REGULATION.season_end}
          </div>
        </div>
      </div>

      {/* Stat pills */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
        {statPills.map(p => (
          <div key={p.label} style={{
            background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 6,
            padding: '5px 12px', fontSize: 12,
          }}>
            <strong style={{ color: 'var(--gold)' }}>{p.label}</strong> {p.desc}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <RuleCard title="Battle Rules" rules={[
          { text: 'Double Battles only — 4 Pokémon selected from your 6, 2 sent out at a time' },
          { text: '20-minute game timer; 45-second turn timer in ranked play' },
          { text: 'All Pokémon auto-levelled to Lv. 50 during battles' },
          { text: 'Omni Ring equipped automatically — activates Mega Evolution' },
          { text: 'Only one Mega Evolution per battle; persists after switch-out' },
          { text: 'Open team list: opponent sees species, ability, item, moves, and Tera type (not stats)' },
        ]} />
        <RuleCard title="Team Rules" rules={[
          { text: 'Teams must have between 4 and 6 Pokémon' },
          { text: 'Species Clause — no duplicate Pokémon (by National Dex number)' },
          { text: 'Item Clause — no duplicate held items across your team' },
          { text: 'Only fully evolved Pokémon are eligible (Pikachu is the one exception)' },
          { text: 'Stat Points system replaces EVs — 508 total, max 252 per stat, freely resettable' },
          { text: 'Pokémon Natures and IVs still apply and carry over from HOME transfers' },
        ]} />
        <RuleCard title="Eligibility — Reg M-A" rules={[
          { text: '187 eligible Pokémon across all 9 generations (Kanto through Paldea)' },
          { text: '59 Mega Evolutions available, including new Legends: Z-A Megas' },
          { text: 'No Legendary or Mythical Pokémon are available in this regulation', warn: true },
          { text: 'Greninja with Battle Bond is banned', warn: true },
          { text: 'Metagross, Ursaluna, Dondozo, Tatsugiri in game data but NOT currently usable', warn: true },
          { text: 'Regional forms (Alolan, Hisuian, Galarian etc.) are allowed if in supported roster' },
        ]} />
        <RuleCard title="Season & Event Schedule" rules={[
          { text: `Regulation M-A: ${REGULATION.period}` },
          { text: `Season ${REGULATION.season_num} ends: ${REGULATION.season_end}` },
          { text: 'First major event: 2026 Global Challenge I, May 1–4 (online)' },
          { text: 'First in-person: Indianapolis Regionals, May 29–31, 2026' },
          { text: '2026 North America Internationals: June 12–14' },
          { text: '2026 World Championships: August 28–30, 2026' },
        ]} />
      </div>
    </div>
  );
}
