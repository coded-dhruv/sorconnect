// Sor Connect — Shared Site Behaviour & Interactions

document.addEventListener('DOMContentLoaded', function () {

  // ===================== CLEAN URL & ROUTE MANAGEMENT =====================
  // Beautify browser address bar: strip /index.html and .html extensions cleanly
  if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
    try {
      if (window.location.protocol.indexOf('http') === 0) {
        var currentPath = window.location.pathname;
        var searchStr = window.location.search || '';
        var hashStr = window.location.hash || '';

        if (currentPath.endsWith('/index.html') || currentPath.endsWith('/index') || currentPath.endsWith('/home')) {
          var cleanDir = currentPath.replace(/\/(index|home)(\.html)?$/, '') || '/';
          window.history.replaceState(null, document.title, cleanDir + searchStr + hashStr);
        } else if (currentPath.endsWith('.html')) {
          var cleanFile = currentPath.replace(/\.html$/, '');
          window.history.replaceState(null, document.title, cleanFile + searchStr + hashStr);
        }
      }
    } catch (e) {
      // Ignore if restricted
    }
  }

  // ===================== MOBILE NAV TOGGLE =====================
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !nav.classList.contains('open');
      nav.classList.toggle('open', willOpen);
      toggle.classList.toggle('open', willOpen);
      toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { 
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===================== SIDE BISCUIT & NAVBAR SCROLL BEHAVIOR =====================
  // Inject floating Vertical Side Biscuit for "Contact Us" if not already in DOM
  if (!document.getElementById('sideBiscuitContact')) {
    var biscuit = document.createElement('a');
    biscuit.href = 'javascript:void(0)';
    biscuit.className = 'side-biscuit-contact';
    biscuit.id = 'sideBiscuitContact';
    biscuit.setAttribute('data-open-modal', 'quote');
    biscuit.setAttribute('data-modal-title', 'Contact Sor Connect');
    biscuit.setAttribute('data-modal-desc', 'Share your solar inquiry or site details. Our engineering team will get in touch with you within 24 hours.');
    biscuit.setAttribute('aria-label', 'Contact Us');
    biscuit.innerHTML = `
      <div class="biscuit-pulse-indicator">
        <span class="biscuit-pulse-ring"></span>
        <span class="biscuit-pulse-dot"></span>
      </div>
      <div class="biscuit-icon">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <span class="biscuit-label-vertical">Contact Us</span>
      <div class="biscuit-arrow">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </div>
    `;
    document.body.appendChild(biscuit);
  }

  // Header Scroll & Hero Threshold Tracker
  var header = document.querySelector('.site-header');
  var sideBiscuit = document.getElementById('sideBiscuitContact');

  var onScroll = function () {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    
    // When scrolling away from initial top position (scrollY > 70px)
    var isScrolled = scrollY > 70;

    if (header) {
      header.classList.toggle('scrolled', isScrolled);
      header.classList.toggle('scrolled-past-hero', isScrolled);
    }
    document.body.classList.toggle('scrolled-past-hero', isScrolled);
    document.body.classList.toggle('scrolled', isScrolled);
    if (sideBiscuit) {
      sideBiscuit.classList.toggle('show', isScrolled);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  // Initial check
  onScroll();

  // ===================== GSAP & SCROLL ANIMATIONS =====================
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero fade-in on page load
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero .btn, .hero-inner-single h1, .hero-inner-single p, .hero-inner-single .btn-primary, .hero-inner-single .btn-outline');
    if (heroElements.length > 0) {
      gsap.from(heroElements, {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }

    // 2. Count-up statistics ticker & Why Sor Connect numbers rolling animation
    window.initRollingStatCounters = function() {
      const statNumElements = document.querySelectorAll('.stat-block .num, .readout-item .val, .stat-num');
      if (statNumElements.length === 0) return;

      statNumElements.forEach(numEl => {
        const spanEl = numEl.querySelector('span');
        const spanHTML = spanEl ? spanEl.outerHTML : '';
        const rawText = numEl.textContent || '';

        const match = rawText.match(/(\d+)/);
        if (match) {
          const targetValue = parseInt(match[1], 10);
          const hasK = rawText.toLowerCase().includes('k');
          const suffixHTML = hasK && !spanHTML.includes('k') 
            ? `k${spanHTML || (rawText.includes('+') ? '<span>+</span>' : '')}`
            : (spanHTML || (rawText.replace(/[\d]/g, '').trim() ? `<span>${rawText.replace(/[\d]/g, '').trim()}</span>` : ''));

          const countObj = { val: 0 };
          const statParent = numEl.closest('.stat-block') || numEl;

          // Initial roll-up sliding entrance
          gsap.fromTo(numEl, 
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: statParent,
                start: 'top 88%',
                toggleActions: 'play none none none'
              }
            }
          );

          // Rolling number counter
          gsap.to(countObj, {
            val: targetValue,
            duration: 2.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statParent,
              start: 'top 88%',
              toggleActions: 'play none none none'
            },
            onUpdate: function () {
              numEl.innerHTML = Math.floor(countObj.val) + suffixHTML;
            }
          });
        }
      });
    };

    window.initRollingStatCounters();

    // 3. Staggered reveals for cards and grids
    gsap.utils.toArray('.card-grid, .partner-strip, .offices-grid, .process-nav').forEach(container => {
      const items = container.querySelectorAll('.card, .partner-card, .office-col-card, .process-nav-btn');
      if (items.length > 0) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'all'
        });
      }
    });

    // 4. Staggered reveals for general fade-up blocks
    gsap.utils.toArray('.section, .process-section, .about-section, .contact-grid').forEach(section => {
      const fadeItems = section.querySelectorAll('.fade-up:not(.card-grid):not(.stats-strip):not(.partner-strip):not(.offices-grid)');
      if (fadeItems.length > 0) {
        gsap.from(fadeItems, {
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none'
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          clearProps: 'all'
        });
      }
    });

    // 5. Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.btn, .nav-cta');
    if (magneticBtns.length > 0) {
      magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
          const position = this.getBoundingClientRect();
          const x = e.clientX - position.left - position.width / 2;
          const y = e.clientY - position.top - position.height / 2;
          gsap.to(this, {
            x: x * 0.35,
            y: y * 0.35,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        btn.addEventListener('mouseleave', function() {
          gsap.to(this, {
            x: 0,
            y: 0,
            scale: 1.0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)'
          });
        });
      });
    }

  } else {
    // Native IntersectionObserver fallback
    var revealEls = document.querySelectorAll('.fade-up');
    if ('IntersectionObserver' in window && revealEls.length) {
      revealEls.forEach(function (el) { el.classList.add('will-fade'); });
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { observer.observe(el); });
    }
  }

  // ===================== DYNAMIC SUPABASE PROJECTS TABLE LOADER =====================
  const epcTableBody = document.getElementById('epc-projects-list');
  const icOmTableBody = document.getElementById('ic-om-projects-list');

  if (epcTableBody || icOmTableBody) {
    const SUPABASE_PROJECTS_URL = 'https://znjpzipedsowuyrpotgb.supabase.co/rest/v1/projects?select=*,categories(*)&order=id.asc';
    const SUPABASE_CATEGORIES_URL = 'https://znjpzipedsowuyrpotgb.supabase.co/rest/v1/categories?select=*&order=id.asc';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuanB6aXBlZHNvd3V5cnBvdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwODU5MzIsImV4cCI6MjEwMTY2MTkzMn0.CO9Bvyiio-b2_OFDTyTd1jzGZ13Ezjl7oPwgIVciJxs';

    const supHeaders = { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` };

    Promise.all([
      fetch(SUPABASE_CATEGORIES_URL, { headers: supHeaders }).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(SUPABASE_PROJECTS_URL, { headers: supHeaders }).then(r => r.ok ? r.json() : []).catch(() => [])
    ])
    .then(([categories, projects]) => {
      if (Array.isArray(projects) && projects.length > 0) {
        // Group projects by category slug
        const grouped = {};
        projects.forEach(p => {
          const slug = (p.categories && p.categories.slug) ? p.categories.slug : (p.category_slug || (p.category_id === 1 ? 'epc' : 'ic_om'));
          if (!grouped[slug]) grouped[slug] = [];
          grouped[slug].push(p);
        });

        // Render EPC
        if (epcTableBody && grouped['epc']) {
          epcTableBody.innerHTML = grouped['epc'].map(p => `
            <tr>
              <td><strong>${p.client}</strong></td>
              <td>${p.location}</td>
              <td class="cap-col">${p.capacity}</td>
              <td><span class="tag-pill">${p.sector_or_type}</span></td>
            </tr>
          `).join('');
        }

        // Render I&C / O&M
        if (icOmTableBody && grouped['ic_om']) {
          icOmTableBody.innerHTML = grouped['ic_om'].map(p => `
            <tr>
              <td><strong>${p.client}</strong></td>
              <td>${p.location}</td>
              <td class="cap-col">${p.capacity}</td>
              <td><span class="tag-pill">${p.sector_or_type}</span></td>
            </tr>
          `).join('');
        }

        // Render any additional custom categories
        const gridContainer = epcTableBody ? epcTableBody.closest('.card-grid') : null;
        if (gridContainer && Array.isArray(categories)) {
          categories.forEach(cat => {
            if (cat.slug !== 'epc' && cat.slug !== 'ic_om' && grouped[cat.slug] && grouped[cat.slug].length > 0) {
              const tableId = `cat-${cat.slug}-projects-list`;
              if (!document.getElementById(tableId)) {
                const tableCard = document.createElement('div');
                tableCard.className = 'table-wrap fade-up';
                tableCard.style.cssText = 'background: #ffffff; border-radius: 14px; padding: 24px 24px 20px; box-shadow: 0 10px 30px rgba(14, 44, 34, 0.05);';
                tableCard.innerHTML = `
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--sage-line);">
                    <div>
                      <h3 style="font-size: 18px; color: var(--forest-deep); margin: 0 0 4px 0; font-weight: 700;">${cat.name}</h3>
                      <p style="font-size: 13px; color: var(--ink-soft); margin: 0;">Verified Client Portfolio</p>
                    </div>
                    <span style="font-size: 12px; font-weight: 700; color: var(--forest); background: rgba(62,143,92,0.12); padding: 5px 12px; border-radius: 20px;">${grouped[cat.slug].length} Sites</span>
                  </div>
                  <div class="table-scroll">
                    <table class="data-table">
                      <thead>
                        <tr>
                          <th>Client</th>
                          <th>Location</th>
                          <th>Capacity</th>
                          <th>Sector / Type</th>
                        </tr>
                      </thead>
                      <tbody id="${tableId}">
                        ${grouped[cat.slug].map(p => `
                          <tr>
                            <td><strong>${p.client}</strong></td>
                            <td>${p.location}</td>
                            <td class="cap-col">${p.capacity}</td>
                            <td><span class="tag-pill">${p.sector_or_type}</span></td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                `;
                gridContainer.appendChild(tableCard);
              }
            }
          });
        }
      }
    })
    .catch(() => {
      // Keep static verified Supabase HTML fallback
    });
  }

  // ===================== DYNAMIC WEBSITE STATS HYDRATION =====================
  const hasStatsElements = document.querySelector('[data-stat-id]');
  if (hasStatsElements) {
    const SUPABASE_STATS_URL = 'https://znjpzipedsowuyrpotgb.supabase.co/rest/v1/website_stats?select=*&order=display_order.asc';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuanB6aXBlZHNvd3V5cnBvdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwODU5MzIsImV4cCI6MjEwMTY2MTkzMn0.CO9Bvyiio-b2_OFDTyTd1jzGZ13Ezjl7oPwgIVciJxs';
    const supHeaders = { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` };

    fetch(SUPABASE_STATS_URL, { headers: supHeaders })
      .then(r => {
        if (r.ok) return r.json();
        return fetch('/api/stats').then(res => res.ok ? res.json().then(d => d.stats || []) : []);
      })
      .then(stats => {
        if (Array.isArray(stats) && stats.length > 0) {
          stats.forEach(s => {
            const el = document.querySelector(`[data-stat-id="${s.id}"]`);
            if (!el) return;

            if (s.section === 'hero_readout') {
              const valEl = el.querySelector('.val');
              const lblEl = el.querySelector('.lbl');
              if (valEl) {
                const suffix = s.stat_suffix || '';
                valEl.innerHTML = `${s.stat_value}<span style="font-size:15px;">${suffix}</span>`;
              }
              if (lblEl && s.label) {
                lblEl.textContent = s.label;
              }
            }

            if (s.section === 'why_us') {
              const numEl = el.querySelector('.num');
              const capEl = el.querySelector('.cap');
              const subEl = el.querySelector('.sub');
              if (numEl) {
                const suffix = s.stat_suffix || '';
                numEl.innerHTML = `${s.stat_value}<span>${suffix}</span>`;
              }
              if (capEl && s.label) {
                capEl.textContent = s.label;
              }
              if (subEl && s.description) {
                subEl.textContent = s.description;
              }
            }
          });

          // Re-trigger counter setup with refreshed live numbers
          if (typeof window.initRollingStatCounters === 'function') {
            window.initRollingStatCounters();
          }
        }
      })
      .catch(err => {
        console.warn('[STATS FETCH WARNING] Could not load dynamic stats from Supabase, maintaining static HTML fallback.', err);
      });
  }

  // ===================== PROCESS TABS / EXECUTION ROADMAP AUTO-SCROLL SLIDESHOW =====================
  const processSection = document.querySelector('.process-section');
  const processBtns = document.querySelectorAll('.process-nav-btn');
  const processTabs = document.querySelectorAll('.process-tab-content');
  const processSlideImgs = document.querySelectorAll('.process-slide-img');
  const processCurrentStep = document.getElementById('process-current-step');
  const processPrevBtn = document.getElementById('processPrevBtn');
  const processNextBtn = document.getElementById('processNextBtn');

  if (processBtns.length > 0) {
    let currentProcessIdx = 0;
    let processTimer = null;
    const processInterval = 4500; // 4.5 seconds per slide

    function showProcessStep(index) {
      if (index < 0) {
        currentProcessIdx = processBtns.length - 1;
      } else if (index >= processBtns.length) {
        currentProcessIdx = 0;
      } else {
        currentProcessIdx = index;
      }

      const activeBtn = processBtns[currentProcessIdx];
      if (!activeBtn) return;

      const targetTabId = activeBtn.getAttribute('data-tab');
      const targetStep = activeBtn.getAttribute('data-step') || ('0' + (currentProcessIdx + 1));
      const targetTab = document.getElementById(targetTabId);

      // Reset and trigger progress bar animation on the active button
      processBtns.forEach((b, idx) => {
        b.classList.remove('active');
        if (idx === currentProcessIdx) {
          b.classList.add('active');
        }
      });

      // Update active tab content
      if (targetTab) {
        processTabs.forEach(t => t.classList.remove('active'));
        targetTab.classList.add('active');
      }

      // Update badge counter
      if (processCurrentStep) {
        processCurrentStep.textContent = targetStep;
      }

      // INSTANT Zero-Lag Image Switching across preloaded image stack
      if (processSlideImgs.length > 0) {
        processSlideImgs.forEach((img, idx) => {
          if (idx === currentProcessIdx) {
            img.classList.add('active');
          } else {
            img.classList.remove('active');
          }
        });
      }
    }

    function nextProcessStep() {
      showProcessStep(currentProcessIdx + 1);
    }

    function prevProcessStep() {
      showProcessStep(currentProcessIdx - 1);
    }

    function startProcessTimer() {
      stopProcessTimer();
      processTimer = setInterval(nextProcessStep, processInterval);
    }

    function stopProcessTimer() {
      if (processTimer) {
        clearInterval(processTimer);
        processTimer = null;
      }
    }

    // Nav button clicks
    processBtns.forEach((btn, idx) => {
      btn.addEventListener('click', function() {
        showProcessStep(idx);
        startProcessTimer();
      });
    });

    // Arrow button controls
    if (processPrevBtn) {
      processPrevBtn.addEventListener('click', function() {
        prevProcessStep();
        startProcessTimer();
      });
    }

    if (processNextBtn) {
      processNextBtn.addEventListener('click', function() {
        nextProcessStep();
        startProcessTimer();
      });
    }

    // Start auto slide
    startProcessTimer();

    // Hover pause / resume on process section & showcase card
    if (processSection) {
      processSection.addEventListener('mouseenter', stopProcessTimer);
      processSection.addEventListener('mouseleave', startProcessTimer);
      processSection.addEventListener('touchstart', stopProcessTimer, { passive: true });
      processSection.addEventListener('touchend', startProcessTimer, { passive: true });
    }

    // Touch swipe support on showcase card
    const showcaseCard = document.querySelector('.process-showcase-card');
    if (showcaseCard) {
      let touchStartX = 0;
      showcaseCard.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      showcaseCard.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const diffX = touchStartX - touchEndX;
        if (Math.abs(diffX) > 40) {
          if (diffX > 0) {
            nextProcessStep();
          } else {
            prevProcessStep();
          }
          startProcessTimer();
        }
      }, { passive: true });
    }
  }

  // ===================== MODAL OVERLAY INJECTION & MANAGEMENT =====================
  function ensureQuoteModalExists() {
    let overlay = document.getElementById('quote-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'quote-modal-overlay';
      overlay.className = 'quote-modal-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.innerHTML = `
        <div class="quote-modal-container">
          <button type="button" class="quote-modal-close" aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div class="quote-modal-header">
            <div class="quote-modal-badge">⚡ Instant Solar Assessment</div>
            <h3 class="quote-modal-title">Get a Free Solar Quote</h3>
            <p class="quote-modal-desc">Share your details and monthly bill. Our engineers will prepare a customized zero-cost feasibility study and subsidy estimate.</p>
          </div>
          <form class="contact-form modal-form" id="quote-modal-form" style="padding:0; border:none;">
            <div class="form-two">
              <div class="form-row">
                <label for="modal-name">Name <span class="req">*</span></label>
                <input type="text" id="modal-name" name="name" required placeholder="Enter full name">
              </div>
              <div class="form-row">
                <label for="modal-whatsapp">WhatsApp Number <span class="req">*</span></label>
                <input type="tel" id="modal-whatsapp" name="whatsapp" required placeholder="10-digit WhatsApp number" pattern="[0-9]{10}" maxlength="10">
              </div>
            </div>
            <div class="form-two">
              <div class="form-row">
                <label for="modal-bill">Monthly Bill <span class="req">*</span></label>
                <select id="modal-bill" name="monthly_bill" required>
                  <option value="" disabled selected>Select Monthly Bill</option>
                  <option value="Under ₹1500">Under ₹1500</option>
                  <option value="₹1500-₹2000">₹1500 - ₹2000</option>
                  <option value="₹2500-₹4000">₹2500 - ₹4000</option>
                  <option value="₹4000-₹8000">₹4000 - ₹8000</option>
                  <option value="More than ₹8000">More than ₹8000</option>
                </select>
              </div>
              <div class="form-row">
                <label for="modal-pincode">PIN Code <span class="req">*</span></label>
                <input type="text" id="modal-pincode" name="pincode" required placeholder="6-digit PIN code" pattern="[0-9]{6}" maxlength="6">
              </div>
            </div>
            <div class="form-row">
              <label for="modal-note">Additional Note <span class="opt">(Optional)</span></label>
              <textarea id="modal-note" name="note" rows="2" placeholder="Tell us about your rooftop area, connection type, or special requirements..."></textarea>
            </div>
            <div class="form-terms-row">
              <label class="terms-label">
                <input type="checkbox" name="agree_terms" checked required onclick="return false;" onkeydown="return false;">
                <span class="terms-text">I agree to the <a href="terms.html" target="_blank" class="terms-link">Terms of Use</a> &amp; <a href="privacy.html" target="_blank" class="terms-link">Privacy Policy</a> and authorize Sor Connect to contact me via WhatsApp/Call.</span>
              </label>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Get Free Proposal</button>
            <p class="form-note" style="display:none; margin-top: 14px; font-size: 13.5px; font-weight: 600;"></p>
          </form>
        </div>
      `;
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  const modalOverlay = ensureQuoteModalExists();
  const modalCloseBtn = modalOverlay ? modalOverlay.querySelector('.quote-modal-close') : null;

  function openQuoteModal(titleText, descText) {
    if (!modalOverlay) return;
    if (titleText) {
      const titleEl = modalOverlay.querySelector('.quote-modal-title');
      if (titleEl) titleEl.textContent = titleText;
    }
    if (descText) {
      const descEl = modalOverlay.querySelector('.quote-modal-desc');
      if (descEl) descEl.textContent = descText;
    }
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Google Analytics 4 (GA4) Modal Open Event
    if (typeof gtag === 'function') {
      gtag('event', 'quote_modal_opened', {
        event_category: 'Engagement',
        event_label: titleText || 'Free Quote Modal',
        source_page: window.location.pathname
      });
    }

    // Auto-focus the first input
    setTimeout(() => {
      const firstInput = modalOverlay.querySelector('input[name="name"]');
      if (firstInput) firstInput.focus();
    }, 150);
  }

  function closeQuoteModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', function (e) {
      e.preventDefault();
      closeQuoteModal();
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) {
        closeQuoteModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeQuoteModal();
    }
  });

  // ===================== AUTOMATED CONTACT FORM POPUP (5 TIMES IN 5 MINUTES) =====================
  // Automatically pops up once every 1 minute of site exploration, up to 5 times maximum, stopping after 5 minutes.
  (function initAutomatedContactPopup() {
    // Never trigger on the administrative portal
    if (window.location.pathname.indexOf('/admprtl') !== -1 || window.location.pathname.indexOf('/admin') !== -1) {
      return;
    }

    const POPUP_INTERVAL_MS = 60 * 1000;         // 1 Minute (60,000 ms)
    const POPUP_MAX_DURATION_MS = 5 * 60 * 1000; // 5 Minutes (300,000 ms)
    const POPUP_MAX_COUNT = 5;                    // 5 Times Maximum

    // Check if user has already submitted an inquiry in this session
    try {
      if (sessionStorage.getItem('sor_form_submitted') === 'true') {
        return;
      }
    } catch (e) {
      return;
    }

    // Get or initialize session start timestamp
    let sessionStartTime = parseInt(sessionStorage.getItem('sor_session_start_time'), 10);
    if (!sessionStartTime || isNaN(sessionStartTime)) {
      sessionStartTime = Date.now();
      try {
        sessionStorage.setItem('sor_session_start_time', String(sessionStartTime));
      } catch (e) {}
    }

    // Check if 5 minutes have already expired
    if ((Date.now() - sessionStartTime) >= POPUP_MAX_DURATION_MS) {
      return;
    }

    // Get current popup counter
    let popupCount = parseInt(sessionStorage.getItem('sor_auto_popup_count'), 10) || 0;
    if (popupCount >= POPUP_MAX_COUNT) {
      return;
    }

    function triggerPopup() {
      // Re-verify conditions
      try {
        if (sessionStorage.getItem('sor_form_submitted') === 'true') return;
      } catch (e) {}

      const now = Date.now();
      const elapsed = now - sessionStartTime;

      if (elapsed >= POPUP_MAX_DURATION_MS) {
        try {
          sessionStorage.setItem('sor_auto_popup_count', String(POPUP_MAX_COUNT));
        } catch (e) {}
        return;
      }

      let count = parseInt(sessionStorage.getItem('sor_auto_popup_count'), 10) || 0;
      if (count >= POPUP_MAX_COUNT) return;

      // Only open if not already open
      const quoteOverlay = document.getElementById('quote-modal-overlay');
      const careersOverlay = document.getElementById('careers-modal-overlay');
      const isQuoteOpen = quoteOverlay && quoteOverlay.classList.contains('active');
      const isCareersOpen = careersOverlay && careersOverlay.classList.contains('active');

      if (!isQuoteOpen && !isCareersOpen) {
        openQuoteModal(
          'Connect with Sor Connect Solar Experts',
          'Explore your customized solar feasibility, tariff savings, and turnkey execution plan with our senior engineering team.'
        );
      }

      // Record this popup trigger
      count++;
      try {
        sessionStorage.setItem('sor_auto_popup_count', String(count));
      } catch (e) {}

      // Schedule next popup if under 5 times and under 5 minutes
      if (count < POPUP_MAX_COUNT && (Date.now() - sessionStartTime) < POPUP_MAX_DURATION_MS) {
        scheduleNext();
      }
    }

    function scheduleNext() {
      try {
        if (sessionStorage.getItem('sor_form_submitted') === 'true') return;
      } catch (e) {}

      const now = Date.now();
      const count = parseInt(sessionStorage.getItem('sor_auto_popup_count'), 10) || 0;
      if (count >= POPUP_MAX_COUNT) return;

      // Calculate target time for the next popup slot (1 min, 2 min, 3 min, 4 min, 5 min)
      const targetTime = sessionStartTime + (count + 1) * POPUP_INTERVAL_MS;
      if (targetTime > sessionStartTime + POPUP_MAX_DURATION_MS) return;

      const delay = Math.max(1000, targetTime - now);
      setTimeout(triggerPopup, delay);
    }

    // Initiate the scheduling for this page session
    scheduleNext();
  })();

  // ===================== CAREERS GLOBAL MODAL SYSTEM =====================
  let selectedResumeFile = null;

  function ensureCareersModalExists() {
    let overlay = document.getElementById('careers-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'careers-modal-overlay';
      overlay.className = 'quote-modal-overlay careers-modal-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.innerHTML = `
        <div class="quote-modal-container careers-modal-container">
          <button type="button" class="quote-modal-close careers-modal-close" aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div class="quote-modal-header">
            <div class="quote-modal-badge" style="background: rgba(34, 197, 94, 0.12); color: #15803d;">✦ Join Our Team ✦</div>
            <h3 class="quote-modal-title" style="font-size: 22px;">Apply for a Career at Sor Connect</h3>
            <p class="quote-modal-desc">Join India's rapid solar engineering revolution. Complete your profile below and our technical hiring team will review your application.</p>
          </div>
          <form class="contact-form modal-form" id="careers-modal-form" style="padding:0; border:none;">
            <div class="form-two">
              <div class="form-row">
                <label for="career-name">Full Name <span class="req">*</span></label>
                <input type="text" id="career-name" name="name" required placeholder="e.g. Rahul Sharma">
              </div>
              <div class="form-row">
                <label for="career-phone">WhatsApp / Phone Number <span class="req">*</span></label>
                <input type="tel" id="career-phone" name="phone" required placeholder="10-digit mobile number" pattern="[0-9]{10}" maxlength="10">
              </div>
            </div>
            <div class="form-two">
              <div class="form-row">
                <label for="career-email">Email Address <span class="req">*</span></label>
                <input type="email" id="career-email" name="email" required placeholder="e.g. rahul@example.com">
              </div>
              <div class="form-row">
                <label for="career-location">Current City &amp; State <span class="req">*</span></label>
                <input type="text" id="career-location" name="location" required placeholder="e.g. Jaipur, Rajasthan">
              </div>
            </div>
            <div class="form-two">
              <div class="form-row">
                <label for="career-position">Position Applied For <span class="req">*</span></label>
                <select id="career-position" name="position" required>
                  <option value="" disabled selected>Select Target Position</option>
                  <option value="Solar Design & PVsyst Engineer">Solar Design &amp; PVsyst Engineer</option>
                  <option value="Turnkey EPC Site Project Engineer">Turnkey EPC Site Project Engineer</option>
                  <option value="Electrical Supervisor & Commissioning Specialist">Electrical Supervisor &amp; Commissioning Specialist</option>
                  <option value="Solar Sales & Business Development Manager">Solar Sales &amp; Business Development Manager</option>
                  <option value="O&M Field Maintenance Engineer">O&amp;M Field Maintenance Engineer</option>
                  <option value="PM Surya Ghar & PM-KUSUM Liaison Executive">PM Surya Ghar &amp; PM-KUSUM Liaison Executive</option>
                  <option value="Supply Chain & Procurement Specialist">Supply Chain &amp; Procurement Specialist</option>
                  <option value="Quality Assurance / CEIG Regulatory Consultant">Quality Assurance / CEIG Regulatory Consultant</option>
                  <option value="Open Application / Other">Open Application / Other</option>
                </select>
              </div>
              <div class="form-row">
                <label for="career-experience">Total Relevant Experience <span class="req">*</span></label>
                <select id="career-experience" name="experience" required>
                  <option value="" disabled selected>Select Experience</option>
                  <option value="Fresher / Entry Level">Fresher / Entry Level (&lt; 1 Year)</option>
                  <option value="1 - 3 Years">1 - 3 Years</option>
                  <option value="3 - 5 Years">3 - 5 Years</option>
                  <option value="5 - 8 Years">5 - 8 Years</option>
                  <option value="8+ Years / Senior">8+ Years / Senior Specialist</option>
                </select>
              </div>
            </div>
            <div class="form-two">
              <div class="form-row">
                <label for="career-availability">Notice Period / Availability</label>
                <select id="career-availability" name="availability">
                  <option value="Immediate / < 15 Days">Immediate / Within 15 Days</option>
                  <option value="15 - 30 Days" selected>15 - 30 Days</option>
                  <option value="30 - 60 Days">30 - 60 Days</option>
                  <option value="60+ Days">60+ Days</option>
                </select>
              </div>
              <div class="form-row">
                <label for="career-portfolio">LinkedIn or Portfolio Link <span class="opt">(Optional)</span></label>
                <input type="url" id="career-portfolio" name="portfolio" placeholder="https://linkedin.com/in/yourprofile">
              </div>
            </div>
            <div class="form-row">
              <label>Attach Resume / CV <span class="opt">(PDF, DOC, DOCX up to 10MB)</span></label>
              <input type="file" id="career-file-input" accept=".pdf,.doc,.docx" style="display:none;">
              <div class="careers-dropzone" id="career-dropzone">
                <svg class="careers-dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p class="careers-dropzone-text">Click to upload or drag &amp; drop your resume</p>
                <p class="careers-dropzone-sub">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
              </div>
              <div class="careers-file-preview" id="career-file-preview">
                <div class="careers-file-info">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span id="career-file-name">filename.pdf</span>
                </div>
                <button type="button" class="careers-file-remove" id="career-file-remove" title="Remove attached resume">&times;</button>
              </div>
            </div>
            <div class="form-row">
              <label for="career-note">Cover Note / Key Highlights <span class="opt">(Optional)</span></label>
              <textarea id="career-note" name="cover_note" rows="2" placeholder="Tell us briefly about your solar projects, technical skills, or why you'd like to work with Sor Connect..."></textarea>
            </div>
            <div class="form-terms-row">
              <label class="terms-label">
                <input type="checkbox" name="agree_terms" checked required onclick="return false;" onkeydown="return false;">
                <span class="terms-text">I confirm that all details provided are accurate and authorize Sor Connect to contact me regarding career opportunities.</span>
              </label>
            </div>
            <button type="submit" class="btn btn-primary btn-block" id="career-submit-btn">Submit Application</button>
            <p class="careers-form-note" id="careers-form-note" style="display:none; margin-top: 14px; font-size: 13.5px; font-weight: 600;"></p>
          </form>
        </div>
      `;
      document.body.appendChild(overlay);

      // Bind close button
      const closeBtn = overlay.querySelector('.careers-modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
          e.preventDefault();
          closeCareersModal();
        });
      }

      // Close on background click
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          closeCareersModal();
        }
      });

      // Bind Dropzone events
      const dropzone = overlay.querySelector('#career-dropzone');
      const fileInput = overlay.querySelector('#career-file-input');
      const preview = overlay.querySelector('#career-file-preview');
      const fileNameEl = overlay.querySelector('#career-file-name');
      const removeBtn = overlay.querySelector('#career-file-remove');

      if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => fileInput.click());

        ['dragenter', 'dragover'].forEach(eventName => {
          dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.add('dragover');
          }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
          dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove('dragover');
          }, false);
        });

        dropzone.addEventListener('drop', (e) => {
          const files = e.dataTransfer.files;
          if (files && files[0]) {
            handleSelectedResume(files[0]);
          }
        });

        fileInput.addEventListener('change', () => {
          if (fileInput.files && fileInput.files[0]) {
            handleSelectedResume(fileInput.files[0]);
          }
        });
      }

      function handleSelectedResume(file) {
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
          alert('File size exceeds the 10MB limit. Please upload a smaller resume.');
          return;
        }
        selectedResumeFile = file;
        if (fileNameEl) fileNameEl.textContent = file.name;
        if (preview) preview.classList.add('active');
        if (dropzone) dropzone.style.display = 'none';
      }

      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          selectedResumeFile = null;
          if (fileInput) fileInput.value = '';
          if (preview) preview.classList.remove('active');
          if (dropzone) dropzone.style.display = 'block';
        });
      }

      // Bind Form Submission
      const form = overlay.querySelector('#careers-modal-form');
      const submitBtn = overlay.querySelector('#career-submit-btn');
      const noteEl = overlay.querySelector('#careers-form-note');

      if (form) {
        form.addEventListener('submit', async function(e) {
          e.preventDefault();
          if (noteEl) {
            noteEl.style.display = 'none';
            noteEl.textContent = '';
          }

          const nameVal = form.name.value.trim();
          const phoneVal = form.phone.value.trim();
          const emailVal = form.email.value.trim();
          const locVal = form.location.value.trim();
          const posVal = form.position.value;
          const expVal = form.experience.value;
          const availVal = form.availability ? form.availability.value : '15 - 30 Days';
          const portVal = form.portfolio ? form.portfolio.value.trim() : '';
          const noteVal = form.cover_note ? form.cover_note.value.trim() : '';

          if (!nameVal || !phoneVal || !emailVal || !locVal || !posVal || !expVal) {
            if (noteEl) {
              noteEl.textContent = 'Please fill out all required fields marked with *';
              noteEl.style.color = '#ef4444';
              noteEl.style.display = 'block';
            }
            return;
          }

          const phoneDigits = phoneVal.replace(/\D/g, '');
          if (phoneDigits.length < 10) {
            if (noteEl) {
              noteEl.textContent = 'Please enter a valid 10-digit mobile number.';
              noteEl.style.color = '#ef4444';
              noteEl.style.display = 'block';
            }
            return;
          }

          const originalText = submitBtn ? submitBtn.textContent : 'Submit Application';
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting Application...';
          }

          let resumeUrl = '';
          let resumeName = '';

          // Upload resume file if attached
          if (selectedResumeFile) {
            resumeName = selectedResumeFile.name;
            try {
              const base64Data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(selectedResumeFile);
              });

              const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: resumeName, data: base64Data })
              });
              const uploadJson = await uploadRes.json();
              if (uploadJson && uploadJson.url) {
                resumeUrl = uploadJson.url;
                resumeName = uploadJson.filename || resumeName;
              }
            } catch (upErr) {
              console.warn('[CAREERS UPLOAD WARNING]', upErr);
            }
          }

          const applicationPayload = {
            name: nameVal,
            phone: phoneVal,
            email: emailVal,
            location: locVal,
            position: posVal,
            experience: expVal,
            availability: availVal,
            portfolio: portVal,
            resume_url: resumeUrl,
            resume_name: resumeName,
            cover_note: noteVal,
            status: 'New'
          };

          // 1. Submit to internal server API
          try {
            await fetch('/api/careers/apply', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(applicationPayload)
            });
          } catch (apiErr) {
            console.warn('[CAREERS API FALLBACK]', apiErr);
          }

          // 2. Direct sync to Supabase careers table
          try {
            const SUPABASE_URL = 'https://znjpzipedsowuyrpotgb.supabase.co';
            const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuanB6aXBlZHNvd3V5cnBvdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwODU5MzIsImV4cCI6MjEwMTY2MTkzMn0.CO9Bvyiio-b2_OFDTyTd1jzGZ13Ezjl7oPwgIVciJxs';
            fetch(`${SUPABASE_URL}/rest/v1/careers`, {
              method: 'POST',
              headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify([applicationPayload])
            }).catch(() => {});
          } catch (supErr) {}

          // Reset and cleanup
          form.reset();
          selectedResumeFile = null;
          if (fileInput) fileInput.value = '';
          if (preview) preview.classList.remove('active');
          if (dropzone) dropzone.style.display = 'block';

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }

          closeCareersModal();

          // Show confirmation popup
          showEnquirySuccessPopup(
            "Application Received!",
            "Thank you for your interest in joining Sor Connect. Our recruitment team will review your qualifications and reach out to you within 48 to 72 hours."
          );
        });
      }
    }
    return overlay;
  }

  function openCareersModal(preselectedRole) {
    const overlay = ensureCareersModalExists();
    if (!overlay) return;

    if (preselectedRole) {
      const positionSelect = overlay.querySelector('#career-position');
      if (positionSelect) {
        let matched = false;
        for (let i = 0; i < positionSelect.options.length; i++) {
          if (positionSelect.options[i].value.toLowerCase().includes(preselectedRole.toLowerCase()) ||
              preselectedRole.toLowerCase().includes(positionSelect.options[i].value.toLowerCase())) {
            positionSelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched) {
          positionSelect.value = 'Open Application / Other';
        }
      }
    }

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Auto-focus first input
    setTimeout(() => {
      const firstInput = overlay.querySelector('input[name="name"]');
      if (firstInput) firstInput.focus();
    }, 150);
  }

  function closeCareersModal() {
    const overlay = document.getElementById('careers-modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const careersOverlay = document.getElementById('careers-modal-overlay');
      if (careersOverlay && careersOverlay.classList.contains('active')) {
        closeCareersModal();
      }
    }
  });

  // Attach modal trigger to all "Get a Free Quote" & "Request a Site Assessment" CTAs
  function attachModalTriggers() {
    // Careers modal triggers across the entire site
    const careersTriggers = document.querySelectorAll('[data-open-modal="careers"], [data-open-modal="career"], .btn-open-careers, a[href="careers.html"], a[href="/careers"], a[href="careers"]');
    careersTriggers.forEach(el => {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        const role = this.getAttribute('data-position') || this.getAttribute('data-role') || '';
        openCareersModal(role);
      });
    });

    const triggers = document.querySelectorAll('.nav-cta, [data-open-modal="quote"], .btn-open-quote');
    triggers.forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        const customTitle = this.getAttribute('data-modal-title') || 'Get a Free Solar Quote';
        const customDesc = this.getAttribute('data-modal-desc') || 'Share your details and monthly bill. Our engineers will prepare a customized zero-cost proposal.';
        openQuoteModal(customTitle, customDesc);
      });
    });

    // Also attach to home hero primary CTA if it says Request a Site Assessment
    const heroPrimaryBtn = document.querySelector('.hero-actions .btn-primary, .hero-inner-single .btn-primary');
    if (heroPrimaryBtn && (heroPrimaryBtn.textContent.includes('Assessment') || heroPrimaryBtn.textContent.includes('Quote') || heroPrimaryBtn.textContent.includes('Turnkey'))) {
      heroPrimaryBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openQuoteModal('Request a Free Site Assessment', 'Get an engineering assessment and feasibility report for your residential, commercial, or agricultural site.');
      });
    }

    // Also attach to bottom CTA banner buttons across pages
    const ctaBannerBtns = document.querySelectorAll('.cta-banner .btn-primary, .cta-banner a.btn');
    ctaBannerBtns.forEach(btn => {
      if (btn.getAttribute('href') === 'contact.html' || btn.getAttribute('href') === '/contact' || btn.getAttribute('href') === 'contact') {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          openQuoteModal('Start Your Solar Transition', 'Schedule a free consultation and customized turnkey feasibility assessment.');
        });
      }
    });
  }

  attachModalTriggers();

  // ===================== FORM VALIDATION & SUBMISSION HANDLER =====================
  const TARGET_EMAIL = 'sorconnect@gmail.com';
  const WEB3FORMS_ACCESS_KEY = typeof window !== 'undefined' && window.WEB3FORMS_ACCESS_KEY ? window.WEB3FORMS_ACCESS_KEY : "YOUR_ACCESS_KEY_HERE";

  function validateRevampedForm(formEl) {
    const nameInput = formEl.querySelector('input[name="name"]');
    const whatsappInput = formEl.querySelector('input[name="whatsapp"]') || formEl.querySelector('input[name="mobile"]');
    const billSelect = formEl.querySelector('select[name="monthly_bill"]');
    const pincodeInput = formEl.querySelector('input[name="pincode"]');
    const termsCheck = formEl.querySelector('input[name="agree_terms"]');

    if (nameInput && !nameInput.value.trim()) {
      return { valid: false, message: 'Please enter your full name.', input: nameInput };
    }

    if (whatsappInput) {
      const digits = whatsappInput.value.replace(/\D/g, '');
      if (!digits || digits.length < 10) {
        return { valid: false, message: 'Please enter a valid 10-digit WhatsApp number.', input: whatsappInput };
      }
    }

    if (billSelect && !billSelect.value) {
      return { valid: false, message: 'Please select your average monthly electricity bill.', input: billSelect };
    }

    if (pincodeInput) {
      const pinDigits = pincodeInput.value.replace(/\D/g, '');
      if (!pinDigits || pinDigits.length !== 6) {
        return { valid: false, message: 'Please enter a valid 6-digit PIN code.', input: pincodeInput };
      }
    }

    if (termsCheck && !termsCheck.checked) {
      return { valid: false, message: 'Please agree to the Terms of Use and Privacy Policy.', input: termsCheck };
    }

    return { valid: true };
  }

  // ===================== ENQUIRY SUCCESS POPUP SYSTEM =====================
  function createEnquirySuccessPopup() {
    if (document.getElementById('enquirySuccessPopup')) return;

    const overlay = document.createElement('div');
    overlay.className = 'enquiry-success-overlay';
    overlay.id = 'enquirySuccessPopup';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="enquiry-success-card">
        <button type="button" class="enquiry-popup-close" id="enquirySuccessClose" aria-label="Close popup">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div class="enquiry-success-icon-wrap">
          <div class="enquiry-success-glow"></div>
          <svg class="enquiry-success-svg" width="60" height="60" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="25" stroke="#34D399" stroke-width="3" class="svg-circle"/>
            <path d="M17 28.5L24.5 36L39 20" stroke="#34D399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="svg-check"/>
          </svg>
        </div>
        <div class="enquiry-success-badge">✦ Enquiry Received ✦</div>
        <h3 class="enquiry-success-title" id="enquirySuccessTitle">Enquiry Submitted Successfully!</h3>
        <p class="enquiry-success-desc" id="enquirySuccessDesc">Thank you for choosing Sor Connect. Our solar engineering division has received your enquiry and our team will connect with you via WhatsApp / Phone within 24 hours.</p>
        <div class="enquiry-success-meta">
          <div class="meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Consultation Response: <strong>Within 24 Hours</strong></span>
          </div>
        </div>
        <button type="button" class="btn btn-primary btn-block enquiry-popup-btn" id="enquirySuccessDone">Done</button>
      </div>
    `;
    document.body.appendChild(overlay);

    const closeBtn = document.getElementById('enquirySuccessClose');
    const doneBtn = document.getElementById('enquirySuccessDone');

    function hidePopup() {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }

    if (closeBtn) closeBtn.addEventListener('click', hidePopup);
    if (doneBtn) doneBtn.addEventListener('click', hidePopup);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) hidePopup();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        hidePopup();
      }
    });
  }

  function showEnquirySuccessPopup(title, desc) {
    createEnquirySuccessPopup();
    const overlay = document.getElementById('enquirySuccessPopup');
    if (!overlay) return;

    if (title) {
      const titleEl = document.getElementById('enquirySuccessTitle');
      if (titleEl) titleEl.textContent = title;
    }
    if (desc) {
      const descEl = document.getElementById('enquirySuccessDesc');
      if (descEl) descEl.textContent = desc;
    }

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function handleRevampedSubmit(formEl, noteEl, buttonEl, defaultSuccessText) {
    if (!formEl || !buttonEl) return;

    formEl.addEventListener('submit', function (e) {
      e.preventDefault();

      // Perform field validation
      const validation = validateRevampedForm(formEl);
      if (!validation.valid) {
        if (noteEl) {
          noteEl.textContent = validation.message;
          noteEl.style.color = '#B20F03';
          noteEl.style.display = 'block';
          noteEl.setAttribute('role', 'alert');
        } else {
          alert(validation.message);
        }
        if (validation.input) validation.input.focus();
        return;
      }

      const originalBtnText = buttonEl.textContent;
      buttonEl.textContent = 'Sending...';
      buttonEl.disabled = true;

      if (noteEl) {
        noteEl.style.display = 'none';
        noteEl.className = noteEl.className || 'form-note';
        noteEl.style.color = '';
        noteEl.removeAttribute('role');
      }

      const formData = new FormData(formEl);
      const formId = formEl.id || '';
      let subject = 'New Solar Quote Inquiry - Sor Connect';
      if (formId.startsWith('svc-')) {
        const serviceType = formId.replace('svc-', '').replace('-form', '').toUpperCase();
        subject = `Service Inquiry [${serviceType}] - Sor Connect`;
      } else if (formId === 'quote-modal-form') {
        subject = 'Instant Quote Modal Lead - Sor Connect';
      }

      formData.append('subject', subject);

      // Extract all form values
      const payloadObj = {};
      formData.forEach((value, key) => { payloadObj[key] = value; });

      // Direct submission to Sor Connect API database
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadObj)
      }).catch(() => {});

      // Direct submission to Supabase submissions table
      try {
        const SUPABASE_URL = 'https://znjpzipedsowuyrpotgb.supabase.co';
        const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuanB6aXBlZHNvd3V5cnBvdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwODU5MzIsImV4cCI6MjEwMTY2MTkzMn0.CO9Bvyiio-b2_OFDTyTd1jzGZ13Ezjl7oPwgIVciJxs';
        
        fetch(`${SUPABASE_URL}/rest/v1/submissions`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify([{
            name: payloadObj.name,
            whatsapp: payloadObj.whatsapp,
            monthly_bill: payloadObj.monthly_bill,
            pincode: payloadObj.pincode,
            note: payloadObj.note || '',
            status: 'New',
            subject: subject,
            source_url: window.location.href
          }])
        }).catch(() => {});
      } catch (e) {}

      // GA4 (Google Analytics 4) Lead Conversion Event
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          event_category: 'Lead',
          event_label: subject || formId,
          form_id: formId,
          source_page: window.location.pathname
        });
      }

      // UI Success Feedback: Close quote modal immediately if open and suppress further popups
      try {
        sessionStorage.setItem('sor_form_submitted', 'true');
      } catch (e) {}

      if (formId === 'quote-modal-form' || formEl.closest('.quote-modal-overlay')) {
        closeQuoteModal();
      }

      // Reset form fields and button state
      formEl.reset();
      const terms = formEl.querySelector('input[name="agree_terms"]');
      if (terms) terms.checked = true;
      buttonEl.textContent = originalBtnText;
      buttonEl.disabled = false;
      if (noteEl) noteEl.style.display = 'none';

      // Show user the enquiry success popup
      showEnquirySuccessPopup(
        "Enquiry Submitted Successfully!",
        defaultSuccessText || "Thank you for reaching out to Sor Connect. Our solar engineering team has received your details and will connect with you via WhatsApp / Phone within 24 hours."
      );
    });
  }

  // Bind Quote Modal Form
  const modalFormEl = document.getElementById('quote-modal-form');
  if (modalFormEl) {
    const modalBtn = modalFormEl.querySelector('button[type="submit"]');
    const modalNote = modalFormEl.querySelector('.form-note');
    handleRevampedSubmit(modalFormEl, modalNote, modalBtn, "Thank you! Our engineers will review your bill and contact you on WhatsApp with a tailored proposal.");
  }

  // Bind Main Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const btn = contactForm.querySelector('button[type="submit"]');
    const note = document.getElementById('form-note') || contactForm.querySelector('.form-note');
    handleRevampedSubmit(contactForm, note, btn, "Thank you! Your solar quotation request has been received. Our team will contact you shortly.");
  }

  // Bind all 6 Quick Quote Services Forms
  const quickQuoteFormIds = ['svc-epc-form', 'svc-inst-form', 'svc-om-form', 'svc-design-form', 'svc-kusum-form', 'svc-surya-form'];
  quickQuoteFormIds.forEach(id => {
    const formEl = document.getElementById(id);
    if (formEl) {
      const btn = formEl.querySelector('button[type="submit"]');
      const note = formEl.querySelector('.form-note');
      handleRevampedSubmit(formEl, note, btn, "Thank you! Your request has been received. We will send a customized proposal to your WhatsApp.");
    }
  });

  // Bind Home Page Showcase Form
  const homeContactForm = document.getElementById('home-contact-form');
  if (homeContactForm) {
    const btn = homeContactForm.querySelector('button[type="submit"]');
    const note = homeContactForm.querySelector('.form-note');
    handleRevampedSubmit(homeContactForm, note, btn, "Thank you! Our engineers will review your bill details and send a customized proposal to your WhatsApp.");
  }

  // ===================== CERTIFICATES & AWARDS AUTO-SLIDING SLIDESHOW =====================
  let certAutoSlideTimer = null;

  function initCertSlideshow() {
    const certSlideshow = document.getElementById('homeCertSlideshow');
    if (!certSlideshow) return;

    if (certAutoSlideTimer) {
      clearInterval(certAutoSlideTimer);
      certAutoSlideTimer = null;
    }

    const slides = certSlideshow.querySelectorAll('.cert-slide');
    if (slides.length === 0) return;

    const dotsContainer = document.getElementById('certDotsContainer');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.cert-dot') : [];
    const prevBtn = document.getElementById('certPrevBtn');
    const nextBtn = document.getElementById('certNextBtn');
    let currentIndex = 0;
    const intervalTime = 3800;

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentIndex);
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoSlide() {
      stopAutoSlide();
      certAutoSlideTimer = setInterval(nextSlide, intervalTime);
    }

    function stopAutoSlide() {
      if (certAutoSlideTimer) {
        clearInterval(certAutoSlideTimer);
        certAutoSlideTimer = null;
      }
    }

    if (nextBtn) {
      nextBtn.onclick = function () {
        nextSlide();
        startAutoSlide();
      };
    }

    if (prevBtn) {
      prevBtn.onclick = function () {
        prevSlide();
        startAutoSlide();
      };
    }

    dots.forEach((dot, idx) => {
      dot.onclick = function () {
        goToSlide(idx);
        startAutoSlide();
      };
    });

    const wrapper = certSlideshow.closest('.cert-slideshow-wrapper');
    if (wrapper) {
      wrapper.onmouseenter = stopAutoSlide;
      wrapper.onmouseleave = startAutoSlide;
      wrapper.ontouchstart = stopAutoSlide;
      wrapper.ontouchend = startAutoSlide;
    }

    // Touch swipe support
    let touchStartX = 0;
    certSlideshow.ontouchstart = function(e) {
      touchStartX = e.changedTouches[0].screenX;
    };

    certSlideshow.ontouchend = function(e) {
      let touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
        startAutoSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
        startAutoSlide();
      }
    };

    goToSlide(0);
    startAutoSlide();
  }

  // ===================== DYNAMIC AWARDS & RECOGNITIONS SYNC =====================
  function initDynamicAwards() {
    const certSlideshow = document.getElementById('homeCertSlideshow');
    const awardsGrid = document.querySelector('.awards-gallery-grid');
    if (!certSlideshow && !awardsGrid) return;

    const SUPABASE_URL = 'https://znjpzipedsowuyrpotgb.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuanB6aXBlZHNvd3V5cnBvdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwODU5MzIsImV4cCI6MjEwMTY2MTkzMn0.CO9Bvyiio-b2_OFDTyTd1jzGZ13Ezjl7oPwgIVciJxs';

    function renderDynamicAwards(awards) {
      if (!Array.isArray(awards) || awards.length === 0) return;
      awards.sort((a, b) => (Number(a.order !== undefined ? a.order : a.display_order) || 0) - (Number(b.order !== undefined ? b.order : b.display_order) || 0));

      // 1. Sync Grid on about.html
      if (awardsGrid) {
        awardsGrid.innerHTML = awards.map(a => {
          const badgeText = a.badge || 'Accreditation';
          const titleText = a.title || 'Award';
          const descText = a.description || '';
          const imgPath = a.image || 'assets/award-solarquarter-2025-stage.jpg';
          return `
            <div class="award-card-aesthetic" data-id="${a.id || ''}">
              <div class="award-img-box">
                <img src="${escapeHtmlUtil(imgPath)}" alt="${escapeHtmlUtil(titleText)}" loading="lazy" onerror="this.src='assets/award-solarquarter-2025-stage.jpg'">
                <span class="award-badge-pill">${escapeHtmlUtil(badgeText)}</span>
              </div>
              <div class="award-info-box">
                <h4>${escapeHtmlUtil(titleText)}</h4>
                <p>${escapeHtmlUtil(descText)}</p>
              </div>
            </div>
          `;
        }).join('');
      }

      // 2. Sync Slideshow on index.html
      if (certSlideshow) {
        certSlideshow.innerHTML = awards.map((a, idx) => {
          const badgeText = a.badge || 'Official Recognition';
          const titleText = a.title || 'Certified Excellence';
          const descText = a.description || '';
          const imgPath = a.image || 'assets/award-solarquarter-2025-stage.jpg';
          return `
            <div class="cert-slide ${idx === 0 ? 'active' : ''}" data-id="${a.id || ''}">
              <div class="cert-image-card">
                <img src="${escapeHtmlUtil(imgPath)}" alt="${escapeHtmlUtil(titleText)}" loading="${idx === 0 ? 'eager' : 'lazy'}" onerror="this.src='assets/award-solarquarter-2025-stage.jpg'">
              </div>
              <div class="cert-caption">
                <div class="cert-badge">${escapeHtmlUtil(badgeText)}</div>
                <h4>${escapeHtmlUtil(titleText)}</h4>
                <p>${escapeHtmlUtil(descText)}</p>
              </div>
            </div>
          `;
        }).join('');

        const dotsContainer = document.getElementById('certDotsContainer');
        if (dotsContainer) {
          dotsContainer.innerHTML = awards.map((_, idx) => 
            `<span class="cert-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></span>`
          ).join('');
        }

        // Re-initialize slideshow event handlers with the newly rendered slides
        initCertSlideshow();
      }
    }

    function escapeHtmlUtil(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // Try Supabase directly -> fallback to local API -> fallback to awards.json
    fetch(`${SUPABASE_URL}/rest/v1/awards?select=*&order=display_order.asc`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map(a => ({
            id: a.id,
            title: a.title,
            badge: a.badge,
            description: a.description,
            image: a.image,
            order: a.display_order
          }));
          renderDynamicAwards(formatted);
        } else {
          throw new Error('No awards in Supabase table');
        }
      })
      .catch(() => {
        fetch('/api/awards')
          .then(res => res.json())
          .then(data => {
            if (data && data.success && Array.isArray(data.awards) && data.awards.length > 0) {
              renderDynamicAwards(data.awards);
            } else {
              throw new Error('API failed');
            }
          })
          .catch(() => {
            fetch('awards.json')
              .then(res => res.json())
              .then(items => {
                if (Array.isArray(items) && items.length > 0) {
                  renderDynamicAwards(items);
                }
              })
              .catch(e => console.log('[AWARDS SYNC] Using pre-rendered static HTML:', e.message));
          });
      });
  }

  // Initialize both static slideshow & dynamic awards sync
  initCertSlideshow();
  initDynamicAwards();
  initDynamicServices();
  initDynamicPartners();

  // ===================== DYNAMIC SERVICES CMS SYNC =====================
  function initDynamicServices() {
    const contentArea = document.querySelector('.services-content-main');
    const sidebarNav = document.querySelector('.sidebar-nav-menu');
    if (!contentArea || !sidebarNav) return;

    const SUPABASE_URL = 'https://znjpzipedsowuyrpotgb.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuanB6aXBlZHNvd3V5cnBvdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwODU5MzIsImV4cCI6MjEwMTY2MTkzMn0.CO9Bvyiio-b2_OFDTyTd1jzGZ13Ezjl7oPwgIVciJxs';

    function escapeHtmlUtil(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function renderDynamicServices(services) {
      if (!Array.isArray(services) || services.length === 0) return;
      const activeServices = services.filter(s => s.is_active !== false);
      activeServices.sort((a, b) => (Number(a.display_order !== undefined ? a.display_order : a.order) || 0) - (Number(b.display_order !== undefined ? b.display_order : b.order) || 0));
      if (activeServices.length === 0) return;

      const currentHash = (window.location.hash || '').replace('#', '');
      let activeSlug = activeServices[0].slug;
      if (currentHash && activeServices.some(s => s.slug === currentHash)) {
        activeSlug = currentHash;
      }

      // 1. Render Sidebar Navigation
      sidebarNav.innerHTML = activeServices.map(s => {
        const isActive = s.slug === activeSlug;
        return `
          <a href="#${escapeHtmlUtil(s.slug)}" class="${isActive ? 'active' : ''}">
            <span>${escapeHtmlUtil(s.nav_title || s.title)}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </a>
        `;
      }).join('');

      // 2. Render Main Service Tabs Content
      contentArea.innerHTML = activeServices.map(s => {
        const isActive = s.slug === activeSlug;
        const slug = escapeHtmlUtil(s.slug);
        const offers = Array.isArray(s.offers) ? s.offers : [];
        const standoutPoints = Array.isArray(s.standout_points) ? s.standout_points : [];
        const faqs = Array.isArray(s.faqs) ? s.faqs : [];

        return `
          <div id="${slug}" class="svc-tab-content ${isActive ? 'active' : ''}">
            <div class="svc-header-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>${escapeHtmlUtil(s.badge || 'Turnkey EPC Solutions')}</span>
            </div>
            <h2 class="svc-content-title">${escapeHtmlUtil(s.title)}</h2>
            ${s.subtitle ? `<div class="svc-content-subtitle">${escapeHtmlUtil(s.subtitle)}</div>` : ''}
            ${s.description ? `<p class="svc-content-desc">${escapeHtmlUtil(s.description)}</p>` : ''}

            ${(s.image_1 || s.image_2) ? `
            <div class="svc-img-row">
              ${s.image_1 ? `
              <div class="svc-img-item">
                <img src="${escapeHtmlUtil(s.image_1)}" alt="${escapeHtmlUtil(s.title)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="svc-img-fallback-text" style="display:none; flex-direction:column; justify-content:center; align-items:center; color:rgba(255,255,255,0.75); font-family:var(--label); font-size:12px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase;">
                  <span>Sor Connect</span>
                  <span style="font-size:10px; font-weight:500; opacity:0.6; margin-top:4px;">${escapeHtmlUtil(s.nav_title || s.title)}</span>
                </div>
                ${s.image_1_caption ? `<span class="svc-img-caption-pill">${escapeHtmlUtil(s.image_1_caption)}</span>` : ''}
              </div>` : ''}
              ${s.image_2 ? `
              <div class="svc-img-item">
                <img src="${escapeHtmlUtil(s.image_2)}" alt="${escapeHtmlUtil(s.title)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="svc-img-fallback-text" style="display:none; flex-direction:column; justify-content:center; align-items:center; color:rgba(255,255,255,0.75); font-family:var(--label); font-size:12px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase;">
                  <span>Sor Connect</span>
                  <span style="font-size:10px; font-weight:500; opacity:0.6; margin-top:4px;">${escapeHtmlUtil(s.nav_title || s.title)}</span>
                </div>
                ${s.image_2_caption ? `<span class="svc-img-caption-pill">${escapeHtmlUtil(s.image_2_caption)}</span>` : ''}
              </div>` : ''}
            </div>` : ''}

            ${offers.length > 0 ? `
            <div class="svc-offer-box">
              <h3>${escapeHtmlUtil(s.offers_heading || 'What We Offer')}</h3>
              <div class="svc-offer-grid">
                ${offers.map(off => `
                <div class="svc-offer-card">
                  <div class="svc-offer-card-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <div class="svc-offer-card-text">
                    <strong>${escapeHtmlUtil(off.title || '')}</strong>
                    ${escapeHtmlUtil(off.desc || '')}
                  </div>
                </div>
                `).join('')}
              </div>
            </div>` : ''}

            ${standoutPoints.length > 0 ? `
            <div class="svc-standout-box">
              <h3>${escapeHtmlUtil(s.standout_heading || 'Why Our Services Stand Out')}</h3>
              <div class="svc-index-list">
                ${standoutPoints.map((pt, pidx) => `
                <div class="svc-index-item">
                  <div class="svc-index-num">${escapeHtmlUtil(pt.num || (pidx + 1 < 10 ? '0' + (pidx + 1) : String(pidx + 1)))}</div>
                  <div class="svc-index-content">
                    <h4>${escapeHtmlUtil(pt.title || '')}</h4>
                    <p>${escapeHtmlUtil(pt.desc || '')}</p>
                  </div>
                </div>
                `).join('')}
              </div>
            </div>` : ''}

            ${faqs.length > 0 ? `
            <div class="svc-faq-box">
              <h3>Frequently Asked Questions</h3>
              <div class="faq-accordion">
                ${faqs.map(faq => `
                <div class="faq-item">
                  <button class="faq-trigger" type="button">
                    <span>${escapeHtmlUtil(faq.q || '')}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 5l7 7-7 7"/></svg>
                  </button>
                  <div class="faq-content">
                    <div class="faq-content-inner">
                      ${escapeHtmlUtil(faq.a || '')}
                    </div>
                  </div>
                </div>
                `).join('')}
              </div>
            </div>` : ''}

            <!-- In-page form -->
            <div class="svc-form-box">
              <div class="svc-form-info">
                <span class="sub">${escapeHtmlUtil(s.form_sub || (s.title + ' Consultation'))}</span>
                <h3>${escapeHtmlUtil(s.form_title || 'Get a Turnkey Quote for Your Project')}</h3>
                <p>${escapeHtmlUtil(s.form_desc || 'Submit your site requirements and contact details. Our engineering division will share a custom quote within 24 hours.')}</p>
              </div>
              <div class="svc-form-inputs">
                <form class="contact-form svc-dynamic-form" id="svc-${slug}-form" data-service="${escapeHtmlUtil(s.title)}" style="padding:0; border:none;">
                  <div class="form-two">
                    <div class="form-row">
                      <label for="${slug}-name">Name <span class="req">*</span></label>
                      <input type="text" id="${slug}-name" name="name" required placeholder="Enter full name">
                    </div>
                    <div class="form-row">
                      <label for="${slug}-whatsapp">WhatsApp Number <span class="req">*</span></label>
                      <input type="tel" id="${slug}-whatsapp" name="whatsapp" required placeholder="10-digit WhatsApp number" pattern="[0-9]{10}" maxlength="10">
                    </div>
                  </div>
                  <div class="form-two">
                    <div class="form-row">
                      <label for="${slug}-bill">Monthly Electricity Bill <span class="req">*</span></label>
                      <select id="${slug}-bill" name="monthly_bill" required>
                        <option value="" disabled selected>Select Monthly Bill</option>
                        <option value="Under ₹1500">Under ₹1500</option>
                        <option value="₹1500-₹2000">₹1500 - ₹2000</option>
                        <option value="₹2500-₹4000">₹2500 - ₹4000</option>
                        <option value="₹4000-₹8000">₹4000 - ₹8000</option>
                        <option value="More than ₹8000">More than ₹8000</option>
                      </select>
                    </div>
                    <div class="form-row">
                      <label for="${slug}-pincode">PIN Code <span class="req">*</span></label>
                      <input type="text" id="${slug}-pincode" name="pincode" required placeholder="6-digit PIN code" pattern="[0-9]{6}" maxlength="6">
                    </div>
                  </div>
                  <div class="form-row">
                    <label for="${slug}-note">Additional Note <span class="opt">(Optional)</span></label>
                    <textarea id="${slug}-note" name="note" rows="2" placeholder="Tell us about your requirements..."></textarea>
                  </div>
                  <div class="form-terms-row">
                    <label class="terms-label">
                      <input type="checkbox" name="agree_terms" checked required onclick="return false;" onkeydown="return false;">
                      <span class="terms-text">I agree to the <a href="terms.html" target="_blank" class="terms-link">Terms of Use</a> &amp; <a href="privacy.html" target="_blank" class="terms-link">Privacy Policy</a> and authorize Sor Connect to contact me via WhatsApp/Call.</span>
                    </label>
                  </div>
                  <button type="submit" class="btn btn-primary btn-block">${escapeHtmlUtil(s.form_btn || 'Get Quotation')}</button>
                  <p class="form-note" style="display:none; margin-top: 14px; font-size: 13.5px; font-weight: 600;"></p>
                </form>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Wire up tab switching on newly rendered elements
      const sidebarLinks = sidebarNav.querySelectorAll('a');
      const tabs = contentArea.querySelectorAll('.svc-tab-content');

      function switchTab(targetId) {
        if (!targetId) return;
        const id = targetId.replace('#', '');
        const activeTab = document.getElementById(id);
        const activeLink = sidebarNav.querySelector(`a[href="#${id}"]`);

        if (activeTab && activeLink) {
          sidebarLinks.forEach(link => link.classList.remove('active'));
          tabs.forEach(tab => tab.classList.remove('active'));
          activeLink.classList.add('active');
          activeTab.classList.add('active');

          if (window.innerWidth < 992) {
            contentArea.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }

      sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          switchTab(targetId);
          history.pushState(null, null, targetId);
        });
      });

      // Wire up FAQ Accordions
      const faqItems = contentArea.querySelectorAll('.faq-item');
      faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');
        if (trigger && content) {
          trigger.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            faqItems.forEach(el => {
              el.classList.remove('active');
              const c = el.querySelector('.faq-content');
              if (c) c.style.maxHeight = null;
            });
            if (!isActive) {
              item.classList.add('active');
              content.style.maxHeight = content.scrollHeight + 'px';
            }
          });
        }
      });

      // Wire up Consultation Forms to Submissions API
      const dynamicForms = contentArea.querySelectorAll('.svc-dynamic-form');
      dynamicForms.forEach(formEl => {
        const btn = formEl.querySelector('button[type="submit"]');
        const note = formEl.querySelector('.form-note');
        handleRevampedSubmit(formEl, note, btn, "Thank you! Your quotation request has been received. Our engineering division will share a customized proposal on your WhatsApp.");
      });
    }

    // Direct Supabase -> local API -> services.json
    fetch(`${SUPABASE_URL}/rest/v1/services?select=*&order=display_order.asc`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          renderDynamicServices(data);
        } else {
          throw new Error('No services in Supabase');
        }
      })
      .catch(() => {
        fetch('/api/services')
          .then(res => res.json())
          .then(data => {
            if (data && data.success && Array.isArray(data.services) && data.services.length > 0) {
              renderDynamicServices(data.services);
            } else {
              throw new Error('API failed');
            }
          })
          .catch(() => {
            fetch('services.json')
              .then(res => res.json())
              .then(items => {
                if (Array.isArray(items) && items.length > 0) {
                  renderDynamicServices(items);
                }
              })
              .catch(e => console.log('[SERVICES SYNC] Using pre-rendered static HTML:', e.message));
          });
      });
  }

  // ===================== DYNAMIC PARTNERS CMS SYNC =====================
  function initDynamicPartners() {
    const partnerStrips = document.querySelectorAll('.partner-strip');
    if (!partnerStrips || partnerStrips.length === 0) return;

    const SUPABASE_URL = 'https://znjpzipedsowuyrpotgb.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuanB6aXBlZHNvd3V5cnBvdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwODU5MzIsImV4cCI6MjEwMTY2MTkzMn0.CO9Bvyiio-b2_OFDTyTd1jzGZ13Ezjl7oPwgIVciJxs';

    function escapeHtmlUtil(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function renderDynamicPartners(partners) {
      if (!Array.isArray(partners) || partners.length === 0) return;
      const activePartners = partners.filter(p => p.is_active !== false);
      activePartners.sort((a, b) => (Number(a.display_order !== undefined ? a.display_order : a.order) || 0) - (Number(b.display_order !== undefined ? b.display_order : b.order) || 0));
      if (activePartners.length === 0) return;

      const isAboutPage = window.location.pathname.includes('about.html');

      partnerStrips.forEach(strip => {
        strip.innerHTML = activePartners.map(p => {
          const logoSrc = p.logo || 'assets/reliance-logo.jpeg';
          const tierBadge = p.tier_badge || 'Channel Partner';
          const name = p.name || 'Partner';
          const role = p.role || tierBadge;
          const previewImg = p.preview_image;
          const desc = p.description || '';
          const features = Array.isArray(p.features) ? p.features : [];

          if (isAboutPage) {
            return `
              <div class="partner-card" data-id="${p.id || ''}">
                <div class="partner-card-header">
                  <div class="partner-logo-box"><img src="${escapeHtmlUtil(logoSrc)}" alt="${escapeHtmlUtil(name)} logo" onerror="this.parentElement.classList.add('logo--fallback');"></div>
                  <span class="partner-tier-badge">${escapeHtmlUtil(tierBadge)}</span>
                </div>
                ${previewImg ? `
                <div class="partner-visual-preview">
                  <img src="${escapeHtmlUtil(previewImg)}" alt="${escapeHtmlUtil(name)}" loading="lazy" style="object-fit: contain; padding: 6px;">
                </div>` : ''}
                <div class="pname">${escapeHtmlUtil(name)}</div>
                ${role ? `<div class="prole" style="font-weight: 600; font-size: 13.5px; color: var(--leaf); margin-bottom: 8px;">${escapeHtmlUtil(role)}</div>` : ''}
                <p>${escapeHtmlUtil(desc)}</p>
              </div>
            `;
          }

          // Home page index.html
          return `
            <div class="partner-card" data-id="${p.id || ''}">
              <div class="partner-card-header">
                <div class="partner-logo-box">
                  <img src="${escapeHtmlUtil(logoSrc)}" alt="${escapeHtmlUtil(name)} logo" onerror="this.parentElement.classList.add('logo--fallback');">
                </div>
                <span class="partner-tier-badge">${escapeHtmlUtil(tierBadge)}</span>
              </div>
              ${previewImg ? `
              <div class="partner-visual-preview">
                <img src="${escapeHtmlUtil(previewImg)}" alt="${escapeHtmlUtil(name)}" loading="lazy" style="object-fit: contain; padding: 6px;">
              </div>` : ''}
              <div class="pname">${escapeHtmlUtil(name)}</div>
              <p>${escapeHtmlUtil(desc)}</p>
              ${features.length > 0 ? `
              <ul class="partner-features">
                ${features.map(f => `
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5" /></svg>
                  <span>${escapeHtmlUtil(f)}</span>
                </li>
                `).join('')}
              </ul>` : ''}
            </div>
          `;
        }).join('');
      });
    }

    fetch(`${SUPABASE_URL}/rest/v1/partners?select=*&order=display_order.asc`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          renderDynamicPartners(data);
        } else {
          throw new Error('No partners in Supabase');
        }
      })
      .catch(() => {
        fetch('/api/partners')
          .then(res => res.json())
          .then(data => {
            if (data && data.success && Array.isArray(data.partners) && data.partners.length > 0) {
              renderDynamicPartners(data.partners);
            } else {
              throw new Error('API failed');
            }
          })
          .catch(() => {
            fetch('partners.json')
              .then(res => res.json())
              .then(items => {
                if (Array.isArray(items) && items.length > 0) {
                  renderDynamicPartners(items);
                }
              })
              .catch(e => console.log('[PARTNERS SYNC] Using pre-rendered static HTML:', e.message));
          });
      });
  }

  // ===================== ABOUT US DYNAMIC IMAGE CAROUSEL =====================
  initAboutCarousel();

  function initAboutCarousel() {
    const track = document.getElementById('about-carousel-track');
    const stage = document.getElementById('about-carousel-container');
    if (!track || !stage) return;

    const dotsWrap = document.getElementById('about-carousel-dots');
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    const currNum = document.getElementById('carousel-curr-num');
    const totalNum = document.getElementById('carousel-total-num');

    let currentIndex = 0;
    let autoSlideTimer = null;
    let slidesData = [];

    // Helper to format 2-digit number (e.g. 01, 05)
    function pad2(n) {
      return (n < 10 ? '0' : '') + n;
    }

    // Attach click listeners to initial static dots
    if (dotsWrap) {
      dotsWrap.querySelectorAll('.carousel-dot').forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          goToSlide(idx);
          resetAutoSlide();
        });
      });
    }

    function renderSlides(items) {
      if (!Array.isArray(items) || items.length === 0) return;
      slidesData = items;

      track.innerHTML = '';
      if (dotsWrap) dotsWrap.innerHTML = '';

      items.forEach((item, idx) => {
        const isActive = idx === 0;
        const slideEl = document.createElement('div');
        slideEl.className = `about-carousel-slide ${isActive ? 'active' : ''}`;
        slideEl.setAttribute('data-slide-index', idx);

        const badgeText = item.badge || 'Field Showcase';
        const titleText = item.title || 'Sor Connect Solar Installation';
        const descText = item.description || item.subtitle || '';
        const imgPath = item.image || 'assets/our-team.jpg';

        slideEl.innerHTML = `
          <div class="about-slide-card">
            <img src="${imgPath}" alt="${escapeHtml(titleText)}" loading="${idx === 0 ? 'eager' : 'lazy'}" onerror="this.src='assets/our-team.jpg'">
            <div class="about-slide-scrim"></div>
            <div class="slide-floating-tag">
              <span class="tag-dot"></span>
              <span class="tag-text">${escapeHtml(badgeText)}</span>
            </div>
            <div class="about-slide-overlay-content">
              <h3 class="about-slide-title">${escapeHtml(titleText)}</h3>
              ${descText ? `<p class="about-slide-desc">${escapeHtml(descText)}</p>` : ''}
            </div>
          </div>
        `;
        track.appendChild(slideEl);

        if (dotsWrap) {
          const dotBtn = document.createElement('button');
          dotBtn.type = 'button';
          dotBtn.className = `carousel-dot ${isActive ? 'active' : ''}`;
          dotBtn.setAttribute('data-index', idx);
          dotBtn.setAttribute('aria-label', `Go to slide ${idx + 1}`);
          dotBtn.addEventListener('click', () => {
            goToSlide(idx);
            resetAutoSlide();
          });
          dotsWrap.appendChild(dotBtn);
        }
      });

      if (totalNum) totalNum.textContent = pad2(items.length);
      currentIndex = 0;
      updateUI();
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function updateUI() {
      const slides = track.querySelectorAll('.about-carousel-slide');
      if (slides.length === 0) return;

      slides.forEach((s, idx) => {
        s.classList.toggle('active', idx === currentIndex);
      });

      if (dotsWrap) {
        const dots = dotsWrap.querySelectorAll('.carousel-dot');
        dots.forEach((d, idx) => {
          d.classList.toggle('active', idx === currentIndex);
        });
      }

      if (currNum) currNum.textContent = pad2(currentIndex + 1);
      if (totalNum) totalNum.textContent = pad2(slides.length);
    }

    function goToSlide(idx) {
      const slides = track.querySelectorAll('.about-carousel-slide');
      if (slides.length === 0) return;
      currentIndex = (idx + slides.length) % slides.length;
      updateUI();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(() => {
        nextSlide();
      }, 4000);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    // Attach button listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
      });
    }

    // Pause on hover
    stage.addEventListener('mouseenter', stopAutoSlide);
    stage.addEventListener('mouseleave', startAutoSlide);
    stage.addEventListener('touchstart', stopAutoSlide, { passive: true });
    stage.addEventListener('touchend', startAutoSlide, { passive: true });

    // Touch swipe support
    let touchStartX = 0;
    stage.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stage.addEventListener('touchend', function(e) {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
        resetAutoSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
        resetAutoSlide();
      }
    }, { passive: true });

    // Keyboard navigation when hovered
    stage.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoSlide();
      }
    });

    // Initialize UI and start auto-slide immediately for pre-rendered slides
    updateUI();
    startAutoSlide();

    // Fetch dynamic slides: Try Supabase -> local API -> bundled JSON
    const SUPABASE_URL = 'https://znjpzipedsowuyrpotgb.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuanB6aXBlZHNvd3V5cnBvdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwODU5MzIsImV4cCI6MjEwMTY2MTkzMn0.CO9Bvyiio-b2_OFDTyTd1jzGZ13Ezjl7oPwgIVciJxs';

    fetch(`${SUPABASE_URL}/rest/v1/about_gallery?select=*&order=display_order.asc`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map(s => ({
            id: s.id,
            title: s.title,
            subtitle: s.subtitle,
            badge: s.badge,
            location: s.location,
            description: s.description,
            image: s.image,
            order: s.display_order
          }));
          renderSlides(formatted);
        } else {
          throw new Error('No slides in Supabase table');
        }
      })
      .catch(err => {
        // Fallback to local server API or bundled JSON
        fetch('/api/about-gallery')
          .then(res => res.json())
          .then(data => {
            if (data && data.success && Array.isArray(data.items) && data.items.length > 0) {
              renderSlides(data.items);
            }
          })
          .catch(() => {
            fetch('about_gallery.json')
              .then(res => res.json())
              .then(items => {
                if (Array.isArray(items) && items.length > 0) renderSlides(items);
              })
              .catch(e => console.log('[ABOUT CAROUSEL] Using static HTML slides:', e.message));
          });
      })
      .finally(() => {
        updateUI();
        startAutoSlide();
      });
  }

  // ===================== GA4 CONTACT & CALL CLICK TRACKING =====================
  document.addEventListener('click', function (e) {
    const telLink = e.target.closest('a[href^="tel:"]');
    if (telLink && typeof gtag === 'function') {
      gtag('event', 'contact_call', {
        event_category: 'Contact',
        event_label: telLink.getAttribute('href'),
        source_page: window.location.pathname
      });
    }

    const waLink = e.target.closest('a[href*="whatsapp.com"], a[href*="wa.me"]');
    if (waLink && typeof gtag === 'function') {
      gtag('event', 'contact_whatsapp', {
        event_category: 'Contact',
        event_label: waLink.getAttribute('href'),
        source_page: window.location.pathname
      });
    }
  });

  // ===================== DYNAMIC SITE-WIDE CONTENT & VISUALS HYDRATION =====================
  initDynamicSiteContent();

  function initDynamicSiteContent() {
    const SUPABASE_URL = 'https://znjpzipedsowuyrpotgb.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuanB6aXBlZHNvd3V5cnBvdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwODU5MzIsImV4cCI6MjEwMTY2MTkzMn0.CO9Bvyiio-b2_OFDTyTd1jzGZ13Ezjl7oPwgIVciJxs';

    function applyContentToDOM(items) {
      if (!Array.isArray(items) || items.length === 0) return;
      items.forEach(item => {
        if (!item || !item.id) return;
        const elements = document.querySelectorAll(`[data-cms="${item.id}"]`);
        if (!elements || elements.length === 0) return;

        const val = item.stat_value;
        const suffix = item.stat_suffix || '';

        elements.forEach(el => {
          const field = el.getAttribute('data-cms-field');
          let targetVal = val;
          if (field === 'description' || field === 'desc') {
            targetVal = item.description;
          } else if (field === 'suffix') {
            targetVal = item.stat_suffix;
          } else if (field === 'label') {
            targetVal = item.label;
          }

          if (el.tagName === 'IMG') {
            if (field === 'suffix' && item.stat_suffix) {
              el.src = item.stat_suffix;
            } else if (targetVal) {
              el.src = targetVal;
            }
            if (suffix && field !== 'suffix') el.alt = suffix;
          } else if (el.hasAttribute('data-cms-bg')) {
            const bgVal = (field === 'suffix') ? item.stat_suffix : targetVal;
            if (bgVal) {
              if (el.classList.contains('svc-section')) {
                el.style.backgroundImage = `radial-gradient(circle at 50% 15%, rgba(52, 211, 153, 0.15) 0%, transparent 60%), linear-gradient(180deg, rgba(6, 22, 16, 0.76) 0%, rgba(8, 28, 20, 0.54) 45%, rgba(5, 18, 13, 0.82) 100%), url("${bgVal}")`;
              } else {
                el.style.backgroundImage = `url("${bgVal}")`;
              }
            }
          } else if (el.tagName === 'A') {
            if (field === 'href') {
              if (item.stat_suffix) el.href = item.stat_suffix;
              else if (targetVal) el.href = targetVal;
            } else {
              if (targetVal !== undefined && targetVal !== null) el.textContent = targetVal;
              if (suffix && (suffix.startsWith('http') || suffix.startsWith('tel:') || suffix.startsWith('mailto:') || suffix.startsWith('#') || suffix.endsWith('.html'))) {
                el.href = suffix;
              }
            }
          } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            if (targetVal !== undefined && targetVal !== null) el.value = targetVal;
          } else {
            if (targetVal !== undefined && targetVal !== null) {
              if (String(targetVal).includes('<') && String(targetVal).includes('>')) {
                el.innerHTML = targetVal;
              } else {
                el.textContent = targetVal;
              }
            }
          }
        });
      });
    }

    // 1. Fetch from Supabase website_stats (which houses all dynamic content keys)
    fetch(`${SUPABASE_URL}/rest/v1/website_stats?select=*`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    })
    .then(r => {
      if (r.ok) return r.json();
      throw new Error('Supabase fetch failed');
    })
    .then(items => {
      if (Array.isArray(items) && items.length > 0) {
        applyContentToDOM(items);
      }
    })
    .catch(() => {
      // 2. Fallback to /api/site-content -> site_content.json
      fetch('/api/site-content')
        .then(r => r.ok ? r.json() : null)
        .then(d => {
          if (d && Array.isArray(d.items)) {
            applyContentToDOM(d.items);
          } else {
            throw new Error('API failed');
          }
        })
        .catch(() => {
          fetch('site_content.json')
            .then(r => r.ok ? r.json() : [])
            .then(items => applyContentToDOM(items))
            .catch(() => {});
        });
    });
  }

});
