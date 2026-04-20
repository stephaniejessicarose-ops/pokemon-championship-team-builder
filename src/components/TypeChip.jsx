import React from 'react';

const TYPE_COLORS = {
  Normal:   { bg: '#9FA19F', color: '#fff' },
  Fire:     { bg: '#E62829', color: '#fff' },
  Water:    { bg: '#2980EF', color: '#fff' },
  Grass:    { bg: '#3FA129', color: '#fff' },
  Electric: { bg: '#FAC000', color: '#000' },
  Ice:      { bg: '#3DD9FF', color: '#000' },
  Fighting: { bg: '#FF8000', color: '#fff' },
  Poison:   { bg: '#9141CB', color: '#fff' },
  Ground:   { bg: '#915121', color: '#fff' },
  Flying:   { bg: '#81B9EF', color: '#000' },
  Psychic:  { bg: '#EF4179', color: '#fff' },
  Bug:      { bg: '#91A119', color: '#fff' },
  Rock:     { bg: '#AFA981', color: '#000' },
  Ghost:    { bg: '#704170', color: '#fff' },
  Dragon:   { bg: '#5060E1', color: '#fff' },
  Dark:     { bg: '#49392F', color: '#fff' },
  Steel:    { bg: '#60A1B8', color: '#fff' },
  Fairy:    { bg: '#EF70EF', color: '#fff' },
};

export default function TypeChip({ type, size = 'sm' }) {
  const c = TYPE_COLORS[type] || { bg: '#888', color: '#fff' };
  const fontSize = size === 'xs' ? '8px' : size === 'sm' ? '9px' : '11px';
  const padding  = size === 'xs' ? '1px 4px' : size === 'sm' ? '2px 6px' : '3px 10px';
  return (
    <span style={{
      background: c.bg, color: c.color, fontSize, padding,
      borderRadius: 3, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3px',
      fontFamily: 'var(--font-body)',
    }}>
      {type}
    </span>
  );
}
