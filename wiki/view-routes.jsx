/* Pokémon Void — Locations index + Location detail. window.VIEWS.Locations / .Location */
window.VIEWS = window.VIEWS || {};
(function () {
  const { byDex, TYPES } = window.VDEX;
  const { ROUTES, TRAINERS, ITEMS } = window.VGAME;
  const { go, SpriteSlot, TypePill, typeAccent, ItemIcon, PageHead, Empty } = window.VUI;

  const trainersAt = (slug) => TRAINERS.filter(t => t.loc === slug);
  const locBySlug = (slug) => ROUTES.find(r => r.slug === slug);
  const itemByName = (name) => ITEMS.find(i => i.name === name);
  const ITEM_COLORS = {
    'Evolution': '#5fd13c', 'Valuable': '#ffd23c', 'Battle Items': '#8a5cff', 'Key Item': '#33d6ff',
    'Medicine': '#ff6f8f', 'Poké Ball': '#ff8a5c', 'Berries': '#d13c8a',
  };

  // ---------- index ----------
  window.VIEWS.Locations = function Locations() {
    return (
      <div>
        <PageHead kicker="REGION MAP" title="Locations" sub="The road from a sunny starting town to a tear in the sky. Open any location to see its wild Pokémon, the trainers and folk you'll meet there, and the items hidden within." />

        <div style={{ position: 'relative', paddingLeft: 38 }}>
          <div style={{ position: 'absolute', left: 13, top: 8, bottom: 8, width: 2, background: 'linear-gradient(180deg, #5fd13c, #33d6ff 45%, #8a5cff 75%, #ff6f8f)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ROUTES.map((r) => {
              const endgame = r.kind === 'Dungeon';
              const trs = trainersAt(r.slug);
              const [hov, setHov] = [undefined, undefined];
              return (
                <div key={r.slug} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -32, top: 22, width: 16, height: 16, borderRadius: '50%', background: endgame ? '#8a5cff' : '#0e0b1f', border: `2px solid ${endgame ? '#b89bff' : '#33d6ff'}`, boxShadow: `0 0 12px ${endgame ? '#8a5cff' : '#33d6ff'}aa` }} />
                  <button onClick={() => go('#/location/' + r.slug)}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = endgame ? '#5a4a9e' : '#33557e'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = endgame ? '#3a2f6e' : '#221d3a'; e.currentTarget.style.transform = 'none'; }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer', padding: 20, borderRadius: 14, transition: 'all .15s',
                      background: endgame ? 'linear-gradient(160deg, #1a1140, #0c0a1c)' : '#0e0b1f', border: `1px solid ${endgame ? '#3a2f6e' : '#221d3a'}` }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 24, color: '#fff' }}>{r.name}</span>
                      <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#8a5cff', letterSpacing: 0.5 }}>{r.tag.toUpperCase()}</span>
                      <span style={{ marginLeft: 'auto', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#8a5cff' }}>View ›</span>
                    </div>
                    <p style={{ margin: '0 0 14px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14.5, color: '#bdb6dd', lineHeight: 1.55, maxWidth: 720, textWrap: 'pretty' }}>{r.desc}</p>
                    <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#7a7398' }}>
                      <span>◉ {r.mons.length} Pokémon</span>
                      <span>⚔ {trs.length} Trainer{trs.length === 1 ? '' : 's'}</span>
                      <span>☉ {r.npcs.length} NPC{r.npcs.length === 1 ? '' : 's'}</span>
                      <span>◆ {r.items.length} Item{r.items.length === 1 ? '' : 's'}</span>
                      <span style={{ color: '#5f5980' }}>· {r.encounter}</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ---------- detail pieces ----------
  function MonCard({ dx }) {
    const m = byDex(dx); if (!m) return null;
    const accent = typeAccent(m.types);
    return (
      <button onClick={() => go('#/pokemon/' + dx)} style={{ cursor: 'pointer', textAlign: 'center', padding: 12, borderRadius: 12, background: accent.cardBorderFill, border: '1px solid transparent', width: 120 }}>
        <SpriteSlot dex={dx} name={m.name} size={92} accent={accent.glow} />
        <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980', marginTop: 6 }}>No.{m.dex}</div>
        <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 15, color: '#fff', lineHeight: 1.1, marginTop: 2 }}>{m.name}</div>
        <div style={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap', marginTop: 6 }}>{m.types.map(t => <TypePill key={t} t={t} sm onClick={(e) => { e.stopPropagation(); go('#/pokemon/' + dx); }} />)}</div>
      </button>
    );
  }

  function TrainerCard({ t }) {
    const c = TYPES[t.type] || { glow: '#8a5cff', bg: '#3a1d6e' };
    return (
      <div style={{ padding: 16, borderRadius: 14, background: t.boss ? `linear-gradient(160deg, ${c.bg}88, #0c0a1c)` : '#0e0b1f', border: `1px solid ${t.boss ? c.glow : '#221d3a'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{ flex: '0 0 auto', width: 48, height: 48, borderRadius: 10, background: `radial-gradient(circle at 40% 32%, ${c.glow}33, #0b0918)`, border: `1px solid ${c.glow}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Mono', monospace", fontSize: 7, color: '#7b6fb8', textAlign: 'center', lineHeight: 1.3 }}>VS<br/>ART</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 19, color: '#fff' }}>{t.name}</span>
              {t.boss && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: c.glow, border: `1px solid ${c.glow}`, borderRadius: 4, padding: '1px 5px' }}>BOSS</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <TypePill t={t.type} sm />
              {t.badge !== '—' && <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#ffd23c' }}>◆ {t.badge}</span>}
            </div>
          </div>
        </div>
        <p style={{ margin: '0 0 10px', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#9a93b5', lineHeight: 1.5 }}>{t.desc}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {t.team.map(dx => { const m = byDex(dx); if (!m) return null; const accent = typeAccent(m.types); return (
            <button key={dx} onClick={() => go('#/pokemon/' + dx)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px 4px 4px', borderRadius: 999, background: accent.borderFill, border: '1px solid transparent' }}>
              <SpriteSlot dex={dx} name={m.name} size={26} accent={accent.glow} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: '#cdbfff', fontWeight: 600 }}>{m.name}</span>
            </button>
          ); })}
        </div>
      </div>
    );
  }

  const H3 = ({ children }) => <h3 style={{ margin: '0 0 14px', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#8a5cff' }}>{children}</h3>;

  // ---------- detail ----------
  window.VIEWS.Location = function Location({ param }) {
    const r = locBySlug(param);
    if (!r) return <Empty label={'No location named “' + param + '”.'} />;
    const trs = trainersAt(r.slug);
    const idx = ROUTES.findIndex(x => x.slug === r.slug);
    const prev = ROUTES[(idx - 1 + ROUTES.length) % ROUTES.length];
    const next = ROUTES[(idx + 1) % ROUTES.length];
    const endgame = r.kind === 'Dungeon';
    const accent = endgame ? '#8a5cff' : '#33d6ff';

    const NavBtn = ({ m, dir }) => (
      <button onClick={() => go('#/location/' + m.slug)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 9, background: '#0e0b1f', border: '1px solid #221d3a', color: '#b8b0e0', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>
        {dir === 'prev' && '‹'} {m.name} {dir === 'next' && '›'}
      </button>
    );

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
          <button onClick={() => go('#/locations')} style={{ cursor: 'pointer', background: 'transparent', border: 'none', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#8a5cff' }}>‹ LOCATIONS</button>
          <div style={{ display: 'flex', gap: 8 }}><NavBtn m={prev} dir="prev" /><NavBtn m={next} dir="next" /></div>
        </div>

        {/* hero banner */}
        <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: `1px solid ${accent}44`, marginBottom: 24, background: `radial-gradient(ellipse at 25% 0%, ${accent}22, #0a0818 60%)` }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(1px 1px at 14% 28%, #fff7, transparent), radial-gradient(1px 1px at 72% 22%, #fff5, transparent), radial-gradient(2px 2px at 40% 60%, #b89bff66, transparent), radial-gradient(1px 1px at 88% 70%, #fff5, transparent)' }} />
          <div style={{ position: 'relative', padding: '34px 30px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', minHeight: 150 }}>
            <div>
              <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, letterSpacing: 2, color: accent, marginBottom: 10 }}>{r.kind.toUpperCase()}{r.tag.toUpperCase() !== r.kind.toUpperCase() ? ' · ' + r.tag.toUpperCase() : ''}</div>
              <h1 style={{ margin: 0, fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 52, lineHeight: 1, color: '#fff', textShadow: `0 0 30px ${accent}66` }}>{r.name}</h1>
              <p style={{ margin: '14px 0 0', fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: '#bdb6dd', lineHeight: 1.6, maxWidth: 620, textWrap: 'pretty' }}>{r.desc}</p>
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#8a83a8', textAlign: 'right' }}>
              <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#5f5980', marginBottom: 4 }}>ENCOUNTER</div>{r.encounter}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28, alignItems: 'start' }}>
          {/* main column */}
          <div>
            <section style={{ marginBottom: 30 }}>
              <H3>WILD POKÉMON</H3>
              {r.mons.length === 0 ? <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>No wild Pokémon here.</div> : (
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>{r.mons.map(dx => <MonCard key={dx} dx={dx} />)}</div>
              )}
            </section>

            <section>
              <H3>TRAINERS</H3>
              {trs.length === 0 ? <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>No trainers to battle here.</div> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>{trs.map(t => <TrainerCard key={t.name} t={t} />)}</div>
              )}
            </section>
          </div>

          {/* side column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <section>
              <H3>NPCS</H3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {r.npcs.map(n => (
                  <div key={n.name} style={{ padding: 14, borderRadius: 12, background: '#0e0b1f', border: '1px solid #221d3a' }}>
                    <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#8a5cff', marginBottom: 5 }}>{n.role.toUpperCase()}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{n.name}</div>
                    <p style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#9a93b5', lineHeight: 1.5, fontStyle: 'italic' }}>{n.line}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <H3>ITEMS</H3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {r.items.map(it => {
                  const item = itemByName(it) || { name: it };
                  const col = ITEM_COLORS[item.cat] || '#8a5cff';
                  return (
                    <button key={it} onClick={() => go('#/items')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: '#0e0b1f', border: '1px solid #221d3a', textAlign: 'left' }}>
                      <ItemIcon item={item} color={col} size={30} />
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#cdbfff', fontWeight: 600 }}>{it}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  };
})();
