/* Pokémon Void — Items view. window.VIEWS.Items */
window.VIEWS = window.VIEWS || {};
(function () {
  const { ITEMS } = window.VGAME;
  const { PageHead, Empty, ItemIcon } = window.VUI;

  const CAT_COLOR = {
    'Evolution': '#5fd13c', 'Valuable': '#ffd23c', 'Battle Items': '#8a5cff', 'Key Item': '#33d6ff',
    'Medicine': '#ff6f8f', 'Poké Ball': '#ff8a5c', 'Berries': '#d13c8a',
  };

  window.VIEWS.Items = function Items() {
    const [q, setQ] = React.useState('');
    const [cat, setCat] = React.useState('All');
    const cats = ['All', ...Array.from(new Set(ITEMS.map(i => i.cat)))];
    const list = ITEMS.filter(i => (cat === 'All' || i.cat === cat) && (!q.trim() || i.name.toLowerCase().includes(q.trim().toLowerCase())));

    return (
      <div>
        <PageHead kicker="ITEM BAG" title="Items" sub="Evolution stones, battle items, berries, and the tools you'll need to survive the descent into the Nullspace Rift." />

        <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 13px', borderRadius: 8, background: '#15112a', border: '1px solid #2a2545', minWidth: 220 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#6a6388" strokeWidth="1.6"><circle cx="6" cy="6" r="4.2" /><path d="M9.5 9.5L13 13" strokeLinecap="round" /></svg>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search items…" spellCheck={false} style={{ border: 'none', outline: 'none', background: 'transparent', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, width: '100%' }} />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ cursor: 'pointer', padding: '6px 12px', borderRadius: 7, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: cat === c ? 600 : 400, color: cat === c ? '#fff' : '#8a83a8', background: cat === c ? '#221a45' : 'transparent', border: `1px solid ${cat === c ? '#3a2f6e' : '#221d3a'}` }}>{c}</button>
            ))}
          </div>
        </div>

        {list.length === 0 ? <Empty label="No items match." /> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {list.map(it => {
              const col = CAT_COLOR[it.cat] || '#8a5cff';
              return (
                <div key={it.name} style={{ display: 'flex', gap: 14, padding: 16, borderRadius: 14, background: '#0e0b1f', border: '1px solid #221d3a' }}>
                  <ItemIcon item={it} color={col} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff' }}>{it.name}</span>
                      <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: col, border: `1px solid ${col}55`, borderRadius: 4, padding: '2px 6px' }}>{it.cat.toUpperCase()}</span>
                    </div>
                    <p style={{ margin: '0 0 8px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13.5, color: '#bdb6dd', lineHeight: 1.5 }}>{it.desc}</p>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#6a6388' }}>◷ {it.find}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };
})();
