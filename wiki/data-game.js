/* Pokémon Void — game data: moves, abilities, items, locations, trainers, type chart.
   window.VGAME = { MOVES, ABILITIES, ITEMS, ROUTES, TRAINERS, CHART, eff, TYPE_ORDER } */
window.VGAME = (function () {
  // ---- Moves -------------------------------------------------------------
  const MOVES = [
    { name: 'Oblivion Beam', type: 'LIGHT', cls: 'Special', pow: 130, acc: 90, pp: 5, desc: 'Fires a beam of pure absence. 10% chance to remove the target\u2019s ability for 3 turns. Signature move of OBLIVAX.' },
    { name: 'Null Pulse', type: 'LIGHT', cls: 'Special', pow: 60, acc: 100, pp: 20, desc: 'A pulse of nothing. Ignores stat changes on the target.' },
    { name: 'Drain Void', type: 'LIGHT', cls: 'Special', pow: 50, acc: 100, pp: 10, desc: 'Drains the target. The user recovers half the damage dealt as HP.' },
    { name: 'Event Collapse', type: 'LIGHT', cls: 'Physical', pow: 120, acc: 85, pp: 5, desc: 'Folds space around the foe. 30% chance to lower their Defense.' },
    { name: 'Star Gaze', type: 'COSMIC', cls: 'Status', pow: '—', acc: '—', pp: 10, desc: 'The user studies the sky, sharply raising its Sp. Atk.' },
    { name: 'Twinkle', type: 'COSMIC', cls: 'Special', pow: 40, acc: 100, pp: 25, desc: 'A faint flash of starlight. Never misses against airborne foes.' },
    { name: 'Gravity Well', type: 'COSMIC', cls: 'Special', pow: 80, acc: 100, pp: 10, desc: 'Crushes the foe with gravity. Grounds Flying-types for 5 turns.' },
    { name: 'Comet Crash', type: 'COSMIC', cls: 'Special', pow: 100, acc: 95, pp: 5, desc: 'Calls down a comet. 20% chance to leave the foe flinching.' },
    { name: 'Cosmic Power', type: 'COSMIC', cls: 'Status', pow: '—', acc: '—', pp: 20, desc: 'Raises the user\u2019s Defense and Sp. Def by one stage each.' },
    { name: 'Phase Out', type: 'GHOST', cls: 'Status', pow: '—', acc: '—', pp: 15, desc: 'The user slips out of phase, becoming immune to damage for one turn.' },
    { name: 'Shadow Ball', type: 'GHOST', cls: 'Special', pow: 80, acc: 100, pp: 15, desc: 'Hurls a shadowy blob. 20% chance to lower Sp. Def.' },
    { name: 'Dark Pulse', type: 'DARK', cls: 'Special', pow: 80, acc: 100, pp: 15, desc: 'A pulse of dark thoughts. 20% chance to make the foe flinch.' },
    { name: 'Crunch', type: 'DARK', cls: 'Physical', pow: 80, acc: 100, pp: 15, desc: 'Bites with sharp fangs. 20% chance to lower Defense.' },
    { name: 'Nasty Plot', type: 'DARK', cls: 'Status', pow: '—', acc: '—', pp: 20, desc: 'Stimulates the brain by thinking bad thoughts. Sharply raises Sp. Atk.' },
    { name: 'Flamethrower', type: 'FIRE', cls: 'Special', pow: 90, acc: 100, pp: 15, desc: 'Scorches with intense flames. 10% chance to burn.' },
    { name: 'Flare Blitz', type: 'FIRE', cls: 'Physical', pow: 120, acc: 100, pp: 15, desc: 'A blazing tackle. The user takes recoil; may burn the foe.' },
    { name: 'Ember', type: 'FIRE', cls: 'Special', pow: 40, acc: 100, pp: 25, desc: 'A weak flame. 10% chance to burn.' },
    { name: 'Surf', type: 'WATER', cls: 'Special', pow: 90, acc: 100, pp: 15, desc: 'Sweeps the field with a great wave. Hits all adjacent foes.' },
    { name: 'Ice Beam', type: 'ICE', cls: 'Special', pow: 90, acc: 100, pp: 10, desc: 'A freezing beam. 10% chance to freeze.' },
    { name: 'Blizzard', type: 'ICE', cls: 'Special', pow: 110, acc: 70, pp: 5, desc: 'A brutal snowstorm. Never misses in hail. 10% chance to freeze.' },
    { name: 'Razor Leaf', type: 'GRASS', cls: 'Physical', pow: 55, acc: 95, pp: 25, desc: 'Sharp leaves slash the foe. High critical-hit ratio.' },
    { name: 'Energy Ball', type: 'GRASS', cls: 'Special', pow: 90, acc: 100, pp: 10, desc: 'Fires nature\u2019s energy. 10% chance to lower Sp. Def.' },
    { name: 'Moonblast', type: 'FAIRY', cls: 'Special', pow: 95, acc: 100, pp: 15, desc: 'Borrows lunar power. 30% chance to lower Sp. Atk.' },
    { name: 'Dazzling Gleam', type: 'FAIRY', cls: 'Special', pow: 80, acc: 100, pp: 10, desc: 'Damages with a strong flash. Hits all adjacent foes.' },
    { name: 'Dragon Pulse', type: 'DRAGON', cls: 'Special', pow: 85, acc: 100, pp: 10, desc: 'A shock wave from the mouth. Pure draconic force.' },
    { name: 'Heavy Slam', type: 'STEEL', cls: 'Physical', pow: 100, acc: 100, pp: 10, desc: 'Slams with the body. Stronger the heavier the user is than the foe.' },
  ];

  // ---- Abilities ---------------------------------------------------------
  const ABILITIES = [
    { name: 'Event Horizon', desc: 'Contact moves against this Pokémon lose 50% of their power.', mons: ['000'], rare: true },
    { name: 'Singularity', desc: 'On entry, removes the foe\u2019s held item for the rest of the battle.', mons: ['000'], hidden: true, rare: true },
    { name: 'Vacuum', desc: 'Halves all HP the foe recovers from items and moves.', mons: ['033', '034', '035', '066'] },
    { name: 'Stargleam', desc: 'Raises Sp. Atk by one stage on a starry night.', mons: ['011', '012', '048', '088'], hidden: true },
    { name: 'Blaze', desc: 'Powers up Fire-type moves when HP drops below ⅓.', mons: ['001', '002'] },
    { name: 'Overgrow', desc: 'Powers up Grass-type moves when HP drops below ⅓.', mons: ['003', '004'] },
    { name: 'Torrent', desc: 'Powers up Water-type moves when HP drops below ⅓.', mons: ['005', '006'] },
    { name: 'Flash Fire', desc: 'Absorbs Fire-type moves, powering up its own Fire moves.', mons: ['001', '048'], hidden: true },
    { name: 'Levitate', desc: 'Gives full immunity to Ground-type moves.', mons: ['011', '012'] },
    { name: 'Pressure', desc: 'The foe expends 2 PP for every move used against this Pokémon.', mons: ['033', '034'], hidden: true },
    { name: 'Dark Aura', desc: 'Boosts the power of every Dark-type move in battle by 33%.', mons: ['035', '142'], hidden: true },
    { name: 'Cursed Body', desc: '30% chance to disable a move that hits this Pokémon.', mons: ['142'] },
    { name: 'Multiscale', desc: 'Halves damage taken while at full HP.', mons: ['088'] },
    { name: 'Heavy Metal', desc: 'Doubles the Pokémon\u2019s weight (affects weight-based moves).', mons: ['066'] },
    { name: 'Intimidate', desc: 'Lowers the foe\u2019s Attack by one stage on entry.', mons: ['002'], hidden: true },
    { name: 'Harvest', desc: '50% chance to restore a used Berry at the end of each turn.', mons: ['003'], hidden: true },
  ];

  // ---- Items -------------------------------------------------------------
  const ITEMS = [
    { name: 'Void Shard', cat: 'Evolution', desc: 'A sliver of true nothing. Evolves Voidlinct into Umbravoid when used.', find: 'Hollow Caldera' },
    { name: 'Star Piece', cat: 'Valuable', desc: 'A shard of fallen star. Sells for a high price; cherished by Cosmic-types.', find: 'Meteor Field' },
    { name: 'Cosmic Lens', cat: 'Held', desc: 'Held item. Boosts the holder\u2019s Cosmic-type moves by 20%.', find: 'Observatory Ruins' },
    { name: 'Null Core', cat: 'Held', desc: 'Held item. Boosts Light-type moves by 20%, but the holder cannot be healed by items.', find: 'Team Void Base' },
    { name: 'Event Stone', cat: 'Key Item', desc: 'Resonates near the Nullspace Rift. Required to reach OBLIVAX.', find: 'Story event' },
    { name: 'Telescope', cat: 'Key Item', desc: 'Reveals which Pokémon appear on starry nights when used outdoors.', find: 'Observatory Ruins' },
    { name: 'Potion', cat: 'Medicine', desc: 'Restores 20 HP to a single Pokémon.', find: 'Poké Marts' },
    { name: 'Super Potion', cat: 'Medicine', desc: 'Restores 60 HP to a single Pokémon.', find: 'Poké Marts' },
    { name: 'Revive', cat: 'Medicine', desc: 'Revives a fainted Pokémon with half its max HP.', find: 'Poké Marts' },
    { name: 'Void Ball', cat: 'Poké Ball', desc: 'A dark ball that works better on Light- and Cosmic-types (×3 catch rate).', find: 'Mistport Bay' },
    { name: 'Dusk Ball', cat: 'Poké Ball', desc: 'Catches better in caves or at night (×3 in darkness).', find: 'Poké Marts (night)' },
    { name: 'Leftovers', cat: 'Held', desc: 'Held item. Restores a little HP each turn — countered by the Vacuum ability.', find: 'Hollow Caldera' },
    { name: 'Choice Specs', cat: 'Held', desc: 'Boosts Sp. Atk by 50% but locks the holder into one move.', find: 'Mistport Bay' },
    { name: 'Focus Sash', cat: 'Held', desc: 'If at full HP, the holder survives a KO hit with 1 HP. Single use.', find: 'Route 14' },
    { name: 'Rare Candy', cat: 'Valuable', desc: 'Instantly raises a Pokémon\u2019s level by one.', find: 'Hidden across routes' },
    { name: 'Starlit Incense', cat: 'Held', desc: 'A sweet smoke that summons more Cosmic-types in tall grass.', find: 'Observatory Ruins' },
  ];

  // ---- Locations ---------------------------------------------------------
  const ROUTES = [
    { slug: 'saudade-town', name: 'Saudade Town', tag: '', kind: 'Town', desc: 'The starting town of your player and their rivals.', mons:['001', '004', '007'], items: [], encounter: 'Starters',
      npcs: [{name: 'Kayden', role: 'Rival', line: 'A talented boy who wants to be the very best.'}] },
  ];

  // ---- Trainers / Gyms ---------------------------------------------------
  const TRAINERS = [
    { name: 'Ignia', loc: 'cinder-hollow', role: 'Gym Leader · Cinder Hollow', type: 'FIRE', badge: 'Ember Badge', team: ['001', '002'], desc: 'A hot-tempered blacksmith who forges her own badges. Believes a battle should leave you warmer than you started.' },
    { name: 'Wade', loc: 'mistport-bay', role: 'Gym Leader · Mistport', type: 'WATER', badge: 'Tide Badge', team: ['005', '006'], desc: 'A ferry captain who battles on the rocking deck of his boat. Patient as the sea, twice as deep.' },
    { name: 'Fern', loc: 'verdant-way', role: 'Gym Leader · Verdant', type: 'GRASS', badge: 'Bloom Badge', team: ['003', '004'], desc: 'A botanist who treats her arena like a greenhouse. She knows which of your Pokémon skipped breakfast.' },
    { name: 'Orrin', loc: 'observatory-ruins', role: 'Gym Leader · Observatory', type: 'COSMIC', badge: 'Star Badge', team: ['011', '012', '088'], desc: 'The region\u2019s last astronomer. Battles only after dark, when his partners are strongest.' },
    { name: 'Grunt Mire', loc: 'team-void-base', role: 'Team Void · Grunt', type: 'DARK', badge: '—', team: ['033', '142'], desc: 'A true believer who joined for the robes and stayed for the cause. Not very good at battling.' },
    { name: 'Admin Sable', loc: 'team-void-base', role: 'Team Void · Admin', type: 'GHOST', badge: '—', team: ['034', '142'], desc: 'Cold and precise. She catalogues every trainer Team Void defeats and feeds their items to the void.' },
    { name: 'Admin Cassius', loc: 'nullspace-rift', role: 'Team Void · Admin', type: 'LIGHT', badge: '—', team: ['034', '066'], desc: 'A former scientist who looked too long into the Rift. He speaks of OBLIVAX as if it can hear him.' },
    { name: 'Nox', loc: 'nullspace-rift', role: 'Team Void · Leader', type: 'LIGHT', badge: '—', team: ['035', '142', '066'], boss: true, desc: 'The founder of Team Void. He wants to give the universe back the silence he believes it is owed. Wields a raised Umbravoid.' },
  ];

  // ---- Type chart --------------------------------------------------------
  const TYPE_ORDER = ['NORMAL','FIRE','WATER','ELECTRIC','GRASS','ICE','FIGHTING','POISON','GROUND','FLYING','PSYCHIC','BUG','ROCK','GHOST','DRAGON','DARK','STEEL','FAIRY','LIGHT','COSMIC'];
  // per attacking type: se = 2×, nv = 0.5×, no = 0×
  const CHART = {
    NORMAL:  { se: [], nv: ['ROCK','STEEL'], no: ['GHOST'] },
    FIRE:    { se: ['GRASS','ICE','BUG','STEEL'], nv: ['FIRE','WATER','ROCK','DRAGON'], no: [] },
    WATER:   { se: ['FIRE','GROUND','ROCK','LIGHT'], nv: ['WATER','GRASS','DRAGON'], no: [] },
    ELECTRIC:{ se: ['WATER','FLYING'], nv: ['ELECTRIC','GRASS','DRAGON'], no: ['GROUND'] },
    GRASS:   { se: ['WATER','GROUND','ROCK','LIGHT'], nv: ['FIRE','GRASS','POISON','FLYING','BUG','DRAGON','STEEL'], no: [] },
    ICE:     { se: ['GRASS','GROUND','FLYING','DRAGON','LIGHT'], nv: ['FIRE','WATER','ICE','STEEL'], no: [] },
    FIGHTING:{ se: ['NORMAL','ICE','ROCK','DARK','STEEL'], nv: ['POISON','FLYING','PSYCHIC','BUG','FAIRY','LIGHT'], no: ['GHOST'] },
    POISON:  { se: ['GRASS','FAIRY','LIGHT'], nv: ['POISON','GROUND','ROCK','GHOST'], no: ['STEEL'] },
    GROUND:  { se: ['FIRE','ELECTRIC','POISON','ROCK','STEEL'], nv: ['GRASS','BUG'], no: ['FLYING'] },
    FLYING:  { se: ['GRASS','FIGHTING','BUG'], nv: ['ELECTRIC','ROCK','STEEL'], no: [] },
    PSYCHIC: { se: ['FIGHTING','POISON'], nv: ['PSYCHIC','STEEL'], no: ['DARK'] },
    BUG:     { se: ['GRASS','PSYCHIC','DARK'], nv: ['FIRE','FIGHTING','POISON','FLYING','GHOST','STEEL','FAIRY'], no: [] },
    ROCK:    { se: ['FIRE','ICE','FLYING','BUG'], nv: ['FIGHTING','GROUND','STEEL'], no: [] },
    GHOST:   { se: ['PSYCHIC','GHOST','COSMIC'], nv: ['DARK','LIGHT'], no: ['NORMAL'] },
    DRAGON:  { se: ['DRAGON'], nv: ['STEEL','COSMIC'], no: ['FAIRY'] },
    DARK:    { se: ['PSYCHIC','GHOST','LIGHT','COSMIC'], nv: ['FIGHTING','DARK','FAIRY'], no: [] },
    STEEL:   { se: ['ICE','ROCK','FAIRY'], nv: ['FIRE','WATER','ELECTRIC','STEEL'], no: [] },
    FAIRY:   { se: ['FIGHTING','DRAGON','DARK'], nv: ['FIRE','POISON','STEEL','COSMIC','LIGHT'], no: [] },
    LIGHT:   { se: ['FIGHTING','GHOST','DRAGON','DARK'], nv: ['FIRE','WATER','GRASS','ICE'], no: [] },
    COSMIC:  { se: ['DRAGON','STEEL','FIGHTING'], nv: ['COSMIC','LIGHT'], no: [] },
  };
  const eff = (atk, def) => {
    const c = CHART[atk];
    if (!c) return 1;
    if (c.no.includes(def)) return 0;
    if (c.se.includes(def)) return 2;
    if (c.nv.includes(def)) return 0.5;
    return 1;
  };

  return { MOVES, ABILITIES, ITEMS, ROUTES, TRAINERS, CHART, eff, TYPE_ORDER };
})();
