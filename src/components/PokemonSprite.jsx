import React, { useState } from 'react';

const TYPE_EMOJI = {
  Fire: '🔥', Water: '💧', Grass: '🌿', Electric: '⚡', Ice: '❄️',
  Fighting: '👊', Poison: '☠️', Ground: '🏔️', Flying: '🦅', Psychic: '🔮',
  Bug: '🐛', Rock: '🪨', Ghost: '👻', Dragon: '🐉', Dark: '🌑',
  Steel: '⚙️', Fairy: '✨', Normal: '⭐',
};

export default function PokemonSprite({ id, types = [], size = 64, style = {} }) {
  const [errored, setErrored] = useState(false);
  const emoji = TYPE_EMOJI[types[0]] || '⭐';

  if (errored) {
    return (
      <div style={{
        width: size, height: size, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: size * 0.5, background: 'var(--navy4)',
        borderRadius: 8, flexShrink: 0, ...style,
      }}>
        {emoji}
      </div>
    );
  }

  return (
    <img
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      alt=""
      width={size}
      height={size}
      onError={() => setErrored(true)}
      style={{ imageRendering: 'pixelated', objectFit: 'contain', flexShrink: 0, ...style }}
    />
  );
}
