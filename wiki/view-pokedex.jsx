/* Pokémon Void — Pokédex grid view. window.VIEWS.Pokedex */
window.VIEWS = window.VIEWS || {};
(function () {
  const { DEX, TYPES } = window.VDEX;
  const { go, TypePill, typeAccent, SpriteSlot, PageHead, Empty } = window.VUI;
  const ALL_TYPES = Object.keys(TYPES);

  function Card({ d }) {
    const [hov, setHov] = React.useState(false);
    const accent = typeAccent(d.types);
    const total = Object.values(d.stats).reduce((a, b) => a + b, 0);
    return (
      <button onClick={() => go('#/pokemon/' + d.dex)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          textAlign: 'left', cursor: 'pointer', padding: 16, borderRadius: 16,
          background: hov ? accent.cardHover : '#0e0b1f',
          border: '1px solid transparent',
          boxShadow: hov ? accent.shadow : 'none', transition: 'all .18s', transform: hov ? 'translateY(-3px)' : 'none',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 12, color: '#5f5980' }}>No.{d.dex}</span>
          {d.legendary && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#8a5cff' }}>★ LEGEND</span>}
          {d.pseudo && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#33d6ff' }}>RARE</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <SpriteSlot dex={d.dex} name={d.name} size={132} accent={accent.glow} />
        </div>
        <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 22, color: '#fff', lineHeight: 1 }}>{d.name}</div>
        <div style={{ fontSize: 12, color: '#7a7398', margin: '3px 0 10px' }}>{d.category}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>{d.types.map(t => <TypePill key={t} t={t} sm onClick={(e) => { e.stopPropagation(); go('#/pokemon/' + d.dex); }} />)}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid #1a1630' }}>
          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980' }}>BST</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, color: accent.glow, fontWeight: 700 }}>{total}</span>
        </div>
      </button>
    );
  }

  window.VIEWS.Pokedex = function Pokedex({ query }) {
    const [filters, setFilters] = React.useState([]);
    const [sort, setSort] = React.useState('dex');
    const q = (query || '').trim().toLowerCase();

    const toggle = (t) => setFilters(f => f.includes(t) ? f.filter(x => x !== t) : [...f, t]);

    let list = DEX.filter(d => {
      if (q && !(d.name.toLowerCase().includes(q) || d.dex.includes(q) || d.category.toLowerCase().includes(q))) return false;
      if (filters.length && !filters.every(t => d.types.includes(t))) return false;
      return true;
    });
    const bst = d => Object.values(d.stats).reduce((a, b) => a + b, 0);
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'bst') list = [...list].sort((a, b) => bst(b) - bst(a));
    else list = [...list].sort((a, b) => a.dex.localeCompare(b.dex));

    const SortBtn = ({ id, label }) => (
      <button onClick={() => setSort(id)} style={{
        cursor: 'pointer', padding: '6px 12px', borderRadius: 7, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
        background: sort === id ? '#221a45' : 'transparent', color: sort === id ? '#fff' : '#8a83a8',
        border: `1px solid ${sort === id ? '#3a2f6e' : '#221d3a'}`, fontWeight: sort === id ? 600 : 400,
        whiteSpace: 'nowrap', flexShrink: 0,
      }}>{label}</button>
    );

    return (
      <div>
        <PageHead kicker="NATIONAL VOIDDEX" title="Pokédex" sub="Every creature catalogued in the Drapalla Region — and the one thing beyond it. Filter by type, search by name, click any entry for the full file." />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {ALL_TYPES.map(t => {
              const on = filters.includes(t);
              const c = TYPES[t];
              return (
                <button key={t} onClick={() => toggle(t)} style={{
                  cursor: 'pointer', padding: '4px 10px', borderRadius: 999, fontFamily: "'Silkscreen', monospace", fontSize: 9, letterSpacing: 0.5,
                  textTransform: 'uppercase', color: on ? c.fg : '#6a6388', background: on ? c.bg : 'transparent',
                  border: `1px solid ${on ? c.glow : '#2a2545'}`, opacity: on ? 1 : 0.7,
                }}>{c.name}</button>
              );
            })}
            {filters.length > 0 && <button onClick={() => setFilters([])} style={{ cursor: 'pointer', padding: '4px 10px', borderRadius: 999, fontSize: 11, color: '#ff6f8f', background: 'transparent', border: '1px solid #5e2030', fontFamily: "'Space Grotesk', sans-serif" }}>clear ×</button>}
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#5f5980' }}>SORT</span>
            <SortBtn id="dex" label="Dex №" /><SortBtn id="name" label="A–Z" /><SortBtn id="bst" label="Total" />
          </div>
        </div>

        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#6a6388', marginBottom: 16 }}>{list.length} {list.length === 1 ? 'entry' : 'entries'}</div>

        {list.length === 0 ? <Empty label="No Pokémon match your filters." /> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(216px, 1fr))', gap: 16 }}>
            {list.map(d => <Card key={d.dex} d={d} />)}
          </div>
        )}
      </div>
    );
  };
})();
