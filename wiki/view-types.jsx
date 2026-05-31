/* Pokémon Void — Type chart view. window.VIEWS.Types */
window.VIEWS = window.VIEWS || {};
(function () {
  const { TYPES } = window.VDEX;
  const { CHART, eff, TYPE_ORDER } = window.VGAME;
  const { TypePill, PageHead } = window.VUI;
  const ABBR = { NORMAL: 'NOR', FIRE: 'FIR', WATER: 'WAT', ELECTRIC: 'ELE', GRASS: 'GRA', ICE: 'ICE', FIGHTING: 'FIG', POISON: 'POI', GROUND: 'GRD', FLYING: 'FLY', PSYCHIC: 'PSY', BUG: 'BUG', ROCK: 'ROK', GHOST: 'GHO', DRAGON: 'DRA', DARK: 'DRK', STEEL: 'STL', FAIRY: 'FAI', LIGHT: 'LIT', COSMIC: 'COS' };

  function cellStyle(mult) {
    if (mult === 2) return { bg: '#1c5e2f', fg: '#7dffa8', label: '2' };
    if (mult === 0.5) return { bg: '#5e1c2a', fg: '#ff9aae', label: '½' };
    if (mult === 0) return { bg: '#05040a', fg: '#5a5278', label: '0' };
    return { bg: 'transparent', fg: '#2c2650', label: '·' };
  }

  window.VIEWS.Types = function Types() {
    const [sel, setSel] = React.useState(null); // attacking type focused
    const SZ = 30;

    return (
      <div>
        <PageHead kicker="TYPE MATRIX" title="Type Chart" sub="Attack types down the side, defending types across the top. Light and Cosmic are new to this region — Dark tears through both, while Light is uniquely weak to Water, Grass, and Ice but hits back hard against Ghost, Dragon, and Dark." />

        {/* legend */}
        <div style={{ display: 'flex', gap: 18, marginBottom: 18, flexWrap: 'wrap', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#9a93b5' }}>
          {[['2', '#1c5e2f', '#7dffa8', 'Super effective ×2'], ['½', '#5e1c2a', '#ff9aae', 'Not very effective ×½'], ['0', '#05040a', '#5a5278', 'No effect ×0'], ['·', '#15112a', '#6a6388', 'Normal ×1']].map(([s, bg, fg, label]) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 22, height: 22, borderRadius: 4, background: bg, border: '1px solid #2a2545', color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700 }}>{s}</span>{label}
            </span>
          ))}
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid #221d3a', borderRadius: 14, background: '#0c0a1c', padding: 14 }}>
          <div style={{ display: 'inline-block' }}>
            {/* header */}
            <div style={{ display: 'flex', marginLeft: 96 }}>
              {TYPE_ORDER.map(dt => (
                <div key={dt} onMouseEnter={() => setSel(dt + '|def')} onMouseLeave={() => setSel(null)}
                  style={{ width: SZ, height: 40, margin: '0 1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: TYPES[dt].glow, writingMode: 'vertical-rl', transform: 'rotate(180deg)', whiteSpace: 'nowrap' }}>{ABBR[dt]}</span>
                </div>
              ))}
            </div>
            {/* rows */}
            {TYPE_ORDER.map(at => (
              <div key={at} style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={() => setSel(s => s === at + '|atk' ? null : at + '|atk')}
                  style={{ width: 92, marginRight: 4, cursor: 'pointer', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'flex-end' }}>
                  <span style={{ padding: '3px 8px', borderRadius: 5, background: TYPES[at].bg, color: TYPES[at].fg, fontFamily: "'Silkscreen', monospace", fontSize: 8, letterSpacing: 0.3, border: `1px solid ${TYPES[at].glow}55` }}>{TYPES[at].name.toUpperCase()}</span>
                </button>
                {TYPE_ORDER.map(dt => {
                  const cs = cellStyle(eff(at, dt));
                  const hot = sel === at + '|atk' || sel === dt + '|def';
                  return (
                    <div key={dt} title={`${TYPES[at].name} → ${TYPES[dt].name}`}
                      style={{ width: SZ, height: SZ, margin: 1, borderRadius: 3, background: cs.bg, color: cs.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, outline: hot ? `1px solid ${TYPES[at].glow}` : '1px solid #15112a', opacity: sel && !hot ? 0.35 : 1, transition: 'opacity .12s' }}>{cs.label}</div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* focused breakdown */}
        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#8a5cff', marginBottom: 14 }}>OFFENSIVE BREAKDOWN — CLICK A TYPE</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {['LIGHT', 'COSMIC'].map(at => {
              const c = CHART[at];
              return (
                <div key={at} style={{ padding: 18, borderRadius: 14, background: `linear-gradient(160deg, ${TYPES[at].bg}55, #0c0a1c)`, border: `1px solid ${TYPES[at].glow}66` }}>
                  <div style={{ marginBottom: 14 }}><TypePill t={at} glow onClick={() => {}} /></div>
                  {c.se.length > 0 && <Row label="Super effective vs" color="#7dffa8" items={c.se} />}
                  {c.nv.length > 0 && <Row label="Not very effective vs" color="#ff9aae" items={c.nv} />}
                  {c.no.length > 0 && <Row label="No effect on" color="#8a83a8" items={c.no} />}
                </div>
              );
            })}
          </div>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#6a6388', marginTop: 14 }}>Hover any row or column in the grid above to trace a single type's matchups.</p>
        </div>
      </div>
    );
  };

  function Row({ label, color, items }) {
    return (
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color, marginBottom: 7 }}>{label}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{items.map(t => <window.VUI.TypePill key={t} t={t} sm onClick={() => {}} />)}</div>
      </div>
    );
  }
})();
