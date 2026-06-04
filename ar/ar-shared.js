// ar-shared.js — Arabic nav, trust strip, CTA strip, footer for MDM Express
(function(){
  const active = document.body.dataset.page || '';

  // Detect current page for language switcher (link back to English)
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const enHref = '../' + (currentFile === '' ? 'index.html' : currentFile);

  /* ── NAV ITEMS ─────────────────────────────────────────────────────── */
  const NAV_ITEMS = [
    {label:'الرئيسية',      href:'index.html',       key:'home'},
    {label:'دروبشيبينغ',   href:'affiliate.html',   key:'affiliate'},
    {label:'السوق',         href:'marketplace.html', key:'marketplace'},
    {label:'الخدمات',       href:'services.html',    key:'services'},
    {label:'المميزات',      href:'features.html',    key:'features'},
    {label:'من نحن',        href:'about.html',       key:'about'},
    {label:'كيف يعمل',     href:'how-it-works.html',key:'how'}
  ];

  /* ── SERVICES DROPDOWN ─────────────────────────────────────────────── */
  const SERVICE_ITEMS = [
    {
      label:'التوريد', sub:'+10,000 منتج', href:'sourcing.html',
      icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
    },
    {
      label:'التخزين', sub:'مستودعات ليبيا والعراق', href:'warehousing.html',
      icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
    },
    {
      label:'مركز الاتصال', sub:'دعم على مدار الساعة', href:'call-center.html',
      icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`
    },
    {
      label:'التوصيل', sub:'توصيل في اليوم التالي', href:'delivery.html',
      icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`
    },
    {
      label:'التحويل المالي', sub:'دفعات أسبوعية', href:'remittance.html',
      icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`
    },
    {
      label:'السلفة', sub:'+$5M مُقدَّم', href:'capital.html',
      icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
    },
  ];

  const serviceDropdown = `
    <div class="nav-dd-panel">
      ${SERVICE_ITEMS.map(s=>`
        <a href="${s.href}" class="nav-dd-item">
          <div class="nav-dd-icon">${s.icon}</div>
          <div class="nav-dd-text">
            <div class="nav-dd-name">${s.label}</div>
            <div class="nav-dd-sub">${s.sub}</div>
          </div>
        </a>`).join('')}
    </div>`;

  const navLinksHtml = NAV_ITEMS.map(n => {
    if (n.key === 'services') {
      return `
        <div class="nav-drop-wrap${n.key===active?' active':''}">
          <a href="${n.href}" class="nav-drop-trigger${n.key===active?' active':''}">
            ${n.label}
            <svg class="nav-drop-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          ${serviceDropdown}
        </div>`;
    }
    return `<a href="${n.href}" class="${n.key===active?'active':''}">${n.label}</a>`;
  }).join('');

  /* ── NAV HTML ──────────────────────────────────────────────────────── */
  const navHtml = `
    <header class="nav-bar">
      <nav class="nav">
        <a href="index.html" class="logo">
          <span class="logo-mark">MDM</span>
          <span>MDM&nbsp;EXPRESS</span>
        </a>
        <div class="nav-links" id="navLinks">
          ${navLinksHtml}
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex-direction:row-reverse">
          <a href="https://app.mdm.express/en/auth/register" class="nav-cta">ابدأ الآن</a>
          <a href="${enHref}" class="lang-switch" title="English">EN</a>
          <button class="nav-hamburger" id="navHamburger" aria-label="فتح القائمة" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <!-- mobile drawer -->
      <div class="nav-drawer" id="navDrawer" aria-hidden="true">
        <div class="nav-drawer-inner">
          <a href="index.html" class="${active==='home'?'active':''}">الرئيسية</a>
          <a href="affiliate.html" class="${active==='affiliate'?'active':''}">دروبشيبينغ</a>
          <a href="marketplace.html" class="${active==='marketplace'?'active':''}">السوق</a>
          <div class="mdr-services-wrap">
            <button class="mdr-services-btn" id="mdrServicesBtn">
              الخدمات
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
          <a href="features.html" class="${active==='features'?'active':''}">المميزات</a>
          <a href="about.html" class="${active==='about'?'active':''}">من نحن</a>
          <a href="how-it-works.html" class="${active==='how'?'active':''}">كيف يعمل</a>
          <a href="https://app.mdm.express/en/auth/register" class="mdr-cta">ابدأ الآن →</a>
        </div>
      </div>
    </header>`;

  /* ── TRUST STRIP ───────────────────────────────────────────────────── */
  const trustItems = [
    '+9,000 بائع نشط',
    '+5 مليون دولار مُقدَّم للبائعين',
    'ليبيا · العراق · لبنان',
    '+8 سنوات خبرة',
    'دعم مركز الاتصال على مدار الساعة',
    'توصيل في اليوم التالي',
    '+10,000 منتج جاهز',
    'MDM Express منذ 2016',
    'بدون حصص أو أسهم',
    'عمليات متكاملة',
  ];
  const trustHtml = `
    <div class="trust-strip" aria-hidden="true">
      <div class="trust-marquee">
        ${trustItems.map(t=>`<span class="trust-item"><span class="ti-dot"></span>${t}</span>`).join('')}
        ${trustItems.map(t=>`<span class="trust-item"><span class="ti-dot"></span>${t}</span>`).join('')}
      </div>
    </div>`;

  /* ── STATS ACCENT BAND (home only) ────────────────────────────────── */
  const statsHtml = `
    <section class="stats-accent-band" aria-label="أرقامنا">
      <div class="wrap">
        <div class="sab-grid">
          <div class="sab-item">
            <div class="sab-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="sab-num" data-target="9" data-prefix="" data-suffix="K+">0K+</div>
            <div class="sab-label">بائع نشط</div>
            <div class="sab-sub">في ليبيا والعراق</div>
          </div>
          <div class="sab-item">
            <div class="sab-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div class="sab-num" data-target="30" data-prefix="$" data-suffix="M+">$0M+</div>
            <div class="sab-label">مُقدَّم للبائعين</div>
            <div class="sab-sub">بدون أسهم</div>
          </div>
          <div class="sab-item">
            <div class="sab-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <div class="sab-num" data-target="2" data-prefix="" data-suffix="+">0+</div>
            <div class="sab-label">أسواق نشطة</div>
            <div class="sab-sub">والمزيد قريباً</div>
          </div>
          <div class="sab-item">
            <div class="sab-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="sab-num" data-target="98" data-prefix="" data-suffix="%">0%</div>
            <div class="sab-label">معدل التأكيد</div>
            <div class="sab-sub">متوسط السوق 60-70%</div>
          </div>
        </div>
      </div>
    </section>`;

  /* ── TESTIMONIALS (home only) ─────────────────────────────────────── */
  const testiHtml = `
    <section class="block alt">
      <div class="wrap">
        <div class="sec-head">
          <span class="sec-tag">قصص بائعينا</span>
          <h2 class="title">موثوق به من آلاف البائعين</h2>
          <p class="sec-sub">نتائج حقيقية من بائعين نمت أعمالهم مع MDM Express في ليبيا والعراق ولبنان.</p>
        </div>
        <div class="testi-grid">
          <div class="testi-card">
            <p class="testi-quote">MDM Express غيّر طريقة إدارتي لمتجري. رفع مركز الاتصال لديهم معدل التأكيد لديّ بنسبة 23% في الشهر الأول فقط — لن أفكر في العودة للوراء.</p>
            <div class="testi-footer">
              <div class="testi-avatar">👤</div>
              <div>
                <div class="testi-name">خالد الرشيد</div>
                <div class="testi-role">بائع إلكترونيات · طرابلس</div>
              </div>
              <span class="testi-stat">+23% معدل تأكيد</span>
            </div>
          </div>
          <div class="testi-card">
            <p class="testi-quote">وصلت من الصفر إلى 500 طلب يومياً في 90 يوماً. فريق التوريد وجد منتجات رابحة لم أستطع الحصول عليها في أي مكان آخر بهذه الهوامش.</p>
            <div class="testi-footer">
              <div class="testi-avatar">👤</div>
              <div>
                <div class="testi-name">فاطمة حسن</div>
                <div class="testi-role">بائعة أزياء · بغداد</div>
              </div>
              <span class="testi-stat">500+ طلب يومياً</span>
            </div>
          </div>
          <div class="testi-card">
            <p class="testi-quote">سلفة التوريد منحتني التمويل الذي احتجته لتوسيع مخزوني في اللحظة المناسبة. بدون حصص — مجرد وقود نمو خالص.</p>
            <div class="testi-footer">
              <div class="testi-avatar">👤</div>
              <div>
                <div class="testi-name">عمر السيد</div>
                <div class="testi-role">بائع متعدد الفئات · بيروت</div>
              </div>
              <span class="testi-stat">120,000$ ممولة</span>
            </div>
          </div>
        </div>
      </div>
    </section>`;

  /* ── CTA STRIP ─────────────────────────────────────────────────────── */
  const ctaHtml = `
    <section class="cta-strip" id="cta">
      <div class="cta-tile t1">👟</div>
      <div class="cta-tile t2">🎧</div>
      <div class="cta-tile t3">🥤</div>
      <div class="cta-tile t4">☕</div>
      <div class="wrap">
        <h2>مستعد للبيع؟<br/>رحلتك تبدأ من هنا</h2>
        <a href="https://app.mdm.express/en/auth/register" class="btn-primary">سجّل مجاناً</a>
        <div class="cta-note">لا يُشترط بطاقة ائتمانية.</div>
      </div>
    </section>`;

  /* ── FOOTER ────────────────────────────────────────────────────────── */
  const footerHtml = `
    <footer>
      <div class="wrap">
        <div>
          <div class="brand">
            <span class="logo-mark">MDM</span>
            <span>MDM&nbsp;EXPRESS</span>
          </div>
          <p style="font-size:13.5px;line-height:1.8;color:#A8A4BD">شريكك المتكامل في اللوجستيك والتجارة الإلكترونية — توريد، تخزين، شحن، تحويل مالي وتمويل، كل ذلك في مكان واحد.</p>
          <div class="socials" style="margin-top:14px">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Instagram">ig</a>
          </div>
        </div>
        <div>
          <h5>روابط سريعة</h5>
          <ul>
            <li><a href="index.html" style="color:inherit">الرئيسية</a></li>
            <li><a href="about.html" style="color:inherit">من نحن</a></li>
            <li><a href="services.html" style="color:inherit">الخدمات</a></li>
            <li><a href="capital.html" style="color:inherit">السلفة</a></li>
            <li><a href="how-it-works.html" style="color:inherit">كيف يعمل</a></li>
          </ul>
        </div>
        <div>
          <h5>الموارد</h5>
          <ul>
            <li>تواصل معنا</li>
            <li>مركز المساعدة</li>
            <li>المدونة</li>
            <li>خريطة الموقع</li>
          </ul>
        </div>
        <div>
          <h5>القانونية</h5>
          <ul>
            <li><a href="terms.html" style="color:inherit">شروط الخدمة</a></li>
            <li><a href="privacy.html" style="color:inherit">سياسة الخصوصية</a></li>
            <li><a href="cookies.html" style="color:inherit">سياسة الكوكيز</a></li>
          </ul>
        </div>
        <div>
          <h5>الدعم</h5>
          <ul>
            <li>support@mdmexpress.com</li>
            <li>برج كريتيف، دبي، الإمارات</li>
            <li>71-75 شيلتون ستريت، لندن</li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <span class="copy">© 2022–2025 MDM EXPRESS. جميع الحقوق محفوظة.</span>
        <span class="copy">صُنع للرواد.</span>
      </div>
    </footer>`;

  /* ── INJECT: skip link ──────────────────────────────────────────────── */
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'تخطى إلى المحتوى الرئيسي';
  document.body.insertBefore(skipLink, document.body.firstChild);

  /* ── INJECT: nav ────────────────────────────────────────────────────── */
  const navWrap = document.createElement('div');
  navWrap.innerHTML = navHtml;
  document.body.insertBefore(navWrap.firstElementChild, document.body.firstChild);

  /* ── INJECT: trust strip after .hero ──────────────────────────────── */
  const hero = document.querySelector('section.hero');
  if (hero) {
    const trustWrap = document.createElement('div');
    trustWrap.innerHTML = trustHtml;
    hero.after(trustWrap.firstElementChild);
  }

  /* ── INJECT: stats band & testimonials (home only) ─────────────────── */
  if (active === 'home') {
    const main = document.querySelector('main');
    if (main) {
      const statsWrap = document.createElement('div');
      statsWrap.innerHTML = statsHtml;
      main.prepend(statsWrap.firstElementChild);

      const testiWrap = document.createElement('div');
      testiWrap.innerHTML = testiHtml;
      // Insert before the last section (FAQ)
      const sections = main.querySelectorAll('section');
      const lastSec = sections[sections.length - 1];
      if (lastSec) main.insertBefore(testiWrap.firstElementChild, lastSec);
    }
  }

  /* ── INJECT: CTA + footer ───────────────────────────────────────────── */
  if (!document.body.dataset.noCta) {
    const ctaWrap = document.createElement('div');
    ctaWrap.innerHTML = ctaHtml;
    document.body.appendChild(ctaWrap.firstElementChild);
  }
  const fWrap = document.createElement('div');
  fWrap.innerHTML = footerHtml;
  document.body.appendChild(fWrap.firstElementChild);

  /* ── SERVICES DROPDOWN ─────────────────────────────────────────────── */
  (function(){
    const wrap = document.querySelector('.nav-drop-wrap');
    if (!wrap) return;
    let closeTimer;
    function open(){ clearTimeout(closeTimer); wrap.classList.add('dd-open'); }
    function close(){ closeTimer = setTimeout(()=> wrap.classList.remove('dd-open'), 180); }
    wrap.addEventListener('mouseenter', open);
    wrap.addEventListener('mouseleave', close);
    const chevron = wrap.querySelector('.nav-drop-chevron');
    if (chevron) {
      chevron.addEventListener('click', (e)=>{
        e.preventDefault(); e.stopPropagation();
        wrap.classList.toggle('dd-open');
      });
    }
    document.addEventListener('click', (e)=>{
      if (!wrap.contains(e.target)) wrap.classList.remove('dd-open');
    });
  })();

  /* ── MOBILE HAMBURGER ───────────────────────────────────────────────── */
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
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => toggleMenu(false));
    });
    document.addEventListener('click', e => {
      const header = document.querySelector('.nav-bar');
      if (header && !header.contains(e.target)) toggleMenu(false);
    });
    const svcBtn  = document.getElementById('mdrServicesBtn');
    const svcList = document.getElementById('mdrServicesList');
    if (svcBtn && svcList) {
      svcBtn.addEventListener('click', () => {
        const open = svcBtn.classList.toggle('open');
        svcList.classList.toggle('open', open);
      });
    }
  })();

  /* ── FAQ TOGGLE ─────────────────────────────────────────────────────── */
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
