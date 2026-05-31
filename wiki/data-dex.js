/* Pokémon Void — Pokédex data (placeholder content; swap in real data/sprites).
   window.VDEX = { TYPES, DEX, STAT_LABELS, STAT_MAX, byDex } */
window.VDEX = (function () {
  const STAT_MAX = 200;
  const STAT_LABELS = { HP: 'HP', ATK: 'Attack', DEF: 'Defense', SPA: 'Sp. Atk', SPD: 'Sp. Def', SPE: 'Speed' };

  // 18 standard types + 2 custom (LIGHT, COSMIC), tuned for the dark cosmic theme.
  const TYPES = {
    NORMAL:  { name: 'Normal',  bg: '#4a463f', glow: '#bdb4a6', fg: '#efeae2' },
    FIRE:    { name: 'Fire',    bg: '#7a3318', glow: '#ff7a3c', fg: '#ffe6d6' },
    WATER:   { name: 'Water',   bg: '#1c456e', glow: '#3c9bff', fg: '#d9ecff' },
    ELECTRIC:{ name: 'Electric',bg: '#6e5a12', glow: '#ffd23c', fg: '#fff7d6' },
    GRASS:   { name: 'Grass',   bg: '#27531f', glow: '#5fd13c', fg: '#e0ffd6' },
    ICE:     { name: 'Ice',     bg: '#1f5a5e', glow: '#5fe6e0', fg: '#dafcff' },
    FIGHTING:{ name: 'Fighting',bg: '#6e2420', glow: '#ff5f4c', fg: '#ffe0db' },
    POISON:  { name: 'Poison',  bg: '#4a1f5e', glow: '#c45fff', fg: '#f3deff' },
    GROUND:  { name: 'Ground',  bg: '#5e451f', glow: '#e0a85f', fg: '#fff0d6' },
    FLYING:  { name: 'Flying',  bg: '#2f3f6e', glow: '#8aa8ff', fg: '#e0e8ff' },
    PSYCHIC: { name: 'Psychic', bg: '#7a2f57', glow: '#ff5fa2', fg: '#ffe1ee' },
    BUG:     { name: 'Bug',     bg: '#4a5e1f', glow: '#b4d13c', fg: '#f1ffd6' },
    ROCK:    { name: 'Rock',    bg: '#5e5230', glow: '#cbb472', fg: '#fff6dc' },
    GHOST:   { name: 'Ghost',   bg: '#43356b', glow: '#a07bd6', fg: '#e9defb' },
    DRAGON:  { name: 'Dragon',  bg: '#2d2470', glow: '#7c6cff', fg: '#e3dcff' },
    DARK:    { name: 'Dark',    bg: '#2a2329', glow: '#8a7b8e', fg: '#e7e0e8' },
    STEEL:   { name: 'Steel',   bg: '#3c454d', glow: '#9fb3c2', fg: '#e8edf2' },
    FAIRY:   { name: 'Fairy',   bg: '#6e2f55', glow: '#ff8ad1', fg: '#ffe3f4' },
    LIGHT:   { name: 'Light',   bg: '#4a4212', glow: '#ffe566', fg: '#fffce8' },
    COSMIC:  { name: 'Cosmic',  bg: '#15375e', glow: '#33d6ff', fg: '#dff1ff' },
  };

  const M    = (lv, name, type, cls, pow, acc, pp, sig) => ({ lv, name, type, cls, pow, acc, pp, sig });
  const EGG  = (name, type, cls, pow, acc, pp, sig)    => ({ lv: 'EGG', name, type, cls, pow, acc, pp, sig });
  const TM   = (num, name, type, cls, pow, acc, pp, sig) => ({ lv: `TM${String(num).padStart(2,'0')}`, name, type, cls, pow, acc, pp, sig });

  const DEX = [
    {
      dex: '001', name: 'Tamatoo', category: 'Mudcake', types: ['GRASS'],
      height: '1\'05" ft', weight: '25.3 lbs', catchRate: 140, found: ['Saudade Town (Starter)'],
      abilities: [{ name: 'Overgrow', desc: 'Powers up Grass-type moves when the Pokémon\'s HP is low.' }],
      hidden:  {name: "Stamina", desc: "Boosts the Defense stat when the Pokémon is hit by an attack."},
      stats: { HP: 54, ATK: 58, DEF: 58, SPA: 40, SPD: 50, SPE: 50 },
      flavor: 'To get nutrition, Tamatoo chews soil in its mouth like gum. After the soil has lost its nutrients, it spits out small pucks of dirt called “Mud Cakes”.',
      weak: ['FIRE', 'ICE', 'POISON', 'FLYING', 'BUG'], resist: ['WATER', 'ELECTRIC', 'GRASS', 'GROUND', 'LIGHT'], immune: [],
      evo: { to: '002', method: 'Lv 16' },
      levelMoves: [
        M('1', 'Tackle', 'NORMAL', 'Physical', 40, 100, 35), 
        M('5', 'Defense Curl', 'NORMAL', 'Status', '—', '—', 40), 
        M('7', 'Leafage', 'GRASS', 'Special', 40, 100, 40), 
        M('11', 'Barrage', 'NORMAL', 'Physical', 15, 85, 20),
        M('15', 'Grass Whistle', 'GRASS', 'Status', '-', 55, 15),
        M('18', 'Razor Leaf', 'GRASS', 'Physical', 55, 95, 25),
        M('22', 'Worry Seed', 'GRASS', 'Status', '-', 100, 10),
        M('25', 'Headbutt', 'NORMAL', 'Physical', 70, 100, 15),
        M('29', 'Stealth Rock', 'ROCK', 'Status', '-', '-', 20),
        M('32', 'Rock Blast', 'ROCK', 'Physical', 25, 90, 10),
        M('36', 'Bulk Up', 'FIGHTING', 'Status', '-', '-', 20),
        M('39', 'Stone Edge', 'ROCK', 'Physical', 100, 80, 5),
        M('43', 'Leaf Storm', 'GRASS', 'Special', 130, 90, 5)
      ],
      eggMoves: [],
      tmMoves: [],
      // anomaly: {discoverer: 'username'},
      anomaly: null,
      evYield: { DEF: 1 }, baseFriendship: 50, baseExp: 64, growthRate: 'Parabolic',
      eggGroups: ['Field', 'Grass'], gender: { m: 87.5, f: 12.5 }, eggCycles: 5120,
    },
  ];

  const byDex = (n) => DEX.find((d) => d.dex === String(n));

  return { TYPES, DEX, STAT_LABELS, STAT_MAX, byDex };
})();
