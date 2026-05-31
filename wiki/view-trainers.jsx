/* Pokémon Void — Trainers / Gyms view. window.VIEWS.Trainers */
window.VIEWS = window.VIEWS || {};
(function () {
  const { byDex, TYPES } = window.VDEX;
  const { TRAINERS } = window.VGAME;
  const { go, SpriteSlot, TypePill, PageHead } = window.VUI;

  function Card({ t }) {
    const c = TYPES[t.type] || { glow: '#8a5cff', bg: '#3a1d6e' };
    const isVoid = t.role.includes('Team Void');
    return (
      <div style={{ padding: 20, borderRadius: 16, background: t.boss ? `linear-gradient(160deg, ${c.bg}88, #0c0a1c)` : isVoid ? 'linear-gradient(160deg, #16101f, #0c0a1c)' : '#0e0b1f', border: `1px solid ${t.boss ? c.glow : isVoid ? '#2a2038' : '#221d3a'}`, boxShadow: t.boss ? `0 0 32px ${c.glow}33` : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 14 }}>
          {/* avatar slot */}
          <div style={{ flex: '0 0 auto', width: 64, height: 64, borderRadius: 12, background: `radial-gradient(circle at 40% 32%, ${c.glow}33, #0b0918)`, border: `1px solid ${c.glow}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Mono', monospace", fontSize: 8, color: '#7b6fb8', textAlign: 'center', lineHeight: 1.4 }}>VS<br/>SPRITE</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 24, color: '#fff' }}>{t.name}</span>
              {t.boss && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: c.glow, border: `1px solid ${c.glow}`, borderRadius: 4, padding: '2px 6px' }}>BOSS</span>}
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#8a83a8', marginTop: 2 }}>{t.role}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
              <TypePill t={t.type} sm />
              {t.badge !== '—' && t.badge !== '\u2014' && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#ffd23c' }}>◆ {t.badge}</span>}
            </div>
          </div>
        </div>
        <p style={{ margin: '0 0 14px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#bdb6dd', lineHeight: 1.55, textWrap: 'pretty' }}>{t.desc}</p>
        <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980', marginBottom: 8 }}>PARTY</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {t.team.map(dx => { const m = byDex(dx); if (!m) return null; return (
            <button key={dx} onClick={() => go('#/pokemon/' + dx)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 6, borderRadius: 10, background: '#15112a', border: `1px solid ${TYPES[m.types[0]].glow}33` }}>
              <SpriteSlot dex={dx} name={m.name} size={56} accent={TYPES[m.types[0]].glow} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#cdbfff', fontWeight: 600 }}>{m.name}</span>
            </button>
          ); })}
        </div>
      </div>
    );
  }

  window.VIEWS.Trainers = function Trainers() {
    const gyms = TRAINERS.filter(t => t.badge !== '—' && t.badge !== '\u2014');
    const team = TRAINERS.filter(t => t.role.includes('Team Void'));
    const Section = ({ title, sub, items, color }) => (
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ fontFamily: "'Silkscreen', monospace", fontSize: 13, letterSpacing: 1, color, margin: '0 0 4px' }}>{title}</h2>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#7a7398', margin: '0 0 16px' }}>{sub}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
          {items.map(t => <Card key={t.name} t={t} />)}
        </div>
      </div>
    );
    return (
      <div>
        <PageHead kicker="OPPONENTS" title="Trainers & Gyms" sub="The four leaders who guard the Aethel badges — and the cult that would rather the badges, the region, and everything else simply stopped existing." />
        <Section title="GYM LEADERS" sub="Beat all four to challenge the Rift." items={gyms} color="#ffd23c" />
        <Section title="TEAM VOID" sub="They worship what waits at #000." items={team} color="#8a5cff" />
      </div>
    );
  };
})();
