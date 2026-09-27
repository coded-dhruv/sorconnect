// Sor Connect — Shared Site Behaviour & Interactions

document.addEventListener('DOMContentLoaded', function () {

  // ===================== CLEAN URL & ROUTE MANAGEMENT =====================
  // Beautify browser address bar so /index.html displays as /home, and clean .html extensions
  if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
    try {
      if (window.location.protocol.indexOf('http') === 0) {
        var currentPath = window.location.pathname;
        var searchStr = window.location.search || '';
        var hashStr = window.location.hash || '';
        var dir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
        var file = currentPath.substring(currentPath.lastIndexOf('/') + 1);

        if (file === '' || file === 'index.html' || file === 'index') {
          window.history.replaceState(null, document.title, dir + 'home' + searchStr + hashStr);
        } else if (file.endsWith('.html')) {
          var cleanFile = file.replace(/\.html$/, '');
          window.history.replaceState(null, document.title, dir + cleanFile + searchStr + hashStr);
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
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // ===================== HEADER SCROLL STATE =====================
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

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

    // 2. Count-up statistics ticker bar
    const readoutItems = document.querySelectorAll('.readout-item');
    if (readoutItems.length > 0) {
      readoutItems.forEach(item => {
        const valEl = item.querySelector('.val');
        if (valEl) {
          const rawText = valEl.textContent;
          const numValue = parseInt(rawText.replace(/[^0-9]/g, ''), 10);
          const suffix = rawText.replace(/[0-9]/g, '');

          if (!isNaN(numValue)) {
            const countData = { value: 0 };
            gsap.to(countData, {
              value: numValue,
              duration: 1.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 92%',
                toggleActions: 'play none none none'
              },
              onUpdate: () => {
                valEl.innerHTML = Math.floor(countData.value) + `<span style="font-size:15px;">${suffix}</span>`;
              }
            });
          }
        }
      });
    }

    // 3. Staggered reveals for cards and grids
    gsap.utils.toArray('.card-grid, .stats-strip, .partner-strip, .offices-grid, .process-nav').forEach(container => {
      const items = container.querySelectorAll('.card, .stat-block, .partner-card, .office-col-card, .process-nav-btn');
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

  // ===================== PROCESS TABS (HOME) =====================
  const processBtns = document.querySelectorAll('.process-nav-btn');
  const processTabs = document.querySelectorAll('.process-tab-content');
  const processActiveImg = document.getElementById('process-active-img');
  const processCurrentStep = document.getElementById('process-current-step');

  if (processBtns.length > 0 && processActiveImg) {
    processBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const targetTabId = this.getAttribute('data-tab');
        const targetImgSrc = this.getAttribute('data-img');
        const targetStep = this.getAttribute('data-step') || '01';
        const targetTab = document.getElementById(targetTabId);

        if (targetTab) {
          processBtns.forEach(b => b.classList.remove('active'));
          processTabs.forEach(t => t.classList.remove('active'));

          this.classList.add('active');
          targetTab.classList.add('active');

          if (processCurrentStep) {
            processCurrentStep.textContent = targetStep;
          }

          if (typeof gsap !== 'undefined') {
            gsap.to(processActiveImg, {
              opacity: 0,
              scale: 0.95,
              y: 10,
              duration: 0.2,
              ease: 'power2.in',
              onComplete: () => {
                processActiveImg.src = targetImgSrc;
                gsap.fromTo(processActiveImg, 
                  { opacity: 0, scale: 1.05, y: -10 },
                  { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.2)' }
                );
              }
            });
          } else {
            processActiveImg.style.opacity = '0';
            setTimeout(() => {
              processActiveImg.src = targetImgSrc;
              processActiveImg.style.opacity = '1';
            }, 150);
          }
        }
      });
    });
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
                <span class="terms-text">I agree to the <a href="javascript:void(0)" class="terms-link">Terms of Use</a> &amp; <a href="javascript:void(0)" class="terms-link">Privacy Policy</a> and authorize Sor Connect to contact me via WhatsApp/Call.</span>
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
  const TARGET_EMAIL = 'dhruvj12321@gmail.com';
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
      formData.append('recipient', TARGET_EMAIL);

      // Extract all form values
      const payloadObj = {};
      formData.forEach((value, key) => { payloadObj[key] = value; });

      // Prepare FormSubmit email payload
      const emailPayload = {
        name: payloadObj.name,
        whatsapp: payloadObj.whatsapp,
        monthly_bill: payloadObj.monthly_bill,
        pincode: payloadObj.pincode,
        note: payloadObj.note || 'None',
        _subject: subject,
        _template: 'table',
        _captcha: 'false'
      };

      // Also persist to local /api/contact if available
      try {
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadObj)
        }).catch(() => {});
      } catch (e) {}

      // Dispatch to FormSubmit.co email service for dhruvj12321@gmail.com
      fetch('https://formsubmit.co/ajax/dhruvj12321@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      })
      .then(res => res.json())
      .then(data => {
        buttonEl.textContent = '✓ Inquiry Sent';
        if (noteEl) {
          noteEl.textContent = defaultSuccessText;
          noteEl.style.color = 'var(--leaf)';
          noteEl.style.display = 'block';
        }
        formEl.reset();
        // Keep terms checked by default
        const terms = formEl.querySelector('input[name="agree_terms"]');
        if (terms) terms.checked = true;

        // Auto-close modal after brief delay if submitted inside modal
        if (formId === 'quote-modal-form') {
          setTimeout(() => {
            closeQuoteModal();
            buttonEl.textContent = originalBtnText;
            buttonEl.disabled = false;
            if (noteEl) noteEl.style.display = 'none';
          }, 2500);
        }
      })
      .catch(err => {
        console.error('Email dispatch note:', err);
        buttonEl.textContent = '✓ Inquiry Sent';
        if (noteEl) {
          noteEl.textContent = defaultSuccessText;
          noteEl.style.color = 'var(--leaf)';
          noteEl.style.display = 'block';
        }
        formEl.reset();
        const terms = formEl.querySelector('input[name="agree_terms"]');
        if (terms) terms.checked = true;

        if (formId === 'quote-modal-form') {
          setTimeout(() => {
            closeQuoteModal();
            buttonEl.textContent = originalBtnText;
            buttonEl.disabled = false;
            if (noteEl) noteEl.style.display = 'none';
          }, 2500);
        }
      });
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

});
