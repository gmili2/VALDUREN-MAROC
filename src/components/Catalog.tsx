import { Link, useNavigate } from 'react-router-dom';
import { COLLECTIONS, badgeOf, fmt, type Product } from '../data';
import { useCatalog } from '../catalog';
import { useLayout } from '../layout';
import { productPath, shopPath } from '../routes';
import { useStore } from '../store';
import { ArrowIcon } from './icons';

/** Flacon dessiné (filet doré) : visuel provisoire tant qu'un parfum n'a pas de photo. */
export function Dial({ size = '30%' }: { size?: string; dark?: boolean; path?: string }) {
  return (
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: size, maxWidth: 90 }}>
      <svg aria-hidden="true" viewBox="0 0 24 32" fill="none" stroke="#E2A75E" strokeWidth="0.7" strokeLinejoin="round" style={{ width: '100%' }}>
        <rect x="9.5" y="1" width="5" height="5" rx="0.6" /><path d="M10.5 6h3v3h-3z" /><rect x="3.5" y="9" width="17" height="21" rx="1.5" />
      </svg>
    </span>
  );
}
export const iconOf = (_p: Pick<Product, 'cats'>) => '';

/** Public du parfum : homme, femme ou unisexe. */
export const whoOf = (p: Pick<Product, 'cats'>) =>
  p.cats.includes('unisexe') || (p.cats.includes('femme') && p.cats.includes('homme')) ? 'Unisexe' : p.cats.includes('femme') ? 'Femme' : p.cats.includes('homme') ? 'Homme' : '';

export function ProductCard({ p }: { p: Product }) {
  const L = useLayout();
  const navigate = useNavigate();
  const { add } = useStore();
  const badge = p.inStock ? badgeOf(p) : 'Épuisé';
  const needsChoice = p.variants.length > 1;
  const featured = p.brand === 'Valduren';
  return (
    <article className="card" style={{ background: '#17140F', border: '1px solid var(--line)', padding: 14, display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
      <Link to={productPath(p.id)} aria-label={p.name} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '1 / 1', background: p.image ? '#1A0F06' : '#17140F', border: `1px solid ${featured ? '#E2A75E' : '#3A3024'}`, overflow: 'hidden' }}>
        {p.image
          ? <img className="zoom-hover" src={p.image} alt={`Flacon ${p.name} de ${p.brand}`} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }} />
          : <Dial size="22%" />}
        {badge && <span style={{ position: 'absolute', zIndex: 2, top: 12, left: 12, background: '#E2A75E', color: '#0E0D0C', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', padding: '5px 8px', textTransform: 'uppercase' }}>{badge}</span>}
      </Link>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center' }}>
        <span style={{ fontSize: 11, letterSpacing: '.22em', color: 'var(--graphite)', textTransform: 'uppercase' }}>{p.brand}</span>
        {/* Vrai lien : les moteurs de recherche suivent les liens pour trouver les fiches. */}
        <h3 style={{ margin: 0, fontFamily: 'var(--display-font)', fontWeight: 400, fontSize: L.mobile ? 18 : 22, letterSpacing: '.04em', lineHeight: 1.2 }}>
          <Link to={productPath(p.id)}>{p.name}</Link>
        </h3>
        {p.kind && <span style={{ fontSize: 13, color: 'var(--muted)' }}>{p.kind}</span>}
        <span style={{ fontSize: 15, color: '#E2A75E', display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {p.old && <span style={{ color: 'var(--graphite)', textDecoration: 'line-through' }}>{fmt(p.old)}</span>}
          <span>{p.hasRange ? 'dès ' : ''}{fmt(p.price)}</span>
        </span>
      </div>
      {p.inStock && p.purchasable && (
        <button
          className="btn btn-dark"
          // Plusieurs contenances (échantillon, flacon) : le choix se fait sur la fiche.
          onClick={() => { if (needsChoice) navigate(productPath(p.id)); else add(p.id, 1, p.variants[0]?.id); }}
          style={{ height: 46, padding: '0 10px', marginTop: 'auto' }}
        >
          {needsChoice ? (L.mobile ? 'Choisir' : 'Choisir la contenance') : (L.mobile ? 'Ajouter' : 'Ajouter au panier')}
        </button>
      )}
    </article>
  );
}

/** Grille du shop : cases séparées par des filets de 1 px, comme la maquette. */
export function ProductGrid({ items }: { items: Product[] }) {
  const { status, reload } = useCatalog();
  const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(150px, 26vw, 400px), 1fr))', gap: 20 };
  if (status === 'loading' && !items.length) {
    return (
      <div style={grid} aria-busy="true" aria-label="Chargement des articles">
        {[0, 1, 2].map((i) => <div key={i} style={{ background: '#17140F', border: '1px solid var(--line)', padding: 14 }}><div className="ph" style={{ aspectRatio: '1', opacity: 0.6 }} /></div>)}
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <p style={{ margin: 0, fontSize: 15.5, color: 'var(--muted)' }}>Le catalogue est momentanément indisponible.</p>
        <button className="btn btn-outline" onClick={reload} style={{ height: 48, padding: '0 24px' }}>Réessayer</button>
      </div>
    );
  }
  return (
    <div data-reveal style={grid}>
      {items.map((p) => <ProductCard key={p.id} p={p} />)}
    </div>
  );
}

export function CollectionsGrid() {
  const L = useLayout();
  const { imageFor, hidden } = useCatalog();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: L.g3, gap: L.gap }}>
      {COLLECTIONS.filter((c) => !hidden(c.id)).map((c) => {
        const img = c.id === 'all' ? undefined : imageFor(c.id);
        return (
        <Link key={c.id} to={shopPath(c.id)} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="ph" style={{ width: '100%', aspectRatio: L.collRatio, backgroundImage: 'none', overflow: 'hidden' }}>
            {img ? (
              <img className="zoom-hover" src={img} alt={c.label} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <>
                <div className="ph zoom-hover" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #3A3024' }}>
                  <Dial size="18%" />
                </div>
                <span className="ph-caption" style={{ left: 14, bottom: 12, fontSize: 9.5, letterSpacing: '.12em' }}>photo · {c.img}</span>
              </>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span className="display" style={{ fontSize: L.mobile ? 28 : 40, color: 'var(--ink)' }}>{c.label}</span>
              {L.desktop && <span style={{ fontSize: 13.5, color: 'var(--graphite)' }}>{c.sub}</span>}
            </div>
            <span style={{ flex: 'none', width: 40, height: 40, border: '1px solid var(--line-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowIcon size={14} />
            </span>
          </div>
        </Link>
        );
      })}
    </div>
  );
}

export function Eyebrow({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <span className="mono" style={style}>{children}</span>;
}

export function Crumbs({ items }: { items: [string, string?][] }) {
  return (
    <nav aria-label="Fil d’Ariane" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--graphite)' }}>
      {items.map(([label, to], i) => (
        <span key={label} style={{ display: 'flex', gap: 10 }}>
          {i > 0 && <span>/</span>}
          {to ? <Link to={to} style={{ color: 'var(--graphite)' }}>{label}</Link> : <span style={{ color: '#E2A75E' }}>{label}</span>}
        </span>
      ))}
    </nav>
  );
}
