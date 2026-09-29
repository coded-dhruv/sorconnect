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
    const statNumElements = document.querySelectorAll('.stat-block .num, .readout-item .val, .stat-num');
    if (statNumElements.length > 0) {
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
    }

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

  // Attach modal trigger to all "Get a Free Quote" & "Request a Site Assessment" CTAs
  function attachModalTriggers() {
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

      // UI Success Feedback: Close quote modal immediately if open
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
  const certSlideshow = document.getElementById('homeCertSlideshow');
  if (certSlideshow) {
    const slides = certSlideshow.querySelectorAll('.cert-slide');
    const dotsContainer = document.getElementById('certDotsContainer');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.cert-dot') : [];
    const prevBtn = document.getElementById('certPrevBtn');
    const nextBtn = document.getElementById('certNextBtn');
    let currentIndex = 0;
    let autoSlideTimer = null;
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
        if (idx === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
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
      autoSlideTimer = setInterval(nextSlide, intervalTime);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        startAutoSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        startAutoSlide();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', function () {
        goToSlide(idx);
        startAutoSlide();
      });
    });

    const wrapper = certSlideshow.closest('.cert-slideshow-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', stopAutoSlide);
      wrapper.addEventListener('mouseleave', startAutoSlide);
      wrapper.addEventListener('touchstart', stopAutoSlide, { passive: true });
      wrapper.addEventListener('touchend', startAutoSlide, { passive: true });
    }

    // Touch swipe support
    let touchStartX = 0;
    certSlideshow.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    certSlideshow.addEventListener('touchend', function(e) {
      let touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
        startAutoSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
        startAutoSlide();
      }
    }, { passive: true });

    startAutoSlide();
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

});
