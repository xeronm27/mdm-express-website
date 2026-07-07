// ar-shared.js — Arabic nav, trust strip, CTA strip, footer for MDM Express
(function(){

  /* ── FAVICON ──────────────────────────────────────────────────── */
  (function(){
    if(document.querySelector('link[rel="icon"]')) return;
    const link = document.createElement('link');
    link.rel = 'icon'; link.type = 'image/svg+xml'; link.href = '../favicon.svg';
    document.head.appendChild(link);
  })();

  /* ── SEO / GEO / AEO (Arabic) ────────────────────────────────── */
  (function(){
    const BASE = 'https://mdm.express';
    const path = window.location.pathname;

    // Arabic per-page meta
    const PAGE_META = {
      '/ar/':            { title:'MDM Express — منصة التجارة الإلكترونية بالدفع عند الاستلام | ليبيا، العراق، لبنان', desc:'MDM Express تدير عملياتك الكاملة في التجارة الإلكترونية بالدفع عند الاستلام — توريد، تخزين، تأكيد الطلبات، توصيل، وتحصيل نقدي من خلال منظومة متكاملة.' },
      '/ar/index':       { title:'MDM Express — منصة التجارة الإلكترونية بالدفع عند الاستلام | ليبيا، العراق، لبنان', desc:'MDM Express تدير عملياتك الكاملة في التجارة الإلكترونية بالدفع عند الاستلام — توريد، تخزين، تأكيد الطلبات، توصيل، وتحصيل نقدي من خلال منظومة متكاملة.' },
      '/ar/services':    { title:'خدماتنا — توريد، تخزين، توصيل وتحصيل نقدي | MDM Express', desc:'اكتشف خدمات MDM Express: توريد المنتجات، شحن دولي، تخزين، مركز اتصال لتأكيد الطلبات، توصيل آخر ميل، تحصيل نقدي، وتقارير البائعين.' },
      '/ar/sourcing':    { title:'توريد المنتجات من الصين ودبي | MDM Express', desc:'وفّر منتجاتك من الصين ودبي والموردين المحليين عبر MDM Express. نتولى البحث عن الموردين، الشحن، التخليص الجمركي، والاستيراد لبائعي الدفع عند الاستلام.' },
      '/ar/warehousing': { title:'التخزين وتجهيز الطلبات | MDM Express', desc:'خزّن وأدر مخزونك داخل مستودعات MDM. تتبّع مستويات المخزون، تجهيز الطلبات، والشحن من خلال منصة متكاملة مبنية لتجارة الدفع عند الاستلام.' },
      '/ar/call-center': { title:'تأكيد الطلبات ومركز الاتصال | MDM Express', desc:'يؤكد MDM Express الطلبات عبر فرق مركز الاتصال المحلية المدرّبة على التحقق من العملاء، ومعالجة الاعتراضات، والمتابعة لرفع معدلات نجاح التوصيل.' },
      '/ar/delivery':    { title:'توصيل آخر ميل بالدفع عند الاستلام | ليبيا، العراق، لبنان | MDM Express', desc:'توصيل وطني بالدفع عند الاستلام في ليبيا والعراق ولبنان. يتتبع MDM كل طلب من الإرسال حتى التسليم ويحصّل المدفوعات النقدية نيابةً عنك.' },
      '/ar/affiliate':   { title:'دروبشيبينغ بالدفع عند الاستلام — بيع بدون مخزون | MDM Express', desc:'ابدأ الدروبشيبينغ مع MDM Express في ليبيا — لا يلزم مخزون مسبق. اختر المنتجات، حدد سعرك، ويتولى MDM تجهيز الطلبات، التأكيد، التوصيل، والتحصيل النقدي.' },
      '/ar/marketplace': { title:'سوق المنتجات المحلية — وفّر محلياً وبع بسرعة | MDM Express', desc:'وفّر منتجاتك من موردين محليين موثوقين عبر سوق MDM. تصفّح، اطلب المخزون، واستقبل التوصيل — متاح الآن في ليبيا للبائعين المسجلين في MDM.' },
      '/ar/how-it-works':{ title:'كيف يعمل MDM Express — من التوريد إلى التحصيل النقدي', desc:'يدير MDM Express رحلة التجارة الإلكترونية كاملةً: إعداد الحساب، توريد المنتجات، تخزين، تأكيد الطلبات، توصيل، تحصيل نقدي، وتسويات شفافة للبائعين.' },
      '/ar/features':    { title:'لوحة تحكم البائع وميزات المنصة | MDM Express', desc:'يمنحك MDM Express رؤية كاملة على الطلبات، مستويات المخزون، حالة التوصيل، معدلات التأكيد، المرتجعات، وتتبع المدفوعات — كل ذلك من لوحة تحكم واحدة.' },
      '/ar/about':       { title:'عن MDM Express — شريك اللوجستيك بالدفع عند الاستلام في منطقة MENA', desc:'MDM Express شريك متكامل لعمليات التجارة الإلكترونية بالدفع عند الاستلام للبائعين في ليبيا والعراق ولبنان — يوفر لوجستيات شاملة، تجهيز طلبات، وبنية تحتية مالية.' },
      '/ar/remittance':  { title:'تحويل مالي COD ومدفوعات البائعين | MDM Express', desc:'يحصّل MDM Express مدفوعات الدفع عند الاستلام ويقدم تقارير تسوية شفافة حتى يعرف البائعون دائماً ما تم توصيله وتحصيله وموعد استلام أموالهم.' },
      '/ar/capital':     { title:'سلفة التوريد وتمويل البائعين | MDM Express', desc:'يقدم MDM Express سلفة توريد لمساعدة البائعين على تمويل مشتريات المخزون بناءً على أداء المبيعات — بدون حصص، تُسدَّد من عائدات الدفع عند الاستلام.' },
    };

    // Match current path (strip trailing .html if any)
    const slug = path.replace(/\/index\.html?$/, '/ar/').replace(/\.html?$/, '') || '/ar/';
    const arSlug = slug; // e.g. /ar/services
    const enSlug = arSlug.replace(/^\/ar/, '') || '/'; // e.g. /services
    const meta = PAGE_META[arSlug] || PAGE_META['/ar/'];

    // ── Canonical ──
    if(!document.querySelector('link[rel="canonical"]')){
      const can = document.createElement('link');
      can.rel = 'canonical';
      can.href = BASE + arSlug;
      document.head.appendChild(can);
    }

    // ── hreflang ──
    if(!document.querySelector('link[rel="alternate"]')){
      [['ar', BASE + arSlug], ['en', BASE + (enSlug || '/')]].forEach(([lang, href]) => {
        const l = document.createElement('link');
        l.rel = 'alternate'; l.hreflang = lang; l.href = href;
        document.head.appendChild(l);
      });
    }

    // ── dir + lang on <html> ──
    document.documentElement.setAttribute('lang', 'ar');
    document.documentElement.setAttribute('dir', 'rtl');

    // ── Meta description ──
    if(!document.querySelector('meta[name="description"]') && meta){
      const m = document.createElement('meta');
      m.name = 'description'; m.content = meta.desc;
      document.head.appendChild(m);
    }

    // ── Open Graph ──
    if(!document.querySelector('meta[property="og:title"]') && meta){
      const og = [
        ['og:type',             'website'],
        ['og:site_name',        'MDM Express'],
        ['og:title',            meta.title],
        ['og:description',      meta.desc],
        ['og:url',              BASE + arSlug],
        ['og:image',            'https://project-48ubm.vercel.app/og-image.png'],
        ['og:image:width',      '1200'],
        ['og:image:height',     '630'],
        ['og:image:type',       'image/png'],
        ['og:locale',           'ar_LY'],
        ['og:locale:alternate', 'en_US'],
        ['twitter:card',        'summary_large_image'],
        ['twitter:title',       meta.title],
        ['twitter:description', meta.desc],
      ];
      og.forEach(([prop, content]) => {
        const t = document.createElement('meta');
        if(prop.startsWith('twitter:')) t.name = prop; else t.setAttribute('property', prop);
        t.content = content;
        document.head.appendChild(t);
      });
    }

    // ── Organization + WebSite JSON-LD ──
    const orgSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': BASE + '/#organization',
          name: 'MDM Express',
          url: BASE,
          logo: { '@type': 'ImageObject', url: BASE + '/MAIN.svg' },
          description: 'MDM Express منصة متكاملة لعمليات التجارة الإلكترونية بالدفع عند الاستلام — تقدم خدمات التوريد، التخزين، تأكيد الطلبات، التوصيل الأخير، التحصيل النقدي، وتقارير البائعين في ليبيا والعراق ولبنان.',
          areaServed: ['Libya', 'Iraq', 'Lebanon'],
          knowsAbout: ['Cash on Delivery logistics', 'E-commerce fulfillment', 'Product sourcing', 'Last-mile delivery', 'Order confirmation call center', 'COD remittance'],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'خدمات MDM Express',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'توريد المنتجات', url: BASE + '/sourcing' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'التخزين وتجهيز الطلبات', url: BASE + '/warehousing' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'مركز الاتصال لتأكيد الطلبات', url: BASE + '/call-center' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'توصيل آخر ميل بالدفع عند الاستلام', url: BASE + '/delivery' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'تحويل مالي ومدفوعات البائعين', url: BASE + '/remittance' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'دروبشيبينغ', url: BASE + '/affiliate' } },
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
      if(arSlug === '/ar/' || arSlug === '/ar') return;
      const label = (document.title || '').split('|')[0].split('—')[0].trim();
      const bc = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type':'ListItem', position:1, name:'الرئيسية', item: BASE + '/ar/' },
          { '@type':'ListItem', position:2, name: label, item: BASE + arSlug }
        ]
      };
      const bcScript = document.createElement('script');
      bcScript.type = 'application/ld+json';
      bcScript.text = JSON.stringify(bc);
      document.head.appendChild(bcScript);
    });

  })();

  const active = document.body.dataset.page || '';

  // Detect current page for language switcher (link back to English).
  // With cleanUrls, ar/index.html is at /ar (pop = 'ar', no extension).
  // ar/affiliate.html is at /ar/affiliate (pop = 'affiliate', no extension).
  // We add .html if there's no extension; index page maps to index.html.
  (function(){})(); // noop — enHref computed below
  const _pathParts = window.location.pathname.split('/').filter(Boolean);
  const _last = _pathParts[_pathParts.length - 1] || '';
  const _isIndexPage = _last === 'ar' || _last === '' || _last === 'index.html';
  const _file = _isIndexPage ? 'index.html' : (_last.includes('.') ? _last : _last + '.html');
  const enHref = '../' + _file;

  /* ── NAV ITEMS ─────────────────────────────────────────────────────── */
  const NAV_ITEMS = [
    {label:'الرئيسية',      href:'index.html',        key:'home'},
    {label:'الخدمات',       href:'services.html',     key:'services'},
    {label:'كيف يعمل',     href:'how-it-works.html',  key:'how'},
    {label:'دروبشيبينغ',   href:'affiliate.html',    key:'affiliate'},
    {label:'السوق',         href:'marketplace.html',  key:'marketplace'},
    {label:'المميزات',      href:'features.html',     key:'features'},
    {label:'من نحن',        href:'about.html',        key:'about'},
    {label:'المدونة',       href:'/ar/blog',          key:'blog'}
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
          <img src="../MAIN.svg" alt="MDM Express" class="logo-svg" width="97" height="36" fetchpriority="high">
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
          <a href="/ar/blog" class="${active==='blog'?'active':''}">المدونة</a>
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
            <img src="../MAIN.svg" alt="MDM Express" class="footer-logo-svg" width="86" height="32" loading="lazy" decoding="async">
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
