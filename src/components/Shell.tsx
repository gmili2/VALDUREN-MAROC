import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCatalog } from '../catalog';
import { WHATSAPP, fmt } from '../data';
import { useLayout } from '../layout';
import { PATHS, productPath, shopPath } from '../routes';
import { useStore } from '../store';
import { BagIcon, BottleIcon, ChatIcon, CloseIcon, MenuIcon, SearchIcon, ShieldIcon, TruckIcon, UserIcon } from './icons';

const NAV: { label: string; to: string; match: (path: string) => boolean; gold?: boolean }[] = [
  { label: 'Homme', to: shopPath('homme'), match: (p) => p === shopPath('homme') },
  { label: 'Femme', to: shopPath('femme'), match: (p) => p === shopPath('femme') },
  { label: 'Unisexe', to: shopPath('unisexe'), match: (p) => p === shopPath('unisexe') },
  { label: 'Coffrets', to: shopPath('coffrets'), match: (p) => p === shopPath('coffrets'), gold: true },
];

/** Logo Valduren (couronne, V et nom), doré, sur fond sombre. */
export function Logo({ h }: { h: number }) {
  return <img src="/logo.png" alt="Valduren" height={h} width={Math.round(h * 600 / 494)} style={{ display: 'block', flex: 'none' }} />;
}

function Brand({ h }: { h: number }) {
  return (
    <Link to="/" aria-label="Valduren — accueil" style={{ display: 'block', flex: 'none' }}>
      <Logo h={h} />
    </Link>
  );
}

export function TopBar() {
  const L = useLayout();
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: L.mobile ? 11 : 12, letterSpacing: L.mobile ? '.14em' : '.2em', padding: '10px 16px', textAlign: 'center', color: 'var(--muted)', borderBottom: '1px solid var(--line)' }}>
      {L.mobile ? 'ÉCHANTILLON 2 ML OFFERT · LIVRAISON MAROC' : 'ÉCHANTILLON 2 ML OFFERT À CHAQUE COMMANDE · LIVRAISON PARTOUT AU MAROC'}
    </div>
  );
}

function CartButton() {
  const { openDrawer, count } = useStore();
  return (
    <button className="icon-btn" onClick={openDrawer} aria-label={`Panier, ${count} article${count > 1 ? 's' : ''}`}>
      <BagIcon size={20} />
      <span className="badge-count">{count}</span>
    </button>
  );
}

export function Header() {
  const L = useLayout();
  const { pathname } = useLocation();
  const { openSearch, openMenu, menu } = useStore();
  const wrap: React.CSSProperties = { position: 'sticky', top: 0, zIndex: 40, background: '#0E0D0C', borderBottom: '1px solid var(--line)' };
  if (L.mobile) {
    return (
      <header style={wrap}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: 72, padding: '0 8px' }}>
          <div style={{ display: 'flex' }}>
            <button className="icon-btn" onClick={openMenu} aria-label="Menu" aria-expanded={menu} style={{ color: '#E2A75E' }}><MenuIcon size={22} /></button>
            <button className="icon-btn" onClick={openSearch} aria-label="Rechercher"><SearchIcon size={19} /></button>
          </div>
          <Brand h={56} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}><CartButton /></div>
        </div>
      </header>
    );
  }
  return (
    <header style={wrap}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '10px 24px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 16 }}>
        <nav aria-label="Catégories" style={{ display: 'flex', gap: 4 }}>
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} className={`nav-link${n.match(pathname) ? ' on' : ''}${n.gold ? ' gold' : ''}`}>{n.label}</Link>
          ))}
        </nav>
        <Brand h={78} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <button className="icon-btn" onClick={openSearch} aria-label="Rechercher"><SearchIcon size={20} /></button>
          <Link className="icon-btn" to={PATHS.account} aria-label="Mon compte"><UserIcon size={20} /></Link>
          <CartButton />
        </div>
      </div>
    </header>
  );
}

const FOOTER = [
  { t: 'BOUTIQUE', links: [['Homme', shopPath('homme')], ['Femme', shopPath('femme')], ['Unisexe', shopPath('unisexe')], ['Coffrets', shopPath('coffrets')], ['Toute la collection', shopPath('all')]] },
  { t: 'AIDE', links: [['Livraison & retours', PATHS.faq], ['Contact', PATHS.contact], ['Mon compte', PATHS.account]] },
  { t: 'LA MAISON', links: [['À propos', PATHS.about], ['Conditions générales', PATHS.cgv], ['Confidentialité', PATHS.privacy], ['Administration', PATHS.admin]] },
];

const REASSURE = [
  { icon: TruckIcon, t: 'Livraison soignée', d: '2 à 4 jours partout au Maroc' },
  { icon: BottleIcon, t: 'Échantillon offert', d: '2 ml avec chaque commande' },
  { icon: ShieldIcon, t: 'Paiement sécurisé', d: 'À la livraison ou par virement' },
  { icon: ChatIcon, t: 'Conseil parfum', d: WHATSAPP ? 'Sur WhatsApp' : 'Nous vous aidons à choisir' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const gold: React.CSSProperties = { fontSize: 12, fontWeight: 600, letterSpacing: '.22em', color: '#E2A75E' };
  return (
    <>
      <section aria-label="Nos engagements" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 32, textAlign: 'center' }}>
          {REASSURE.map(({ icon: Icon, t, d }) => (
            <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Icon color="#E2A75E" size={24} />
              <span style={{ fontFamily: 'var(--display-font)', fontSize: 20 }}>{t}</span>
              <span style={{ fontSize: 13, color: 'var(--graphite)' }}>{d}</span>
            </div>
          ))}
        </div>
      </section>
      <section aria-label="Newsletter" style={{ borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '72px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 46px)' }}>Entrez dans la maison Valduren</h2>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 300, color: 'var(--muted)' }}>Nouveautés, éditions limitées et offres réservées.</p>
          {subscribed ? (
            <p style={{ margin: '8px 0 0', fontSize: 15, color: '#E2A75E' }}>Merci, vous êtes inscrit·e. À très vite.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (/^\S+@\S+\.\S+$/.test(email)) setSubscribed(true); }} style={{ width: '100%', display: 'flex', flexWrap: 'wrap', marginTop: 12 }}>
              <label htmlFor="vd-email" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Votre e-mail</label>
              <input id="vd-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com"
                style={{ flex: '1 1 240px', minWidth: 0, height: 54, border: '1px solid #3A3024', borderRight: 0, background: '#17140F', color: 'var(--ink)', fontSize: 15, padding: '0 18px', outline: 'none' }} />
              <button type="submit" className="btn btn-primary" style={{ flex: '0 0 auto', height: 54 }}>S’inscrire</button>
            </form>
          )}
        </div>
      </section>
      <footer style={{ background: '#090807' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '56px 24px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 32 }}>
          <Link to="/" aria-label="Valduren — accueil"><Logo h={110} /></Link>
          {FOOTER.map((g) => (
            <nav key={g.t} aria-label={g.t} style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15 }}>
              <span style={gold}>{g.t}</span>
              {g.links.map(([label, to]) => <Link key={label} to={to}>{label}</Link>)}
            </nav>
          ))}
        </div>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ margin: 0, padding: '20px 0 28px', borderTop: '1px solid var(--line)', fontSize: 13, color: 'var(--graphite)' }}>© {new Date().getFullYear()} Valduren. Tous droits réservés. · Paiement à la livraison ou par virement</p>
        </div>
      </footer>
    </>
  );
}

function QtyStepper({ qty, onDec, onInc, h = 36 }: { qty: number; onDec: () => void; onInc: () => void; h?: number }) {
  const b: React.CSSProperties = { width: h - 2, height: h - 2, border: 0, background: 'none', cursor: 'pointer', fontSize: 16 };
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: h, border: '1px solid var(--line-strong)', background: 'transparent' }}>
      <button style={b} onClick={onDec} aria-label="Diminuer la quantité">−</button>
      <span style={{ minWidth: 16, textAlign: 'center', fontSize: 13.5 }}>{qty}</span>
      <button style={b} onClick={onInc} aria-label="Augmenter la quantité">+</button>
    </div>
  );
}
export { QtyStepper };

export function Overlays() {
  const L = useLayout();
  const navigate = useNavigate();
  const s = useStore();
  const anyOverlay = s.drawer || s.search;

  // Recherche
  const [q, setQ] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (s.search) setTimeout(() => searchRef.current?.focus(), 250); }, [s.search]);
  const { products } = useCatalog();
  const query = q.trim().toLowerCase();
  const results = useMemo(
    () => (query
      ? products.filter((p) => `${p.name} ${p.brand} ${p.col} ${p.kind} ${p.sku} ${p.swatches.map((x) => x.label).join(' ')}`.toLowerCase().includes(query))
      : products.slice(0, 4)),
    [query, products],
  );

  const go = (to: string) => { s.closeAll(); navigate(to); };

  return (
    <>
      <div
        onClick={s.closeAll}
        style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,.6)', opacity: anyOverlay ? 1 : 0, pointerEvents: anyOverlay ? 'auto' : 'none', transition: 'opacity .5s ease' }}
      />

      {/* Panier latéral */}
      <aside
        aria-label="Panier" aria-hidden={!s.drawer}
        style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 70, width: 'min(440px,100vw)', background: 'var(--ivory)', display: 'flex', flexDirection: 'column', transform: s.drawer ? 'translateX(0)' : 'translateX(105%)', transition: 'transform .6s var(--ease)', boxShadow: '-20px 0 60px rgba(0,0,0,.5)', borderLeft: '1px solid var(--line)', visibility: s.drawer ? 'visible' : 'hidden', transitionProperty: 'transform, visibility' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--line)' }}>
          <span className="display" style={{ fontSize: 30 }}>Votre panier ({s.count})</span>
          <button className="icon-btn" onClick={s.closeAll} aria-label="Fermer"><CloseIcon /></button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
          {s.count === 0 && <p style={{ margin: '32px 0', fontSize: 15, color: 'var(--muted)' }}>Votre panier est vide.</p>}
          {s.items.map((l) => {
            const p = l.product;
            return (
              <div key={l.key} style={{ display: 'grid', gridTemplateColumns: '76px minmax(0,1fr)', gap: 16, padding: '20px 0', borderBottom: '1px solid var(--line)' }}>
                <button className="ph" onClick={() => go(productPath(p.id))} aria-label={p.name} style={{ aspectRatio: '1', border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  {l.image
                    ? <img src={l.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <BottleIcon color="#E2A75E" size={30} />}
                </button>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <span style={{ fontFamily: 'var(--display-font)', fontSize: 17 }}>{p.name}</span>
                      {l.label && <span style={{ fontSize: 12.5, color: 'var(--graphite)' }}>{l.label}</span>}
                    </span>
                    <span style={{ fontSize: 14, whiteSpace: 'nowrap' }}>{fmt(l.unit * l.qty)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <QtyStepper qty={l.qty} onDec={() => s.setQty(l.key, -1)} onInc={() => s.setQty(l.key, 1)} />
                    <button onClick={() => s.remove(l.key)} style={{ background: 'none', border: 0, borderBottom: '1px solid var(--faint)', padding: '1px 0', cursor: 'pointer', fontSize: 12, color: 'var(--muted)' }}>Retirer</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ padding: '20px 24px 24px', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--paper)' }}>
          {s.qtyDiscount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><span>{s.qtyLabel}</span><span>−{fmt(s.qtyDiscount)}</span></div>}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 14 }}>{s.qtyDiscount > 0 ? 'Total' : 'Sous-total'} · livraison incluse</span>
            <span style={{ fontStretch: '110%', fontSize: 20, fontWeight: 500 }}>{fmt(s.subtotal - s.qtyDiscount)}</span>
          </div>
          {s.nextTier && <span style={{ fontSize: 13, padding: '10px 12px', background: 'rgba(226,167,94,.12)', border: '1px solid #5A4A34', color: 'var(--ink)', lineHeight: 1.4 }}>Ajoutez {s.nextTier.missing} {s.nextTier.productName ?? `article${s.nextTier.missing > 1 ? 's' : ''}`} et économisez <strong>{fmt(s.nextTier.amount)}</strong> sur votre commande.</span>}
          <button className="btn btn-primary" disabled={s.count === 0} onClick={() => go(PATHS.checkout)} style={{ opacity: s.count === 0 ? 0.4 : 1 }}>Commander</button>
          <button className="btn btn-outline" style={{ height: 50 }} onClick={() => go(PATHS.cart)}>Voir le panier</button>
        </div>
      </aside>

      {/* Menu mobile */}
      <div
        aria-hidden={!s.menu}
        style={{ position: 'fixed', inset: 0, zIndex: 80, background: '#0E0D0C', color: '#F1E9DC', display: 'flex', flexDirection: 'column', padding: '10px 20px 32px', opacity: s.menu ? 1 : 0, pointerEvents: s.menu ? 'auto' : 'none', transition: 'opacity .35s ease', visibility: s.menu ? 'visible' : 'hidden', overflowY: 'auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64, borderBottom: '1px solid #2B241B', paddingBottom: 8 }}>
          <Logo h={54} />
          <button className="icon-btn" onClick={s.closeAll} aria-label="Fermer le menu" style={{ background: 'transparent', marginRight: -10 }}><CloseIcon color="#E2A75E" size={22} /></button>
        </div>
        <nav aria-label="Menu mobile" style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          {[...NAV, { label: 'Toute la collection', to: shopPath('all'), gold: false }].map((n) => (
            <button key={n.label} onClick={() => go(n.to)} style={{ display: 'block', padding: '14px 0', background: 'none', border: 0, borderBottom: '1px solid #2B241B', color: n.gold ? '#E2A75E' : '#F1E9DC', cursor: 'pointer', fontFamily: 'var(--display-font)', fontSize: 28, lineHeight: 1.15, textAlign: 'left' }}>
              {n.label}
            </button>
          ))}
          <button onClick={() => go(PATHS.account)} style={{ textAlign: 'left', background: 'none', border: 0, color: '#C9BBA5', fontSize: 13, letterSpacing: '.2em', padding: '18px 0 0', cursor: 'pointer' }}>MON COMPTE →</button>
        </nav>
        <button className="btn btn-primary" style={{ marginTop: 'auto', height: 54 }} onClick={() => go(PATHS.cart)}>Panier ({s.count})</button>
      </div>

      {/* Recherche */}
      <div
        role="search" aria-hidden={!s.search}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 75, background: 'var(--ivory)', borderBottom: '1px solid var(--line)', padding: `20px ${L.px} 28px`, transform: s.search ? 'translateY(0)' : 'translateY(-105%)', transition: 'transform .55s var(--ease)', visibility: s.search ? 'visible' : 'hidden', transitionProperty: 'transform, visibility' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderBottom: '1px solid var(--ink)', paddingBottom: 10 }}>
          <SearchIcon size={22} />
          <input
            ref={searchRef} value={q} onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && results[0]) go(productPath(results[0].id)); }}
            placeholder="Rechercher un parfum, une maison…" aria-label="Rechercher"
            style={{ flex: 1, minWidth: 0, height: 48, border: 0, background: 'transparent', fontSize: L.searchFs, fontStretch: '110%', outline: 'none', color: 'var(--ink)' }}
          />
          <button className="icon-btn" onClick={s.closeAll} aria-label="Fermer"><CloseIcon /></button>
        </div>
        <span className="mono" style={{ display: 'block', marginTop: 18, fontSize: 10.5, letterSpacing: '.14em' }}>
          {query ? `${results.length} résultat${results.length > 1 ? 's' : ''}` : 'Les plus recherchés'}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          {results.map((p) => (
            <button
              key={p.id} onClick={() => go(productPath(p.id))}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '14px 0', background: 'none', border: 0, borderBottom: '1px solid var(--line)', cursor: 'pointer', textAlign: 'left', transition: 'padding .3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '8px')}
              onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '0')}
            >
              <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: 'var(--display-font)', fontSize: 19 }}>{p.name}</span>
                <span style={{ fontSize: 12.5, color: 'var(--graphite)' }}>{p.brand} · {p.kind}</span>
              </span>
              <span style={{ fontSize: 14 }}>{p.hasRange ? 'dès ' : ''}{fmt(p.price)}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
