/* ================================================================
   MDM Express — Universal Animation Layer v2
   Tech   : GSAP 3 + ScrollTrigger
   Scope  : All 12 pages — element-safe (null checks everywhere)
   Rule   : Animate ONLY transform & opacity → guaranteed 60 fps
   A11y   : Full prefers-reduced-motion guard at the top
   ================================================================ */

(function () {
  'use strict';

  /* ── Accessibility gate ────────────────────────────────────── */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ── Helper: safely query one element ─────────────────────── */
  const $ = sel => document.querySelector(sel);
  const $$ = sel => gsap.utils.toArray(sel);

  function init() {
    gsap.registerPlugin(ScrollTrigger);

    /* ============================================================
       1. NAV BAR — slide down on load
    ============================================================ */
    const nav = $('.nav-bar');
    if (nav) {
      gsap.from(nav, {
        y: -64, opacity: 0, duration: 0.75,
        ease: 'power2.out', delay: 0.05,
        clearProps: 'transform,opacity',
      });
    }

    /* ============================================================
       2. HERO INNER — stagger fade-up (eyebrow → h1 → sub → CTA)
    ============================================================ */
    const heroInner = $('.hero-inner');
    if (heroInner) {
      gsap.from(Array.from(heroInner.children), {
        y: 38, opacity: 0, duration: 0.95,
        stagger: 0.14, ease: 'power2.out', delay: 0.25,
        clearProps: 'transform,opacity',
      });
    }

    /* ============================================================
       3. HERO FLOATING SKU CARDS (index.html only)
          GSAP 3 reads & decomposes existing CSS rotate() and
          adds y-translation on top — preserving each card's tilt.
    ============================================================ */
    [
      { sel: '.fc-1',      y: 15, dur: 3.2, d: 0.00 },
      { sel: '.fc-2',      y: 11, dur: 2.9, d: 0.55 },
      { sel: '.fc-3',      y: 17, dur: 3.6, d: 0.90 },
      { sel: '.fc-4',      y: 13, dur: 2.7, d: 0.20 },
      { sel: '.fc-5',      y: 15, dur: 3.1, d: 0.70 },
      { sel: '.fc-stat',   y:  8, dur: 2.5, d: 0.40 },
      { sel: '.fc-flag-1', y:  7, dur: 2.3, d: 0.60 },
      { sel: '.fc-flag-2', y:  7, dur: 2.6, d: 0.10 },
    ].forEach(({ sel, y, dur, d }) => {
      const el = $(sel);
      if (el) gsap.to(el, { y, duration: dur, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: d });
    });

    /* ============================================================
       4. CTA STRIP TILES FLOAT (injected by shared.js, all pages)
    ============================================================ */
    [
      { sel: '.cta-tile.t1', y: 12, dur: 3.1, d: 0.0 },
      { sel: '.cta-tile.t2', y: 10, dur: 2.8, d: 0.3 },
      { sel: '.cta-tile.t3', y: 14, dur: 3.5, d: 0.6 },
      { sel: '.cta-tile.t4', y:  9, dur: 2.6, d: 0.9 },
    ].forEach(({ sel, y, dur, d }) => {
      const el = $(sel);
      if (el) gsap.to(el, { y, duration: dur, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: d });
    });

    /* ============================================================
       5. TRUST STRIP — fade down from top after hero loads
    ============================================================ */
    const trustStrip = $('.trust-strip');
    if (trustStrip) {
      gsap.from(trustStrip, {
        opacity: 0, y: -16, duration: 0.55,
        ease: 'power2.out', delay: 0.9,
        clearProps: 'transform,opacity',
      });
    }

    /* ============================================================
       6. SECTION HEADERS — scroll reveal fade + slide up
    ============================================================ */
    $$('.sec-head').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 87%', once: true },
        y: 44, opacity: 0, duration: 0.88,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });
    });

    /* ============================================================
       7. DASHBOARD VIS PANEL — slide from left
    ============================================================ */
    const vis = $('.stat-band .vis');
    if (vis) {
      gsap.from(vis, {
        scrollTrigger: { trigger: vis, start: 'top 84%', once: true },
        x: -56, opacity: 0, duration: 0.94,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });
    }

    /* ============================================================
       8. BAR CHART — scaleY grow from bottom (60fps: transform only)
    ============================================================ */
    const bars = document.querySelectorAll('.bar');
    if (bars.length) {
      bars.forEach(b => (b.style.transformOrigin = 'bottom'));
      gsap.set(bars, { scaleY: 0, opacity: 0.35 });
      ScrollTrigger.create({
        trigger: '.bar-row', start: 'top 84%', once: true,
        onEnter: () => gsap.to(bars, {
          scaleY: 1, opacity: 1, duration: 0.94,
          ease: 'power3.out', stagger: 0.09,
        }),
      });
    }

    /* ============================================================
       9. REVENUE COUNTER — $0 → $23,453 (stat-band vis panel)
    ============================================================ */
    const revenueEl = $('.stat-band .vis .stat-amount');
    if (revenueEl) {
      const raw    = revenueEl.textContent.trim();
      const target = parseFloat(raw.replace(/[^0-9.]/g, ''));
      if (!isNaN(target)) {
        const obj = { v: 0 };
        revenueEl.textContent = '$0';
        ScrollTrigger.create({
          trigger: revenueEl, start: 'top 84%', once: true,
          onEnter: () => gsap.to(obj, {
            v: target, duration: 1.9, ease: 'power2.out',
            onUpdate()  { revenueEl.textContent = '$' + Math.round(obj.v).toLocaleString('en-US'); },
            onComplete(){ revenueEl.textContent = raw; },
          }),
        });
      }
    }

    /* ============================================================
       10. ABOUT PAGE STAT COUNTERS (9K+, 8+, 2+, 9+)
           Targets .stat-amount elements NOT inside .stat-band .vis
    ============================================================ */
    document.querySelectorAll('.stat-band .stat-amount').forEach(el => {
      if (el.closest('.vis')) return; // skip revenue (handled above)
      const raw     = el.textContent.trim();          // "9K+"
      const numPart = parseFloat(raw.replace(/[^0-9.]/g, ''));
      const suffix  = raw.replace(/[0-9.]/g, '');    // "K+" or "+"
      if (isNaN(numPart)) return;
      const obj = { v: 0 };
      el.textContent = '0' + suffix;
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => gsap.to(obj, {
          v: numPart, duration: 1.6, ease: 'power2.out',
          onUpdate()  { el.textContent = Math.round(obj.v) + suffix; },
          onComplete(){ el.textContent = raw; },
        }),
      });
    });

    /* ============================================================
       11. STATS ACCENT BAND — no GSAP interference, inline styles used
    ============================================================ */

    /* ============================================================
       12. STAT CELLS — stagger reveal (dashboard cards)
    ============================================================ */
    const statCells = $$('.stat-cell');
    if (statCells.length) {
      gsap.set(statCells, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: statCells[0].closest('.stat-grid, .stat-band') || statCells[0],
        start: 'top 84%', once: true,
        onEnter: () => gsap.to(statCells, {
          opacity: 1, y: 0, duration: 0.68, stagger: 0.13,
          ease: 'power2.out', clearProps: 'transform,opacity',
        }),
      });
    }

    /* ============================================================
       13. STEPS — stagger slide up
    ============================================================ */
    const steps = $$('.step');
    if (steps.length) {
      gsap.set(steps, { opacity: 0, y: 54 });
      const stepsParent = steps[0].closest('.steps') || steps[0].parentElement;
      ScrollTrigger.create({
        trigger: stepsParent, start: 'top 83%', once: true,
        onEnter: () => gsap.to(steps, {
          opacity: 1, y: 0, duration: 0.78, stagger: 0.18,
          ease: 'power2.out', clearProps: 'transform,opacity',
        }),
      });
    }

    /* ============================================================
       14. CHIP FUND BADGE — spring pop on scroll
    ============================================================ */
    const chipFund = $('.chip-fund');
    if (chipFund) {
      gsap.from(chipFund, {
        scrollTrigger: { trigger: chipFund, start: 'top 86%', once: true },
        scale: 0, opacity: 0, duration: 0.65,
        ease: 'back.out(2.8)',
        clearProps: 'transform,opacity',
      });
    }

    /* ============================================================
       15. FEATURE CARDS — stagger fade + slide up
           clearProps restores CSS hover (translateY + box-shadow)
    ============================================================ */
    const feats = $$('.feat');
    if (feats.length) {
      gsap.set(feats, { opacity: 0, y: 48 });
      const featParent = feats[0].closest('.feat-grid') || feats[0].parentElement;
      ScrollTrigger.create({
        trigger: featParent, start: 'top 83%', once: true,
        onEnter: () => gsap.to(feats, {
          opacity: 1, y: 0, duration: 0.66, stagger: 0.055,
          ease: 'power2.out', clearProps: 'transform,opacity',
        }),
      });
    }

    /* ============================================================
       16. TEAM CARDS (about.html) — scale-up spring stagger
    ============================================================ */
    const teamFeats = document.querySelectorAll('.feat[style*="text-align:center"]');
    if (teamFeats.length) {
      // already handled by feat stagger above — add extra scale pop
      teamFeats.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          scale: 0.88, opacity: 0, duration: 0.7,
          delay: i * 0.12, ease: 'back.out(1.8)',
          clearProps: 'transform,opacity',
        });
      });
    }

    /* ============================================================
       17. CATEGORY TAGS — spring scale-in stagger
    ============================================================ */
    const cats = $$('.cat');
    if (cats.length) {
      gsap.set(cats, { opacity: 0, scale: 0.82 });
      ScrollTrigger.create({
        trigger: '.cats', start: 'top 86%', once: true,
        onEnter: () => gsap.to(cats, {
          opacity: 1, scale: 1, duration: 0.46, stagger: 0.05,
          ease: 'back.out(1.5)', clearProps: 'transform,opacity',
        }),
      });
    }

    /* ============================================================
       18. TESTIMONIAL CARDS — stagger scale + fade up
    ============================================================ */
    const testiCards = $$('.testi-card');
    if (testiCards.length) {
      gsap.set(testiCards, { opacity: 0, y: 52, scale: 0.96 });
      ScrollTrigger.create({
        trigger: '.testi-grid', start: 'top 83%', once: true,
        onEnter: () => gsap.to(testiCards, {
          opacity: 1, y: 0, scale: 1, duration: 0.74, stagger: 0.15,
          ease: 'power2.out', clearProps: 'transform,opacity',
        }),
      });
    }

    /* ============================================================
       19. FAQ SIDE PANEL — slide from left
    ============================================================ */
    const faqSide = $('.faq-side');
    if (faqSide) {
      gsap.from(faqSide, {
        scrollTrigger: { trigger: faqSide, start: 'top 85%', once: true },
        x: -36, opacity: 0, duration: 0.84,
        ease: 'power2.out', clearProps: 'transform,opacity',
      });
    }

    /* ============================================================
       20. FAQ ITEMS — stagger from right
    ============================================================ */
    const faqItems = $$('.faq-item');
    if (faqItems.length) {
      gsap.set(faqItems, { opacity: 0, x: 26 });
      ScrollTrigger.create({
        trigger: '.faq-list', start: 'top 85%', once: true,
        onEnter: () => gsap.to(faqItems, {
          opacity: 1, x: 0, duration: 0.58, stagger: 0.1,
          ease: 'power2.out', clearProps: 'transform,opacity',
        }),
      });
    }

    /* ============================================================
       21. CTA STRIP CONTENT — stagger fade up
    ============================================================ */
    const ctaWrap = $('.cta-strip .wrap');
    if (ctaWrap) {
      gsap.from(Array.from(ctaWrap.children), {
        scrollTrigger: { trigger: ctaWrap, start: 'top 85%', once: true },
        y: 34, opacity: 0, duration: 0.74, stagger: 0.13,
        ease: 'power2.out', clearProps: 'transform,opacity',
      });
    }

    /* ============================================================
       22. PERFORMANCE SECTION — dark dashboard (capital.html)
    ============================================================ */

    // Chart panel — slide from left on scroll
    const perfPanel = $('.perf-chart-panel');
    if (perfPanel) {
      gsap.from(perfPanel, {
        scrollTrigger: { trigger: perfPanel, start: 'top 82%', once: true },
        x: -48, opacity: 0, duration: 0.92,
        ease: 'power2.out', clearProps: 'transform,opacity',
      });
    }

    // Revenue counter (perf section)
    const perfRevEl = $('.perf-rev-amount');
    if (perfRevEl) {
      const target = parseFloat(perfRevEl.dataset.target || '0');
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: perfRevEl, start: 'top 85%', once: true,
        onEnter: () => gsap.to(obj, {
          v: target, duration: 2.1, ease: 'power2.out',
          onUpdate()  { perfRevEl.textContent = '$' + Math.round(obj.v).toLocaleString('en-US'); },
          onComplete(){ perfRevEl.textContent = '$23,453'; },
        }),
      });
    }

    // KPI chips — stagger pop in
    const perfKpis = $$('.perf-kpi');
    if (perfKpis.length) {
      gsap.set(perfKpis, { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: '.perf-kpis', start: 'top 85%', once: true,
        onEnter: () => gsap.to(perfKpis, {
          opacity: 1, y: 0, duration: 0.55, stagger: 0.12,
          ease: 'power2.out', clearProps: 'transform,opacity',
        }),
      });
    }

    // Bar chart — scaleY grow from bottom
    const perfBars = document.querySelectorAll('.perf-bar');
    if (perfBars.length) {
      perfBars.forEach(b => (b.style.transformOrigin = 'bottom'));
      gsap.set(perfBars, { scaleY: 0, opacity: 0 });
      ScrollTrigger.create({
        trigger: '.perf-bars', start: 'top 82%', once: true,
        onEnter: () => gsap.to(perfBars, {
          scaleY: 1, opacity: 1, duration: 1.0,
          ease: 'power3.out', stagger: 0.09,
        }),
      });
    }

    // Benefit cards — stagger fade + slide up
    const perfCards = $$('.perf-benefit-card');
    if (perfCards.length) {
      gsap.set(perfCards, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: '.perf-benefit-grid', start: 'top 83%', once: true,
        onEnter: () => gsap.to(perfCards, {
          opacity: 1, y: 0, duration: 0.68, stagger: 0.12,
          ease: 'power2.out', clearProps: 'transform,opacity',
        }),
      });
    }

    /* ============================================================
       23. HOME PAGE — Services strip chips
    ============================================================ */
    const svcChips = $$('.svc-chip');
    if (svcChips.length) {
      gsap.set(svcChips, { opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: '.svc-strip-section', start: 'top 88%', once: true,
        onEnter: () => gsap.to(svcChips, {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.07,
          ease: 'power2.out', clearProps: 'transform,opacity',
        }),
      });
    }

    /* ============================================================
       24. HOME PAGE — HIW visual cards + text
    ============================================================ */
    $$('.hiw-card').forEach((card, i) => {
      const row = card.closest('.hiw-row');
      const isRev = row && row.classList.contains('hiw-row-rev');
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 84%', once: true },
        x: isRev ? -48 : 48, opacity: 0, duration: 0.9,
        ease: 'power2.out', delay: 0.1, clearProps: 'transform,opacity',
      });
    });
    $$('.hiw-text').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        y: 30, opacity: 0, duration: 0.8,
        ease: 'power2.out', clearProps: 'transform,opacity',
      });
    });

    /* ============================================================
       25. HOME PAGE — Bento grid stagger
    ============================================================ */
    const bentoCards = $$('.bento-card');
    if (bentoCards.length) {
      gsap.set(bentoCards, { opacity: 0, y: 44 });
      ScrollTrigger.create({
        trigger: '.bento-grid', start: 'top 83%', once: true,
        onEnter: () => gsap.to(bentoCards, {
          opacity: 1, y: 0, duration: 0.68, stagger: 0.08,
          ease: 'power2.out', clearProps: 'transform,opacity',
        }),
      });
    }

    /* ============================================================
       25b. HOME PAGE — Six-to-One strip animation
    ============================================================ */
    const solSvcs = $$('.sol-svc');
    const solOne  = document.querySelector('.sol-one');
    const solSub  = document.querySelector('.sol-sub');
    if (solSvcs.length) {
      gsap.set(solSvcs, { opacity: 0, y: 18 });
      if (solOne) gsap.set([solOne, solSub], { opacity: 0, scale: 0.92 });
      ScrollTrigger.create({
        trigger: '.six-one-strip', start: 'top 84%', once: true,
        onEnter: () => {
          gsap.to(solSvcs, { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power2.out' });
          if (solOne) gsap.to([solOne, solSub], { opacity: 1, scale: 1, duration: 0.7, delay: 0.45, stagger: 0.1, ease: 'back.out(1.6)' });
        },
      });
    }

    /* ============================================================
       26. HOME PAGE — Market chips + catalog cards stagger
    ============================================================ */
    const marketChips = $$('.market-chip');
    if (marketChips.length) {
      gsap.set(marketChips, { opacity: 0, scale: 0.88 });
      ScrollTrigger.create({
        trigger: '.market-chips', start: 'top 86%', once: true,
        onEnter: () => gsap.to(marketChips, {
          opacity: 1, scale: 1, duration: 0.44, stagger: 0.06,
          ease: 'back.out(1.4)', clearProps: 'transform,opacity',
        }),
      });
    }
    const catalogCards = $$('.catalog-card');
    if (catalogCards.length) {
      gsap.set(catalogCards, { opacity: 0, y: 24 });
      ScrollTrigger.create({
        trigger: '.catalog-grid', start: 'top 84%', once: true,
        onEnter: () => gsap.to(catalogCards, {
          opacity: 1, y: 0, duration: 0.46, stagger: 0.055,
          ease: 'power2.out', clearProps: 'transform,opacity',
        }),
      });
    }

    /* ============================================================
       27. HOME PAGE — Platform stat cards + progress bars
    ============================================================ */
    const pscCards = $$('.psc-card');
    if (pscCards.length) {
      gsap.set(pscCards, { opacity: 0, x: -32 });
      ScrollTrigger.create({
        trigger: '.platform-stats-col', start: 'top 83%', once: true,
        onEnter: () => gsap.to(pscCards, {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.13,
          ease: 'power2.out', clearProps: 'transform,opacity',
        }),
      });
    }
    // Progress bar fills — scaleX from 0→1 (transform-origin: left)
    document.querySelectorAll('.psc-fill').forEach(fill => {
      ScrollTrigger.create({
        trigger: fill, start: 'top 88%', once: true,
        onEnter: () => gsap.to(fill, {
          scaleX: 1, duration: 1.2, ease: 'power2.out',
        }),
      });
    });
    // Stat counters — platform cards (.psc-num) and stats accent band (.sab-num)
    document.querySelectorAll('.psc-num, .sab-num').forEach(el => {
      const target = parseFloat(el.dataset.target || '0');
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      if (isNaN(target)) return;
      const obj = { v: 0 };
      el.textContent = prefix + '0' + suffix;
      ScrollTrigger.create({
        trigger: el, start: 'top 86%', once: true,
        onEnter: () => gsap.to(obj, {
          v: target, duration: 1.6, ease: 'power2.out',
          onUpdate()  { el.textContent = prefix + Math.round(obj.v) + suffix; },
          onComplete(){ el.textContent = prefix + target + suffix; },
        }),
      });
    });
    // Stats accent band — fade-up reveal on scroll
    const sabItems = $$('.sab-item');
    if (sabItems.length) {
      gsap.set(sabItems, { opacity: 0, y: 24 });
      ScrollTrigger.create({
        trigger: '.stats-accent-band', start: 'top 84%', once: true,
        onEnter: () => gsap.to(sabItems, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' }),
      });
    }
    // Testimonial cards — fade-up reveal
    const testiCards = $$('.testi-card');
    if (testiCards.length) {
      gsap.set(testiCards, { opacity: 0, y: 32 });
      ScrollTrigger.create({
        trigger: '.testi-grid', start: 'top 84%', once: true,
        onEnter: () => gsap.to(testiCards, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' }),
      });
    }

    /* ============================================================
       28. FEATURES PAGE — fv-cards scroll reveal
    ============================================================ */
    // fc-grid (simple version fallback)
    const fcCards = $$('.fc-card');
    if (fcCards.length) {
      gsap.set(fcCards, { opacity: 0, y: 40, scale: 0.97 });
      ScrollTrigger.create({
        trigger: '.fc-grid', start: 'top 83%', once: true,
        onEnter: () => gsap.to(fcCards, {
          opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.065,
          ease: 'power2.out', clearProps: 'transform,opacity',
        }),
      });
    }
    // fv-grid (animated visual cards)
    const fvCards = $$('.fv-card');
    if (fvCards.length) {
      gsap.set(fvCards, { opacity: 0, y: 48, scale: 0.96 });
      ScrollTrigger.create({
        trigger: '.fv-grid', start: 'top 82%', once: true,
        onEnter: () => gsap.to(fvCards, {
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08,
          ease: 'power2.out', clearProps: 'transform,opacity',
        }),
      });
    }

    /* ============================================================
       29. FOOTER COLUMNS — stagger fade up
    ============================================================ */
    const footerCols = document.querySelectorAll('footer .wrap > div');
    if (footerCols.length) {
      gsap.set(footerCols, { opacity: 0, y: 34 });
      ScrollTrigger.create({
        trigger: 'footer', start: 'top 88%', once: true,
        onEnter: () => gsap.to(footerCols, {
          opacity: 1, y: 0, duration: 0.66, stagger: 0.1,
          ease: 'power2.out', clearProps: 'transform,opacity',
        }),
      });
    }

  } // end init()

  /* ── Entry point ──────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
