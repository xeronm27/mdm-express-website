
// shared.js — injects nav, trust strip, page-specific sections, CTA strip, footer + FAQ toggle.
(function(){

  /* ── FAVICON ──────────────────────────────────────────────────── */
  (function(){
    if(document.querySelector('link[rel="icon"]')) return;
    const isAr = window.location.pathname.includes('/ar/');
    const path = isAr ? '../favicon.svg' : 'favicon.svg';
    const link = document.createElement('link');
    link.rel = 'icon'; link.type = 'image/svg+xml'; link.href = path;
    document.head.appendChild(link);
  })();

  /* ── SEO / GEO / AEO ─────────────────────────────────────────── */
  (function(){
    const BASE = 'https://mdm.express';
    const path = window.location.pathname;

    // Per-page meta config
    const PAGE_META = {
      '/':              { title:'MDM Express — COD E-Commerce Operations Platform | Libya, Iraq, Lebanon', desc:'MDM Express manages the full COD e-commerce operation for sellers in Libya, Iraq and Lebanon — sourcing, warehousing, order confirmation, delivery, and cash collection through one connected system.' },
      '/index':         { title:'MDM Express — COD E-Commerce Operations Platform | Libya, Iraq, Lebanon', desc:'MDM Express manages the full COD e-commerce operation for sellers in Libya, Iraq and Lebanon — sourcing, warehousing, order confirmation, delivery, and cash collection through one connected system.' },
      '/services':      { title:'Our Services — Sourcing, Fulfillment, Delivery & COD Collection | MDM Express', desc:'Explore MDM Express services: product sourcing, international shipping, warehousing, call center order confirmation, last-mile delivery, COD collection, and seller reporting.' },
      '/sourcing':      { title:'Product Sourcing from China & Dubai | MDM Express', desc:'Source products from China, Dubai and local suppliers through MDM Express. We handle supplier research, coordination, shipping, customs clearance, and import support for COD sellers.' },
      '/warehousing':   { title:'Warehousing & Order Fulfillment | MDM Express', desc:'Store and manage your inventory inside MDM warehouses. Track stock levels, order preparation, and fulfillment through one connected platform built for COD e-commerce.' },
      '/call-center':   { title:'Order Confirmation & Call Center | MDM Express', desc:'MDM Express confirms orders through local call center teams trained to verify customers, handle objections, follow up, and improve delivery success rates for COD sellers.' },
      '/delivery':      { title:'Last-Mile COD Delivery | Libya, Iraq & Lebanon | MDM Express', desc:'Nationwide COD delivery in Libya, Iraq and Lebanon. MDM tracks every order from dispatch to delivery and collects cash payments on your behalf.' },
      '/affiliate':     { title:'COD Dropshipping — Sell Without Holding Stock | MDM Express', desc:'Start dropshipping with MDM Express in Libya — no upfront stock required. Choose products, set your price, and MDM handles fulfillment, confirmation, delivery, and COD collection.' },
      '/marketplace':   { title:'Local Product Marketplace — Source Locally & Sell Fast | MDM Express', desc:'Source products from verified local suppliers through MDM Marketplace. Browse, request stock, and receive delivery — available now in Libya for registered MDM sellers.' },
      '/how-it-works':  { title:'How MDM Express Works — From Sourcing to Cash Collection', desc:'MDM Express manages the full e-commerce journey: account setup, product sourcing, warehousing, order confirmation, delivery, COD cash collection, and transparent seller payouts.' },
      '/features':      { title:'Seller Dashboard & Platform Features | MDM Express', desc:'MDM Express gives sellers full visibility over orders, stock levels, delivery status, confirmation rates, returns, and payout tracking from one dashboard.' },
      '/about':         { title:'About MDM Express — COD Logistics Partner in MENA', desc:'MDM Express is a full-service COD e-commerce operations partner for sellers in Libya, Iraq, and Lebanon — providing end-to-end logistics, fulfillment, and financial infrastructure.' },
      '/remittance':    { title:'COD Remittance & Seller Payouts | MDM Express', desc:'MDM Express collects COD payments on delivery and provides transparent settlement reporting so sellers always know what was delivered, collected, and when they will be paid.' },
      '/capital':       { title:'Sourcing Advance & Seller Financing | MDM Express', desc:'MDM Express offers sourcing advance to help sellers fund inventory purchases based on sales performance — no equity required, repaid from COD revenue.' },
    };

    // Match current page
    const slug = path.replace(/\/index\.html?$/, '/').replace(/\.html?$/, '') || '/';
    const meta = PAGE_META[slug] || PAGE_META['/'];

    // ── Canonical ──
    if(!document.querySelector('link[rel="canonical"]')){
      const can = document.createElement('link');
      can.rel = 'canonical';
      can.href = BASE + slug;
      document.head.appendChild(can);
    }

    // ── hreflang ──
    if(!document.querySelector('link[rel="alternate"]')){
      [['en', BASE + slug], ['ar', BASE + '/ar' + (slug === '/' ? '/' : slug)]].forEach(([lang, href]) => {
        const l = document.createElement('link');
        l.rel = 'alternate'; l.hreflang = lang; l.href = href;
        document.head.appendChild(l);
      });
    }

    // ── Meta description ──
    if(!document.querySelector('meta[name="description"]') && meta){
      const m = document.createElement('meta');
      m.name = 'description'; m.content = meta.desc;
      document.head.appendChild(m);
    }

    // ── Open Graph ──
    if(!document.querySelector('meta[property="og:title"]') && meta){
      const og = [
        ['og:type',        'website'],
        ['og:site_name',   'MDM Express'],
        ['og:title',       meta.title],
        ['og:description', meta.desc],
        ['og:url',         BASE + slug],
        ['og:image',       BASE + '/MAIN.svg'],
        ['og:locale',      'en_US'],
        ['og:locale:alternate', 'ar_LY'],
        ['twitter:card',   'summary_large_image'],
        ['twitter:title',  meta.title],
        ['twitter:description', meta.desc],
      ];
      og.forEach(([prop, content]) => {
        const t = document.createElement('meta');
        if(prop.startsWith('twitter:')) t.name = prop; else t.setAttribute('property', prop);
        t.content = content;
        document.head.appendChild(t);
      });
    }

    // ── Organization + WebSite JSON-LD (global) ──
    const orgSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': BASE + '/#organization',
          name: 'MDM Express',
          url: BASE,
          logo: { '@type': 'ImageObject', url: BASE + '/MAIN.svg' },
          description: 'MDM Express is a COD e-commerce operations platform providing sourcing, warehousing, order confirmation, last-mile delivery, cash collection, and seller reporting for sellers in Libya, Iraq, and Lebanon.',
          areaServed: ['Libya', 'Iraq', 'Lebanon'],
          knowsAbout: ['Cash on Delivery logistics', 'E-commerce fulfillment', 'Product sourcing', 'Last-mile delivery', 'Order confirmation call center', 'COD remittance'],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'MDM Express Services',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Product Sourcing', url: BASE + '/sourcing' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Warehousing & Fulfillment', url: BASE + '/warehousing' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Order Confirmation Call Center', url: BASE + '/call-center' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Last-Mile COD Delivery', url: BASE + '/delivery' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'COD Remittance & Payouts', url: BASE + '/remittance' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dropshipping', url: BASE + '/affiliate' } },
            ]
          },
          contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', availableLanguage: ['English', 'Arabic'] }
        },
        {
          '@type': 'WebSite',
          '@id': BASE + '/#website',
          url: BASE,
          name: 'MDM Express',
          publisher: { '@id': BASE + '/#organization' },
          inLanguage: ['en', 'ar']
        }
      ]
    };
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.text = JSON.stringify(orgSchema);
    document.head.appendChild(orgScript);

    // ── FAQPage JSON-LD (auto-extract from DOM) ──
    window.addEventListener('DOMContentLoaded', function(){
      const faqItems = document.querySelectorAll('.faq-item, .sv-faq-item');
      if(faqItems.length < 2) return;
      const entities = [];
      faqItems.forEach(item => {
        const qEl = item.querySelector('.faq-q, .sv-faq-q');
        const aEl = item.querySelector('.faq-a, .sv-faq-a');
        if(!qEl || !aEl) return;
        const q = qEl.childNodes[0] ? qEl.childNodes[0].textContent.trim() : qEl.textContent.trim();
        const a = aEl.textContent.trim();
        if(q && a) entities.push({ '@type':'Question', name: q, acceptedAnswer: { '@type':'Answer', text: a } });
      });
      if(entities.length < 2) return;
      const faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.text = JSON.stringify({ '@context':'https://schema.org', '@type':'FAQPage', mainEntity: entities });
      document.head.appendChild(faqScript);
    });

    // ── BreadcrumbList JSON-LD ──
    window.addEventListener('DOMContentLoaded', function(){
      if(slug === '/') return;
      const label = (document.title || '').split('|')[0].split('—')[0].trim();
      const bc = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type':'ListItem', position:1, name:'Home', item: BASE + '/' },
          { '@type':'ListItem', position:2, name: label, item: BASE + slug }
        ]
      };
      const bcScript = document.createElement('script');
      bcScript.type = 'application/ld+json';
      bcScript.text = JSON.stringify(bc);
      document.head.appendChild(bcScript);
    });

  })();
  const NAV_ITEMS = [
    {label:'Home',         href:'index.html',        key:'home'},
    {label:'Services',     href:'services.html',     key:'services'},
    {label:'How It Works', href:'how-it-works.html', key:'how'},
    {label:'Dropshipping', href:'affiliate.html',    key:'affiliate'},
    {label:'Marketplace',  href:'marketplace.html',  key:'marketplace'},
    {label:'Features',     href:'features.html',     key:'features'},
    {label:'About Us',     href:'about.html',        key:'about'}
  ];
  const active = document.body.dataset.page || '';

  /* ── SERVICES DROPDOWN ITEMS ──────────────────────────────── */
  const SERVICE_ITEMS = [
    {
      label: 'Sourcing', sub: '10,000+ products', href: 'sourcing.html',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
    },
    {
      label: 'Warehousing', sub: 'Libya & Iraq hubs', href: 'warehousing.html',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
    },
    {
      label: 'Call Centre', sub: '24/7 support', href: 'call-center.html',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`
    },
    {
      label: 'Delivery', sub: 'Next-day', href: 'delivery.html',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`
    },
    {
      label: 'Remittance', sub: 'Weekly payouts', href: 'remittance.html',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`
    },
    {
      label: 'Advance', sub: '$5M+ advanced', href: 'capital.html',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
    },
  ];

  const serviceDropdown = `
    <div class="nav-dd-panel">
      ${SERVICE_ITEMS.map(s => `
        <a href="${s.href}" class="nav-dd-item">
          <div class="nav-dd-icon">${s.icon}</div>
          <div class="nav-dd-text">
            <div class="nav-dd-name">${s.label}</div>
            <div class="nav-dd-sub">${s.sub}</div>
          </div>
        </a>`).join('')}
    </div>`;

  /* ── NAV ──────────────────────────────────────────────────── */
  const navLinksHtml = NAV_ITEMS.map(n => {
    if (n.key === 'services') {
      return `
        <div class="nav-drop-wrap${n.key === active ? ' active' : ''}">
          <a href="${n.href}" class="nav-drop-trigger${n.key === active ? ' active' : ''}">
            ${n.label}
            <svg class="nav-drop-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          ${serviceDropdown}
        </div>`;
    }
    return `<a href="${n.href}" class="${n.key === active ? 'active' : ''}">${n.label}</a>`;
  }).join('');

  const navHtml = `
    <header class="nav-bar">
      <nav class="nav">
        <a href="index.html" class="logo">
          <img src="MAIN.svg" alt="MDM Express" class="logo-svg">
        </a>
        <div class="nav-links" id="navLinks">
          ${navLinksHtml}
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <a href="https://app.mdm.express/en/auth/register" class="nav-cta">Get Started</a>
          <a href="ar/index.html" class="lang-switch" id="langSwitchAr" title="عربي">عربي</a>
          <button class="nav-hamburger" id="navHamburger" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <!-- mobile drawer -->
      <div class="nav-drawer" id="navDrawer" aria-hidden="true">
        <div class="nav-drawer-inner">
          <a href="index.html" class="${active==='home'?'active':''}">Home</a>
          <a href="affiliate.html" class="${active==='affiliate'?'active':''}">Dropshipping</a>
          <a href="marketplace.html" class="${active==='marketplace'?'active':''}">Marketplace</a>

          <!-- Services accordion -->
          <div class="mdr-services-wrap">
            <button class="mdr-services-btn" id="mdrServicesBtn">
              Services
              <svg class="mdr-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="mdr-services-list" id="mdrServicesList">
              ${SERVICE_ITEMS.map(s=>`
              <a href="${s.href}" class="mdr-service-item">
                <div class="mdr-service-icon">${s.icon}</div>
                <div>
                  <div class="mdr-service-name">${s.label}</div>
                  <div class="mdr-service-sub">${s.sub}</div>
                </div>
              </a>`).join('')}
            </div>
          </div>

          <a href="features.html" class="${active==='features'?'active':''}">Features</a>
          <a href="about.html" class="${active==='about'?'active':''}">About Us</a>
          <a href="how-it-works.html" class="${active==='how'?'active':''}">How it works</a>
          <a href="https://app.mdm.express/en/auth/register" class="mdr-cta">Get Started →</a>
        </div>
      </div>
    </header>`;

  /* ── TRUST STRIP (scrolling marquee, all pages) ────────────── */
  const trustItems = [
    '9,000+ Active Sellers',
    '$5M+ Advanced to Sellers',
    'Libya · Iraq · Lebanon',
    '8+ Years Experience',
    '24/7 Call Centre Support',
    'Next-Day Delivery',
    '10,000+ Products Ready',
    'MDM Express Since 2016',
    'No Equity Required',
    'Full-Stack Operations',
  ];
  const trustHtml = `
    <div class="trust-strip" aria-hidden="true">
      <div class="trust-marquee">
        ${trustItems.map(t=>`<span class="trust-item"><span class="ti-dot"></span>${t}</span>`).join('')}
        ${trustItems.map(t=>`<span class="trust-item"><span class="ti-dot"></span>${t}</span>`).join('')}
      </div>
    </div>`;

  /* ── STATS ACCENT BAND (home page only) ────────────────────── */
  const statsHtml = `
    <section class="stats-accent-band" aria-label="Key metrics">
      <div class="wrap">
        <div class="sab-grid">
          <div class="sab-item">
            <div class="sab-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="sab-num" data-target="9" data-prefix="" data-suffix="K+">0K+</div>
            <div class="sab-label">Active Sellers</div>
            <div class="sab-sub">Across Libya &amp; Iraq</div>
          </div>
          <div class="sab-item">
            <div class="sab-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div class="sab-num" data-target="30" data-prefix="$" data-suffix="M+">$0M+</div>
            <div class="sab-label">Advanced to Sellers</div>
            <div class="sab-sub">No equity required</div>
          </div>
          <div class="sab-item">
            <div class="sab-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <div class="sab-num" data-target="2" data-prefix="" data-suffix="+">0+</div>
            <div class="sab-label">Live Markets</div>
            <div class="sab-sub">More launching soon</div>
          </div>
          <div class="sab-item">
            <div class="sab-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="sab-num" data-target="98" data-prefix="" data-suffix="%">0%</div>
            <div class="sab-label">Confirmation Rate</div>
            <div class="sab-sub">Industry avg. is 60–70%</div>
          </div>
        </div>
      </div>
    </section>`;

  /* ── TESTIMONIALS (home page only) ─────────────────────────── */
  const testiHtml = `
    <section class="block alt">
      <div class="wrap">
        <div class="sec-head">
          <span class="sec-tag">Seller Stories</span>
          <h2 class="title">Trusted by Thousands of COD Operators</h2>
          <p class="sec-sub">Real results from sellers who scaled with MDM Express across Libya, Iraq, and Lebanon.</p>
        </div>
        <div class="testi-grid">
          <div class="testi-card">
            <p class="testi-quote">MDM Express transformed how I run my business. Their call center lifted my confirmation rate by 23% in the first month alone — I've never looked back.</p>
            <div class="testi-footer">
              <div class="testi-avatar">👤</div>
              <div>
                <div class="testi-name">Khalid Al-Rashid</div>
                <div class="testi-role">Electronics Seller · Tripoli</div>
              </div>
              <span class="testi-stat">+23% Conf. Rate</span>
            </div>
          </div>
          <div class="testi-card">
            <p class="testi-quote">I went from zero to 500 daily orders in 90 days. The sourcing team found winning products I couldn't source anywhere else at these margins.</p>
            <div class="testi-footer">
              <div class="testi-avatar">👤</div>
              <div>
                <div class="testi-name">Fatima Hassan</div>
                <div class="testi-role">Fashion Retailer · Baghdad</div>
              </div>
              <span class="testi-stat">500+ Daily Orders</span>
            </div>
          </div>
          <div class="testi-card">
            <p class="testi-quote">The Sourcing Advance gave me the inventory funding I needed to scale at the right moment. No equity lost — just pure growth fuel.</p>
            <div class="testi-footer">
              <div class="testi-avatar">👤</div>
              <div>
                <div class="testi-name">Omar Al-Sayed</div>
                <div class="testi-role">Multi-Category Seller · Beirut</div>
              </div>
              <span class="testi-stat">$120K Funded</span>
            </div>
          </div>
        </div>
      </div>
    </section>`;

  /* ── CTA STRIP ─────────────────────────────────────────────── */
  const ctaHtml = `
    <section class="cta-strip" id="cta">
      <div class="cta-tile t1">👟</div>
      <div class="cta-tile t2">🎧</div>
      <div class="cta-tile t3">🥤</div>
      <div class="cta-tile t4">☕</div>
      <div class="wrap">
        <h2>Ready to Sell?<br/>Your Journey Starts Here</h2>
        <a href="https://app.mdm.express/en/auth/register" class="btn-primary">Sign Up For Free</a>
        <div class="cta-note">No credit card required.</div>
      </div>
    </section>`;

  /* ── FOOTER ────────────────────────────────────────────────── */
  const footerHtml = `
    <footer>
      <div class="wrap">
        <div>
          <div class="brand">
            <img src="MAIN.svg" alt="MDM Express" class="footer-logo-svg">
          </div>
          <p style="font-size:13.5px;line-height:1.6;color:#A8A4BD">Your all-in-one logistics and eCommerce partner — sourcing, warehousing, shipping, remittance and advance financing, all in one place.</p>
          <div class="socials" style="margin-top:14px">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Instagram">ig</a>
          </div>
        </div>
        <div>
          <h5>Quick Links</h5>
          <ul>
            <li><a href="index.html" style="color:inherit">Home</a></li>
            <li><a href="about.html" style="color:inherit">About</a></li>
            <li><a href="services.html" style="color:inherit">Services</a></li>
            <li><a href="capital.html" style="color:inherit">Advance</a></li>
            <li><a href="how-it-works.html" style="color:inherit">How it works</a></li>
          </ul>
        </div>
        <div>
          <h5>Resources</h5>
          <ul>
            <li>Contact</li>
            <li>Help Center</li>
            <li>Blog</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div>
          <h5>Legal</h5>
          <ul>
            <li><a href="terms.html" style="color:inherit">Terms of Service</a></li>
            <li><a href="privacy.html" style="color:inherit">Privacy Policy</a></li>
            <li><a href="cookies.html" style="color:inherit">Cookie Policy</a></li>
          </ul>
        </div>
        <div>
          <h5>Support</h5>
          <ul>
            <li>support@mdmexpress.com</li>
            <li>Creative Tower, Dubai, UAE</li>
            <li>71–75 Shelton Street, London WC2H 9JQ</li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <span class="copy">© 2022–2025 MDM EXPRESS. All rights reserved.</span>
        <span class="copy">Made for entrepreneurs.</span>
      </div>
    </footer>`;

  /* ── INJECT: skip link (keyboard users — hidden until focused) */
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);

  /* ── INJECT: nav at very top of body ──────────────────────── */
  const navWrap = document.createElement('div');
  navWrap.innerHTML = navHtml;
  document.body.insertBefore(navWrap.firstElementChild, document.body.firstChild);

  /* ── Update language switcher to point to current page's Arabic version */
  (function(){
    const link = document.getElementById('langSwitchAr');
    if (!link) return;
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    link.href = 'ar/' + (currentFile === '' ? 'index.html' : currentFile);
  })();

  /* ── INJECT: trust strip after .hero ─────────────────────── */
  const hero = document.querySelector('section.hero');
  if (hero) {
    const trustWrap = document.createElement('div');
    trustWrap.innerHTML = trustHtml;
    hero.after(trustWrap.firstElementChild);
  }

  /* ── INJECT: CTA strip + footer at bottom ─────────────────── */
  if (!document.body.dataset.noCta) {
    const ctaWrap = document.createElement('div');
    ctaWrap.innerHTML = ctaHtml;
    document.body.appendChild(ctaWrap.firstElementChild);
  }
  const fWrap = document.createElement('div');
  fWrap.innerHTML = footerHtml;
  document.body.appendChild(fWrap.firstElementChild);

  /* ── SERVICES DROPDOWN — hover with delay so clicks register ── */
  (function(){
    const wrap = document.querySelector('.nav-drop-wrap');
    if (!wrap) return;
    let closeTimer;

    function open(){
      clearTimeout(closeTimer);
      wrap.classList.add('dd-open');
    }
    function close(){
      closeTimer = setTimeout(()=> wrap.classList.remove('dd-open'), 180);
    }

    wrap.addEventListener('mouseenter', open);
    wrap.addEventListener('mouseleave', close);

    // On mobile (no hover): chevron click toggles dropdown; link click navigates
    const trigger = wrap.querySelector('.nav-drop-trigger');
    const chevron = wrap.querySelector('.nav-drop-chevron');
    if (trigger && chevron) {
      chevron.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        wrap.classList.toggle('dd-open');
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e)=>{
      if (!wrap.contains(e.target)) wrap.classList.remove('dd-open');
    });
  })();

  /* ── MOBILE HAMBURGER ───────────────────────────────────────── */
  (function(){
    const btn    = document.getElementById('navHamburger');
    const drawer = document.getElementById('navDrawer');
    if (!btn || !drawer) return;

    function toggleMenu(force){
      const open = force !== undefined ? force : !drawer.classList.contains('open');
      drawer.classList.toggle('open', open);
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
      drawer.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    btn.addEventListener('click', () => toggleMenu());

    // Close when a drawer link is tapped
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => toggleMenu(false));
    });

    // Close on outside tap
    document.addEventListener('click', e => {
      const header = document.querySelector('.nav-bar');
      if (header && !header.contains(e.target)) toggleMenu(false);
    });

    // Wire Services accordion button
    const svcBtn  = document.getElementById('mdrServicesBtn');
    const svcList = document.getElementById('mdrServicesList');
    if (svcBtn && svcList) {
      svcBtn.addEventListener('click', () => {
        const open = svcBtn.classList.toggle('open');
        svcList.classList.toggle('open', open);
      });
    }
  })();

  /* ── FAQ TOGGLE ─────────────────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

})();
