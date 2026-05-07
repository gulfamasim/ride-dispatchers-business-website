/* Ride Dispatchers — main.js (v2) */

/* ===== Page loader ===== */
(function pageLoader() {
  // Hide loader once everything is ready
  const hide = () => {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;
    // Small delay so the loader is actually perceptible on fast loads
    setTimeout(() => loader.classList.add('hidden'), 350);
  };
  if (document.readyState === 'complete') {
    hide();
  } else {
    window.addEventListener('load', hide);
  }

  // When user clicks an internal link, fade page out + show loader briefly
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    // Only intercept same-origin .html links (not anchors, mailto, tel, external)
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      a.target === '_blank'
    ) return;
    if (!href.endsWith('.html') && href !== '/' && !href.includes('.html')) return;

    e.preventDefault();
    document.body.classList.add('is-leaving');
    const loader = document.querySelector('.page-loader');
    if (loader) loader.classList.remove('hidden');
    setTimeout(() => { window.location.href = href; }, 280);
  });
})();

/* ===== Navbar: scroll shadow + mobile toggle ===== */
(function navbar() {
  const nav = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  if (!nav) return;

  const hasHero = !!document.querySelector('.hero');
  const onScroll = () => {
    const threshold = hasHero ? window.innerHeight * 0.7 : 80;
    nav.classList.toggle('scrolled', window.scrollY > threshold);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }
})();

/* ===== Scroll reveals via IntersectionObserver ===== */
(function reveals() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach((el) => io.observe(el));
})();

/* ===== Hero stat counters ===== */
(function counters() {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;
  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = target * eased;
      const display = Number.isInteger(target) ? Math.round(v) : v.toFixed(1);
      el.textContent = display;
      if (suffix) {
        const span = document.createElement('span');
        span.className = 'suffix';
        span.textContent = suffix;
        el.appendChild(span);
      }
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        animate(en.target);
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach((n) => io.observe(n));
})();

/* ===== Smooth scroll for in-page anchors ===== */
(function smoothAnchor() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ===== Dynamic year in footer ===== */
(function year() {
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ===== Demo form submit handler ===== */
(function forms() {
  document.querySelectorAll('form[data-demo]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';
      setTimeout(() => {
        btn.innerHTML = '✓ Sent — we\'ll be in touch';
        form.reset();
        setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 2800);
      }, 900);
    });
  });
})();
