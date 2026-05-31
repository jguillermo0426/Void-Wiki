/* Pokémon Void — Pokémon detail view (merged "Void Archive" layout). window.VIEWS.Detail */
window.VIEWS = window.VIEWS || {};
(function () {
  const { DEX, byDex, TYPES } = window.VDEX;
  const { ROUTES } = window.VGAME;
  const { go, TypePill, SpriteSlot, Radar, StatBars, Matchups, Empty } = window.VUI;

  const H3 = (props) => <h3 style={{ margin: props.m || '0 0 14px', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#8a5cff' }}>{props.children}</h3>;

  function MoveRow({ m }) {
    const c = TYPES[m.type];
    const isSig = m.lv === '—';
    const isEgg = m.lv === 'EGG';
    const isTM  = typeof m.lv === 'string' && m.lv.startsWith('TM');
    const leftLabel = isSig ? 'SIG' : isEgg ? 'EGG' : isTM ? 'TM' : 'LV';
    const leftValue = isSig ? '★' : isEgg ? '✦' : isTM ? m.lv.slice(2) : m.lv;
    const leftSize  = (isSig || isEgg) ? 16 : 19;
    const leftColor = m.sig ? c.glow : '#fff';
    const Stat = ({ label, val }) => (
      <div style={{ textAlign: 'right', minWidth: 36 }}>
        <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#5f5980' }}>{label}</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#d8d2f0', fontWeight: 700 }}>{val}</div>
      </div>
    );
    return (
      <div onClick={() => go('#/moves')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, padding: '11px 14px', borderRadius: 12, background: m.sig ? `linear-gradient(135deg, ${c.bg}66, #0f0b22)` : 'linear-gradient(135deg, #15102e, #0f0b22)', border: `1px solid ${m.sig ? c.glow + '88' : '#231d40'}` }}>
        <div style={{ flex: '0 0 auto', width: 40, textAlign: 'center', borderRight: '1px solid #2a2350', paddingRight: 12 }}>
          <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: m.sig ? c.glow : '#5f5980' }}>{leftLabel}</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: leftSize, color: leftColor, fontWeight: 700, lineHeight: 1.1 }}>{leftValue}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Pixelify Sans', sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 6 }}>{m.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TypePill t={m.type} sm onClick={(e) => e.stopPropagation()} /><span style={{ fontSize: 12, color: '#8a83a8' }}>{m.cls}</span>
          </div>
        </div>
        <div style={{ flex: '0 0 auto', display: 'flex', gap: 12 }}><Stat label="POW" val={m.pow} /><Stat label="ACC" val={m.acc} /><Stat label="PP" val={m.pp} /></div>
      </div>
    );
  }

  function MoveSection({ title, moves }) {
    return (
      <div style={{ marginBottom: 24 }}>
        <H3 m="0 0 12px">{title}</H3>
        {moves && moves.length > 0
          ? <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{moves.map(m => <MoveRow key={m.name + m.lv} m={m} />)}</div>
          : <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#5f5980', padding: '10px 14px', borderRadius: 10, background: '#0f0c22', border: '1px solid #1d1838' }}>None</div>
        }
      </div>
    );
  }

  function buildEvoTree(d) {
    let root = d;
    while (root.evo && root.evo.from) root = byDex(root.evo.from);
    function node(m) {
      const tos = Array.isArray(m.evo && m.evo.to) ? m.evo.to : (m.evo && m.evo.to) ? [m.evo.to] : [];
      return { data: m, children: tos.map(t => { const nx = byDex(t); return nx ? { method: nx.evo.method, node: node(nx) } : null; }).filter(Boolean) };
    }
    return node(root);
  }

  function EvoCard({ m, current }) {
    return (
      <button onClick={() => go('#/pokemon/' + m.dex)} style={{ cursor: 'pointer', background: m.dex === current ? '#1a1440' : 'transparent', border: `1px solid ${m.dex === current ? '#3a2f6e' : '#221d3a'}`, borderRadius: 12, padding: 10, textAlign: 'center' }}>
        <SpriteSlot dex={m.dex} name={m.name} size={84} accent={TYPES[m.types[0]].glow} />
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: '#e9e4ff', marginTop: 6 }}>{m.name}</div>
      </button>
    );
  }

  function EvoArrow({ method }) {
    return (
      <div style={{ textAlign: 'center', color: '#8a5cff', flex: '0 0 auto' }}>
        <div style={{ fontSize: 18, lineHeight: 1 }}>→</div>
        <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#6a6388', marginTop: 2 }}>{method}</div>
      </div>
    );
  }

  function EvoNode({ node: n, current }) {
    const { data: m, children } = n;
    if (children.length === 0) return <EvoCard m={m} current={current} />;
    if (children.length === 1) return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <EvoCard m={m} current={current} />
        <EvoArrow method={children[0].method} />
        <EvoNode node={children[0].node} current={current} />
      </div>
    );
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <EvoCard m={m} current={current} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {children.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <EvoArrow method={c.method} />
              <EvoNode node={c.node} current={current} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Evolution({ d }) {
    const tree = buildEvoTree(d);
    if (tree.children.length === 0) return (
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>{d.legendary ? 'A one-of-a-kind being. It does not evolve.' : 'Does not evolve.'}</div>
    );
    return <EvoNode node={tree} current={d.dex} />;
  }

  function InfoTable({ rows }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {rows.map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderRadius: 8, background: '#100c24', border: '1px solid #1d1838' }}>
            <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#6a6388', letterSpacing: 0.5 }}>{label.toUpperCase()}</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#e9e4ff', fontWeight: 700 }}>{value}</span>
          </div>
        ))}
      </div>
    );
  }

  function formatEVYield(evYield) {
    if (!evYield) return '—';
    const labels = { HP: 'HP', ATK: 'Attack', DEF: 'Defense', SPA: 'Sp. Atk', SPD: 'Sp. Def', SPE: 'Speed' };
    return Object.entries(evYield).map(([k, v]) => `${v} ${labels[k]}`).join(', ');
  }

  function formatGender(d) {
    if (d.genderless) return 'Genderless';
    if (!d.gender) return '♂ 50%  ♀ 50%';
    if (d.gender.m === 100) return '♂ only';
    if (d.gender.f === 100) return '♀ only';
    return `♂ ${d.gender.m}%  ♀ ${d.gender.f}%`;
  }

  function SpriteGallery({ d, accent }) {
    const FRAMES = [
      { suffix: null,   label: 'F1'   },
      { suffix: 'f2',   label: 'F2'   },
      { suffix: 'back', label: 'BACK' },
    ];
    const VARIANTS = [
      { key: 'normal',  label: 'NORMAL',  color: accent,    prefix: ''        },
      { key: 'shiny',   label: 'SHINY',   color: '#ffd700', prefix: 'shiny'   },
      { key: 'anomaly', label: 'ANOMALY', color: '#c45fff', prefix: 'anomaly' },
    ];
    const sfx = (prefix, frameSuffix) => {
      if (!prefix && frameSuffix === null) return undefined;
      if (!prefix) return frameSuffix;
      if (frameSuffix === null) return prefix;
      return `${prefix}-${frameSuffix}`;
    };
    const anomalyRevealed = d.anomaly != null;
    return (
      <div style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid #1d1838' }}>
        <H3>SPRITE GALLERY</H3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {VARIANTS.map(v => {
            const isAnomaly = v.key === 'anomaly';
            const locked = isAnomaly && !anomalyRevealed;
            return (
              <div key={v.key} style={{ padding: 14, borderRadius: 12, background: '#0d0b20', border: `1px solid ${v.color}33` }}>
                <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: v.color, letterSpacing: 1, marginBottom: 12 }}>{v.label}</div>
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', filter: locked ? 'blur(7px) brightness(0.5)' : 'none', userSelect: locked ? 'none' : 'auto' }}>
                    {FRAMES.map(f => (
                      <div key={f.label} style={{ textAlign: 'center' }}>
                        <SpriteSlot dex={d.dex} name={d.name} size={80} accent={v.color} suffix={sfx(v.prefix, f.suffix)} label={f.label} />
                        <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#6a6388', marginTop: 4 }}>{f.label}</div>
                      </div>
                    ))}
                  </div>
                  {locked && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                      <div style={{ fontSize: 22 }}>🔒</div>
                      <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#c45fff', letterSpacing: 1 }}>UNDISCOVERED</div>
                    </div>
                  )}
                  {isAnomaly && anomalyRevealed && (
                    <div style={{ marginTop: 10, textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 7, color: '#8a83a8', letterSpacing: 1, marginBottom: 3 }}>DISCOVERED BY</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#c45fff', fontWeight: 700 }}>{d.anomaly.discoverer}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  window.VIEWS.Detail = function Detail({ param }) {
    const d = byDex(param);
    if (!d) return <Empty label={'No Pokédex entry for №' + param + '.'} />;
    const total = Object.values(d.stats).reduce((a, b) => a + b, 0);
    const idx = DEX.findIndex(x => x.dex === d.dex);
    const prev = DEX[(idx - 1 + DEX.length) % DEX.length];
    const next = DEX[(idx + 1) % DEX.length];
    const accent = TYPES[d.types[0]].glow;
    const foundRoutes = ROUTES.filter(r => r.mons.includes(d.dex));

    const NavBtn = ({ m, dir }) => (
      <button onClick={() => go('#/pokemon/' + m.dex)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 9, background: '#0e0b1f', border: '1px solid #221d3a', color: '#b8b0e0', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13 }}>
        {dir === 'prev' && '‹'} <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#5f5980' }}>No.{m.dex}</span> {m.name} {dir === 'next' && '›'}
      </button>
    );

    return (
      <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid #1d1838', background: 'radial-gradient(ellipse at 30% 0%, #15102e 0%, #0a0818 55%)' }}>
        {/* masthead */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(1px 1px at 12% 18%, #fff8, transparent), radial-gradient(1px 1px at 80% 12%, #fff6, transparent), radial-gradient(1px 1px at 55% 40%, #fff5, transparent), radial-gradient(2px 2px at 30% 60%, #b89bff77, transparent), radial-gradient(1px 1px at 90% 70%, #fff5, transparent)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', position: 'relative' }}>
            <button onClick={() => go('#/pokedex')} style={{ cursor: 'pointer', background: 'transparent', border: 'none', fontFamily: "'Silkscreen', monospace", fontSize: 11, letterSpacing: 1, color: '#8a5cff' }}>‹ POKÉDEX</button>
            <div style={{ display: 'flex', gap: 8 }}><NavBtn m={prev} dir="prev" /><NavBtn m={next} dir="next" /></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 10, padding: '4px 32px 28px', position: 'relative' }}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle, ${accent}55 0%, ${TYPES[d.types[0]].bg}55 35%, transparent 68%)`, filter: 'blur(30px)' }} />
                <div style={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', border: `1px solid ${accent}33`, transform: 'rotate(-18deg) scaleY(0.4)' }} />
                <SpriteSlot dex={d.dex} name={d.name} size={220} accent={accent} label="HERO SPRITE" />
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 6 }}>{d.types.map(t => <TypePill key={t} t={t} glow />)}</div>
              <div style={{ fontSize: 14, color: '#8a83a8', letterSpacing: 1, marginTop: 12 }}>{d.category} Pokémon</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 56, color: '#1c1840', lineHeight: 1, letterSpacing: 2 }}>{d.dex}</div>
              <h1 style={{ margin: '4px 0 0', fontFamily: "'Pixelify Sans', sans-serif", fontWeight: 700, fontSize: 76, lineHeight: 0.9, color: '#fff', textShadow: `0 0 40px ${accent}88`, letterSpacing: -1 }}>{d.name}</h1>
              <p style={{ margin: '20px 0 0', fontSize: 17, lineHeight: 1.7, color: '#bdb6dd', textWrap: 'pretty', maxWidth: 520 }}>{d.flavor}</p>
              <div style={{ display: 'flex', gap: 26, marginTop: 22, flexWrap: 'wrap' }}>
                {[['HEIGHT', d.height], ['WEIGHT', d.weight], ['CATCH RATE', d.catchRate]].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontFamily: "'Silkscreen', monospace", fontSize: 9, color: '#6a6388', marginBottom: 4 }}>{k}</div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, color: '#f0ecff', fontWeight: 700 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* lower band */}
        <div style={{ background: 'linear-gradient(180deg, #0b0820, #0a0818)', borderTop: '1px solid #1d1838', padding: '28px 32px 34px' }}>
          <SpriteGallery d={d} accent={accent} />
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 30 }}>
            <div>
              <H3 m="0 0 6px">STAT SHAPE</H3>
              <div style={{ display: 'flex', justifyContent: 'center' }}><Radar stats={d.stats} /></div>
              <div style={{ textAlign: 'center', fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#8a83a8', marginTop: 2, marginBottom: 24 }}>TOTAL <span style={{ color: accent, fontWeight: 700, fontSize: 16 }}>{total}</span></div>
              <H3>TYPE MATCHUPS</H3>
              <Matchups weak={d.weak} resist={d.resist} immune={d.immune} />
            </div>

            <div>
              <H3 m="0 0 16px">BASE STATS</H3>
              <StatBars stats={d.stats} />
              <H3 m="26px 0 12px">ABILITIES</H3>
              {[...d.abilities, { ...d.hidden, hidden: true }].map(a => (
                <button key={a.name} onClick={() => go('#/abilities')} style={{ display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer', marginBottom: 12, padding: '12px 14px', borderRadius: 10, background: '#100c24', border: '1px solid #221c3e' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: a.hidden ? '#cdbfff' : '#f0ecff', fontFamily: "'Space Grotesk', sans-serif" }}>{a.name}{a.hidden && <span style={{ marginLeft: 8, fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#8a5cff' }}>HIDDEN</span>}</div>
                  <div style={{ fontSize: 13, color: '#9a93b5', marginTop: 4, lineHeight: 1.5, fontFamily: "'Space Grotesk', sans-serif" }}>{a.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* evolution + locations */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 30, marginTop: 28, paddingTop: 24, borderTop: '1px solid #1d1838' }}>
            <div><H3>EVOLUTION</H3><Evolution d={d} /></div>
            <div>
              <H3>FOUND IN</H3>
              {foundRoutes.length === 0 ? <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#6a6388' }}>Not found in the wild.</div> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {foundRoutes.map(r => (
                    <button key={r.slug} onClick={() => go('#/location/' + r.slug)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: '#100c24', border: '1px solid #221c3e' }}>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: '#e9e4ff' }}>{r.name}</span>
                      <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 8, color: '#6a6388' }}>{r.encounter.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* training + breeding */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 28, paddingTop: 24, borderTop: '1px solid #1d1838' }}>
            <div>
              <H3>TRAINING</H3>
              <InfoTable rows={[
                ['EV Yield', formatEVYield(d.evYield)],
                ['Catch Rate', d.catchRate],
                ['Base Friendship', d.baseFriendship ?? '—'],
                ['Base Exp.', d.baseExp ?? '—'],
                ['Growth Rate', d.growthRate ?? '—'],
              ]} />
            </div>
            <div>
              <H3>BREEDING</H3>
              <InfoTable rows={[
                ['Egg Groups', d.eggGroups ? d.eggGroups.join(' · ') : '—'],
                ['Gender', formatGender(d)],
                ['Egg Steps', d.eggCycles != null ? `${d.eggCycles.toLocaleString()} steps` : '—'],
              ]} />
            </div>
          </div>

          {/* moves */}
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid #1d1838' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
              <MoveSection title="MOVES · LEVEL UP" moves={d.levelMoves} />
              <div>
                <MoveSection title="MOVES · TM" moves={d.tmMoves} />
                <MoveSection title="MOVES · EGG" moves={d.eggMoves} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
})();
