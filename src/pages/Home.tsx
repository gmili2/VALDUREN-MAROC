import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dial, ProductGrid } from '../components/Catalog';
import { useCatalog } from '../catalog';
import { useLayout } from '../layout';
import { productPath, shopPath } from '../routes';

const wrap: React.CSSProperties = { maxWidth: 1320, margin: '0 auto', paddingLeft: 24, paddingRight: 24 };
const line = '1px solid var(--line)';
const GOLD = '#E2A75E';

/** Parfum mis en avant en ouverture (photo public/looks) et parfum signature de la maison. */
const HERO_SLUG = 'eternal-desire';
const SIGNATURE_SLUG = 'boom';

function Hero() {
  const L = useLayout();
  const { find } = useCatalog();
  const p = find(HERO_SLUG);
  const m = L.mobile;
  return (
    <section aria-label="Eternal Desire" style={{ position: 'relative', overflow: 'hidden', borderBottom: line, background: '#1A0F06' }}>
      <img src="/looks/eternal-desire-desert.jpg" alt="Flacon Valduren Eternal Desire posé sur un rocher, face aux dunes au coucher du soleil" fetchPriority="high"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: m ? '84% center' : 'center', display: 'block' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: m
        ? 'linear-gradient(0deg, rgba(14,13,12,0.94) 0%, rgba(14,13,12,0.7) 42%, rgba(14,13,12,0) 72%)'
        : 'linear-gradient(90deg, rgba(14,13,12,0.88) 0%, rgba(14,13,12,0.6) 34%, rgba(14,13,12,0) 62%)' }} />
      <div style={{ ...wrap, position: 'relative', minHeight: m ? 640 : 720, padding: m ? '40px 24px 48px' : '80px 24px 96px', display: 'flex', alignItems: m ? 'flex-end' : 'center' }}>
        <div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p className="eyebrow">Nouveau · Eau de parfum 100 ml</p>
          <h1 className="display" style={{ fontSize: 'clamp(52px, 6.6vw, 100px)', lineHeight: 0.98, color: '#F6EBDA' }}>
            Eternal<br /><span style={{ color: GOLD }}>Desire</span>
          </h1>
          <p style={{ margin: 0, maxWidth: 430, fontSize: 18, fontWeight: 300, lineHeight: 1.7, color: '#E4D6C1' }}>
            Un sillage chaud et lumineux, comme le désert au coucher du soleil.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <Link className="btn btn-primary" to={p ? productPath(p.id) : shopPath('all')}>Découvrir</Link>
            <a className="btn btn-ghost-light" href="#collection">La collection</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const L = useLayout();
  const { products, find } = useCatalog();
  const { hash } = useLocation();
  const [filter, setFilter] = useState('Tout');

  // Liens d'ancre (#collection, #echantillons) : défile jusqu'à la section.
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 60);
    return () => clearTimeout(t);
  }, [hash, products.length]);

  // Filtres par maison : Valduren d'abord, puis les maisons présentes au catalogue.
  const brands = useMemo(() => {
    const set = [...new Set(products.map((p) => p.brand))];
    return ['Tout', ...set.sort((a, b) => (a === 'Valduren' ? -1 : b === 'Valduren' ? 1 : a.localeCompare(b)))];
  }, [products]);
  // Ordre de la maquette : la maison Valduren d'abord, les coffrets à la fin.
  const rank = (p: (typeof products)[number]) => (p.cats.includes('coffrets') ? 2 : p.brand === 'Valduren' ? 0 : 1);
  const shown = useMemo(
    () => (filter === 'Tout' ? products : products.filter((p) => p.brand === filter)).slice().sort((a, b) => rank(a) - rank(b)).slice(0, 9),
    [products, filter], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const sig = find(SIGNATURE_SLUG);
  const notes: [string, string][] = sig ? [['Tête', sig.movement], ['Cœur', sig.strap], ['Fond', sig.glass]] : [];
  const hasNotes = notes.some(([, v]) => v);

  return (
    <>
      <Hero />

      <section id="collection" aria-label="La collection" style={{ borderBottom: line, scrollMarginTop: 90 }}>
        <div style={{ ...wrap, paddingTop: L.mobile ? 56 : 80, paddingBottom: L.mobile ? 56 : 80 }}>
          <div data-reveal style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginBottom: 40 }}>
            <p className="eyebrow">La collection</p>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 4vw, 54px)' }}>Notre sélection</h2>
            {brands.length > 2 && (
              <div role="group" aria-label="Filtrer par maison" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 8 }}>
                {brands.map((b) => (
                  <button key={b} className={`chip${filter === b ? ' active' : ''}`} aria-pressed={filter === b} onClick={() => setFilter(b)}>{b}</button>
                ))}
              </div>
            )}
          </div>
          <ProductGrid items={shown} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
            <Link className="btn btn-outline" to={shopPath('all')}>Toute la collection</Link>
          </div>
        </div>
      </section>

      {sig && (
        <section aria-label={sig.name} style={{ background: '#17140F', borderBottom: line }}>
          <div data-reveal style={{ ...wrap, paddingTop: L.mobile ? 56 : 80, paddingBottom: L.mobile ? 56 : 80, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: L.mobile ? 36 : 56 }}>
            <Link to={productPath(sig.id)} aria-label={sig.name} style={{ flex: '1 1 380px', minWidth: 0, aspectRatio: '1 / 1', maxWidth: 520, border: '1px solid #3A3024', padding: 18 }}>
              <span style={{ position: 'relative', width: '100%', height: '100%', border: `1.5px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0E0D0C', overflow: 'hidden' }}>
                {sig.image
                  ? <img src={sig.image} alt={`Flacon ${sig.name}`} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <Dial size="20%" />}
              </span>
            </Link>
            <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 22 }}>
              <p className="eyebrow">La signature</p>
              <h2 className="display" style={{ fontSize: 'clamp(64px, 8vw, 120px)', lineHeight: 0.9, color: GOLD }}>{sig.name}</h2>
              <p style={{ margin: 0, maxWidth: 460, fontSize: 17, fontWeight: 300, lineHeight: 1.7, color: '#E4D6C1' }}>{sig.desc}</p>
              {hasNotes && (
                <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: L.mobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', border: line }}>
                  {notes.map(([k, v], i) => (
                    <div key={k} style={{ padding: '14px 16px', borderLeft: !L.mobile && i ? line : undefined, borderTop: L.mobile && i ? line : undefined }}>
                      <dt style={{ fontSize: 11, letterSpacing: '.22em', color: 'var(--graphite)', textTransform: 'uppercase' }}>{k}</dt>
                      <dd style={{ margin: '6px 0 0', fontSize: 15 }}>{v || '—'}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <Link className="btn btn-primary" to={productPath(sig.id)} style={{ alignSelf: 'flex-start' }}>Commander {sig.name}</Link>
            </div>
          </div>
        </section>
      )}

      <section id="echantillons" aria-label="Coffret d’échantillons" style={{ scrollMarginTop: 90 }}>
        <div style={{ ...wrap, paddingTop: L.mobile ? 56 : 80, paddingBottom: L.mobile ? 56 : 80 }}>
          <div data-reveal style={{ maxWidth: 1100, margin: '0 auto', border: '1px solid #3A3024', padding: 14 }}>
            <div style={{ border: `1px solid ${GOLD}`, padding: L.mobile ? '32px 22px' : '40px 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 28 }}>
              <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p className="eyebrow">Essayer avant d’adopter</p>
                <h2 className="display" style={{ fontSize: 'clamp(30px, 3.4vw, 46px)' }}>Le coffret d’échantillons 2 ml</h2>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: '#E4D6C1' }}>
                  Chaque parfum en format 2 ml vaporisateur, à glisser dans la poche. Idéal pour trouver votre signature, ou pour offrir.
                </p>
              </div>
              <Link className="btn btn-primary" to={shopPath('coffrets')}>Composer mon coffret</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
