/* Ride Dispatchers — main.js (v3) */

/* ===== Page loader ===== */
(function pageLoader() {
  const hide = () => {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;
    setTimeout(() => loader.classList.add('hidden'), 350);
  };
  if (document.readyState === 'complete') {
    hide();
  } else {
    window.addEventListener('load', hide);
  }

  // Fade out + show loader when navigating to another page on this site
  document.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || a.target === '_blank' || a.hasAttribute('download')) return;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    // Resolve and keep only same-origin HTML page navigations
    let url;
    try { url = new URL(href, window.location.href); } catch (_) { return; }
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.hash) return;
    // Skip direct asset links (sitemap.xml, robots.txt, images, …)
    if (/\.(xml|txt|png|jpe?g|webp|svg|ico|pdf|css|js)$/i.test(url.pathname)) return;

    e.preventDefault();
    document.body.classList.add('is-leaving');
    const loader = document.querySelector('.page-loader');
    if (loader) loader.classList.remove('hidden');
    setTimeout(() => { window.location.href = url.href; }, 280);
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
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
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
      el.textContent = Number.isInteger(target) ? Math.round(v) : v.toFixed(1);
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

/* ===== FAQ accordion ===== */
(function faq() {
  document.querySelectorAll('.faq-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
})();

/* ===== Dynamic year in footer ===== */
(function year() {
  document.querySelectorAll('[data-year]').forEach((y) => {
    y.textContent = new Date().getFullYear();
  });
})();

/* ===== Success modal ===== */
const RDModal = (function modal() {
  const el = document.getElementById('success-modal');
  if (!el) return { open() {}, close() {} };
  const close = () => { el.hidden = true; document.body.style.overflow = ''; };
  const open = () => { el.hidden = false; document.body.style.overflow = 'hidden'; };
  el.addEventListener('click', (e) => {
    if (e.target === el || e.target.hasAttribute('data-close-modal')) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !el.hidden) close();
  });
  return { open, close };
})();

/* ===== AJAX form submit (Formspree) ===== */
(function ajaxForms() {
  document.querySelectorAll('form[data-ajax]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.innerHTML = 'Sending…'; }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then((res) => {
          if (res.ok) {
            form.reset();
            RDModal.open();
          } else {
            alert('Something went wrong. Please try again, or email us at info@ridedispatchers.com.');
          }
        })
        .catch(() => {
          alert('Network error. Please check your connection and try again.');
        })
        .finally(() => {
          if (btn) { btn.disabled = false; btn.innerHTML = original; }
        });
    });
  });
})();

/* ===== Demo form submit (newsletter) ===== */
(function demoForms() {
  document.querySelectorAll('form[data-demo]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';
      setTimeout(() => {
        btn.innerHTML = '✓ Subscribed';
        form.reset();
        setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 2800);
      }, 900);
    });
  });
})();

/* ===== Copy-to-clipboard buttons ===== */
(function copyBtns() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      const done = () => {
        const label = btn.querySelector('.copy-label');
        if (!label) return;
        const original = label.textContent;
        label.textContent = 'Copied!';
        setTimeout(() => { label.textContent = original; }, 1600);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(done).catch(() => {});
      }
    });
  });
})();
