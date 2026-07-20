// Sor Connect — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
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

  // Scroll reveal (GSAP dynamic animations or native fallback)
  if (typeof gsap !== 'undefined') {
    // Register scroll plugin
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

    // 3. Staggered reveals for cards, grids, and locations on scroll
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

    // 4. Staggered reveals for general fade-up blocks in sections
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

    // 5. Magnetic Button Effect (attract to cursor on hover, spring back on leave)
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

  // Once topbar scrolls off, navbar glides up and becomes white pill
  var header = document.querySelector('.site-header');
  if (header) {
    var topbar = document.querySelector('.topbar');
    var onScroll = function () {
      var topbarH = topbar ? topbar.offsetHeight : 0;
      if (window.scrollY > topbarH) {
        header.classList.add('scrolled');
        header.style.top = '';
      } else {
        header.classList.remove('scrolled');
        if (topbarH > 0) {
          header.style.top = (topbarH + 10) + 'px';
        } else {
          header.style.top = '10px';
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  // Contact form (static demo — no backend wired up)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var note = document.getElementById('form-note');
      if (btn) {
        btn.textContent = 'Message sent';
        btn.disabled = true;
      }
      if (note) {
        note.textContent = "Thanks — our team will get back to you within one business day.";
        note.style.display = 'block';
      }
      form.reset();
    });
  }

  // Home page process tab switcher
  const processBtns = document.querySelectorAll('.process-nav-btn');
  const processTabs = document.querySelectorAll('.process-tab-content');
  const processActiveImg = document.getElementById('process-active-img');

  if (processBtns.length > 0 && processActiveImg) {
    processBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const targetTabId = this.getAttribute('data-tab');
        const targetImgSrc = this.getAttribute('data-img');
        const targetTab = document.getElementById(targetTabId);

        if (targetTab) {
          // Deactivate buttons
          processBtns.forEach(b => b.classList.remove('active'));
          // Deactivate tabs
          processTabs.forEach(t => t.classList.remove('active'));

          // Activate selected button & tab
          this.classList.add('active');
          targetTab.classList.add('active');

          // Smoothly crossfade image with GSAP or fallback
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
            // Fallback basic fade
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
});
