
// shared.js — injects nav, trust strip, page-specific sections, CTA strip, footer + FAQ toggle.
(function(){
  const NAV_ITEMS = [
    {label:'Home',         href:'index.html',       key:'home'},
    {label:'Affiliate',    href:'affiliate.html',   key:'affiliate'},
    {label:'Services',     href:'services.html',    key:'services'},
    {label:'Features',     href:'features.html',    key:'features'},
    {label:'Capital',      href:'capital.html',     key:'capital'},
    {label:'About Us',     href:'about.html',       key:'about'},
    {label:'How it works', href:'how-it-works.html',key:'how'}
  ];
  const active = document.body.dataset.page || '';

  /* ── SERVICES DROPDOWN ITEMS ──────────────────────────────── */
  const SERVICE_ITEMS = [
    {
      label: 'Sourcing', sub: '10,000+ products', href: 'sourcing.html',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
    },
    {
      label: 'Warehousing', sub: 'GCC coverage', href: 'warehousing.html',
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
      label: 'Capital', sub: '$30M+ deployed', href: 'capital.html',
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
          <span class="logo-mark">MDM</span>
          <span>MDM&nbsp;EXPRESS</span>
        </a>
        <div class="nav-links">
          ${navLinksHtml}
        </div>
        <a href="index.html#cta" class="nav-cta">Get Started</a>
      </nav>
    </header>`;

  /* ── TRUST STRIP (scrolling marquee, all pages) ────────────── */
  const trustItems = [
    '9,000+ Active Sellers',
    '$30M+ Capital Deployed',
    'Saudi Arabia · UAE Coverage',
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
            <div class="sab-num" data-target="9" data-prefix="" data-suffix="K+">0K+</div>
            <div class="sab-label">Active Sellers</div>
          </div>
          <div class="sab-item">
            <div class="sab-num" data-target="30" data-prefix="$" data-suffix="M+">$0M+</div>
            <div class="sab-label">Capital Deployed</div>
          </div>
          <div class="sab-item">
            <div class="sab-num" data-target="2" data-prefix="" data-suffix="+">0+</div>
            <div class="sab-label">Live Markets</div>
          </div>
          <div class="sab-item">
            <div class="sab-num" data-target="98" data-prefix="" data-suffix="%">0%</div>
            <div class="sab-label">Confirmation Rate</div>
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
          <p class="sec-sub">Real results from sellers who scaled with MDM Express across Saudi Arabia and the UAE.</p>
        </div>
        <div class="testi-grid">
          <div class="testi-card">
            <p class="testi-quote">MDM Express transformed how I run my business. Their call center lifted my confirmation rate by 23% in the first month alone — I've never looked back.</p>
            <div class="testi-footer">
              <div class="testi-avatar">👤</div>
              <div>
                <div class="testi-name">Khalid Al-Rashid</div>
                <div class="testi-role">Electronics Seller · Riyadh</div>
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
                <div class="testi-role">Fashion Retailer · Dubai</div>
              </div>
              <span class="testi-stat">500+ Daily Orders</span>
            </div>
          </div>
          <div class="testi-card">
            <p class="testi-quote">The Capital program gave me the inventory funding I needed to scale campaigns at the right moment. No equity lost — just pure growth fuel.</p>
            <div class="testi-footer">
              <div class="testi-avatar">👤</div>
              <div>
                <div class="testi-name">Omar Al-Sayed</div>
                <div class="testi-role">Multi-Category Seller · Kuwait</div>
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
        <a href="#" class="btn-primary">Sign Up For Free</a>
        <div class="cta-note">No credit card required.</div>
      </div>
    </section>`;

  /* ── FOOTER ────────────────────────────────────────────────── */
  const footerHtml = `
    <footer>
      <div class="wrap">
        <div>
          <div class="brand">
            <span class="logo-mark">MDM</span>
            <span>MDM&nbsp;EXPRESS</span>
          </div>
          <p style="font-size:13.5px;line-height:1.6;color:#A8A4BD">Your all-in-one logistics and eCommerce partner — sourcing, warehousing, shipping, remittance and capital, all in one place.</p>
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
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
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

  /* ── INJECT: trust strip after .hero ─────────────────────── */
  const hero = document.querySelector('section.hero');
  if (hero) {
    const trustWrap = document.createElement('div');
    trustWrap.innerHTML = trustHtml;
    hero.after(trustWrap.firstElementChild);
  }

  /* ── INJECT: stats band + testimonials (home page only) ───── */
  if (active === 'home') {
    const reorderRoot = document.querySelector('[data-reorder]');
    if (reorderRoot) {
      // Stats band — after the reorder-root sections
      const sbWrap = document.createElement('div');
      sbWrap.innerHTML = statsHtml;
      reorderRoot.after(sbWrap.firstElementChild);

      // Testimonials — after the stats band
      const statsEl = document.querySelector('.stats-accent-band');
      if (statsEl) {
        const tWrap = document.createElement('div');
        tWrap.innerHTML = testiHtml;
        statsEl.after(tWrap.firstElementChild);
      }
    }
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

    // Also support click/tap for mobile
    const trigger = wrap.querySelector('.nav-drop-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e)=>{
        // If clicking the trigger itself (not a link inside it)
        if (e.target === trigger || e.target === wrap.querySelector('.nav-drop-chevron')) {
          e.preventDefault();
          wrap.classList.toggle('dd-open');
        }
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e)=>{
      if (!wrap.contains(e.target)) wrap.classList.remove('dd-open');
    });
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
