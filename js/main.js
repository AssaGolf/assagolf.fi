/* ÄssäGolf — main.js */

document.addEventListener('DOMContentLoaded', function () {

  /* ── HAMBURGER MENU ── */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = mobileMenu.classList.contains('is-open');
      mobileMenu.classList.toggle('is-open', !isOpen);
      hamburger.setAttribute('aria-expanded', String(!isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── TAB SWITCHER (hinnasto kausi-välilehdet, sijainnit ohjeet) ── */
  document.querySelectorAll('[data-tabs]').forEach(function (tabGroup) {
    var tabs    = tabGroup.querySelectorAll('[data-tab]');
    var panels  = document.querySelectorAll('[data-panel]');
    var groupId = tabGroup.dataset.tabs;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = this.dataset.tab;

        tabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');

        panels.forEach(function (p) {
          if (p.dataset.panel && p.closest('[data-tabs="' + groupId + '"]') === null) return;
          if (p.dataset.panelGroup === groupId) {
            p.classList.toggle('active', p.dataset.panel === target);
          }
        });
      });
    });
  });

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── ARTICLE FILTER ── */
  document.querySelectorAll('.filter-bar .fbtn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = this.dataset.cat;
      document.querySelectorAll('.filter-bar .fbtn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      document.querySelectorAll('[data-cat]').forEach(function (el) {
        el.classList.toggle('hidden', cat !== 'kaikki' && el.dataset.cat !== cat);
      });
    });
  });

});
