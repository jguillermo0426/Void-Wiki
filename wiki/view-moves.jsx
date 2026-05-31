/* Pokémon Void — Moves view. window.VIEWS.Moves */
window.VIEWS = window.VIEWS || {};
(function () {
  const { TYPES } = window.VDEX;
  const { MOVES } = window.VGAME;
  const { TypePill, PageHead, Empty } = window.VUI;

  const CLS_COLOR = { Physical: '#ff8a5c', Special: '#5c9fff', Status: '#9a93b5' };

  window.VIEWS.Moves = function Moves() {
    const [q, setQ] = React.useState('');
    const [cls, setCls] = React.useState('All');
    const [typeF, setTypeF] = React.useState('All');
    const types = ['All', ...Array.from(new Set(MOVES.map(m => m.type)))];

    const list = MOVES.filter(m =>
      (cls === 'All' || m.cls === cls) &&
      (typeF === 'All' || m.type === typeF) &&
      (!q.trim() || m.name.toLowerCase().includes(q.trim().toLowerCase()))
    ).sort((a, b) => a.name.localeCompare(b.name));

    const Seg = ({ val, cur, set, children, color }) => (
      <button onClick={() => set(val)} style={{ cursor: 'pointer', padding: '6px 12px', borderRadius: 7, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: cur === val ? 600 : 400, color: cur === val ? (color || '#fff') : '#8a83a8', background: cur === val ? '#221a45' : 'transparent', border: `1px solid ${cur === val ? '#3a2f6e' : '#221d3a'}` }}>{children}</button>
    );

    return (
      <div>
        <PageHead kicker="MOVE INDEX" title="Moves" sub="Every technique a Pokémon can learn in Void — including the new Void- and Cosmic-type moves. Click a type to see the type chart." />

        <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 13px', borderRadius: 8, background: '#15112a', border: '1px solid #2a2545', minWidth: 220 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#6a6388" strokeWidth="1.6"><circle cx="6" cy="6" r="4.2" /><path d="M9.5 9.5L13 13" strokeLinecap="round" /></svg>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search moves…" spellCheck={false} style={{ border: 'none', outline: 'none', background: 'transparent', color: '#e9e4ff', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, width: '100%' }} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>{['All', 'Physical', 'Special', 'Status'].map(c => <Seg key={c} val={c} cur={cls} set={setCls} color={CLS_COLOR[c]}>{c}</Seg>)}</div>
          <select value={typeF} onChange={e => setTypeF(e.target.value)} style={{ padding: '7px 12px', borderRadius: 8, background: '#15112a', color: '#e9e4ff', border: '1px solid #2a2545', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>
            {types.map(t => <option key={t} value={t} style={{ background: '#15112a' }}>{t === 'All' ? 'All types' : TYPES[t].name}</option>)}
          </select>
        </div>

        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#6a6388', marginBottom: 12 }}>{list.length} moves</div>

        {list.length === 0 ? <Empty label="No moves match." /> : (
          <div style={{ border: '1px solid #221d3a', borderRadius: 14, overflow: 'hidden', background: '#0e0b1f' }}>
            {/* header */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 2.4fr) 132px 124px 1fr 1fr 1fr', gap: 16, padding: '14px 24px', borderBottom: '1px solid #221d3a', background: '#120e26' }}>
              {['Move', 'Type', 'Class', 'Pow', 'Acc', 'PP'].map((h, i) => <span key={h} style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#6a6388', letterSpacing: 0.5, textAlign: i >= 3 ? 'right' : 'left' }}>{h.toUpperCase()}</span>)}
            </div>
            {list.map((m, i) => (
              <div key={m.name} style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 2.4fr) 132px 124px 1fr 1fr 1fr', gap: 16, padding: '18px 24px', alignItems: 'start', borderTop: i ? '1px solid #1a1630' : 'none' }}>
                <div>
                  <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', lineHeight: 1.1 }}>{m.name}</div>
                  <div style={{ marginTop: 7, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13.5, color: '#9a93b5', lineHeight: 1.55, maxWidth: 460 }}>{m.desc}</div>
                </div>
                <span style={{ paddingTop: 2 }}><TypePill t={m.type} sm /></span>
                <span style={{ paddingTop: 3, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: CLS_COLOR[m.cls] }}>{m.cls}</span>
                <span style={{ paddingTop: 2, fontFamily: "'Space Mono', monospace", fontSize: 15, color: '#d8d2f0', textAlign: 'right' }}>{m.pow}</span>
                <span style={{ paddingTop: 2, fontFamily: "'Space Mono', monospace", fontSize: 15, color: '#d8d2f0', textAlign: 'right' }}>{m.acc}</span>
                <span style={{ paddingTop: 2, fontFamily: "'Space Mono', monospace", fontSize: 15, color: '#d8d2f0', textAlign: 'right' }}>{m.pp}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
})();
