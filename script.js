(function () {
  'use strict';

  /* ---------- Envelope gate ---------- */
  var gate = document.getElementById('envelopeGate');
  var envelope = document.getElementById('envelopeButton');
  var hint = document.getElementById('envelopeHint');

  if (gate && envelope) {
    document.documentElement.classList.add('gate-locked');

    var opened = false;
    function openEnvelope() {
      if (opened) return;
      opened = true;

      envelope.classList.add('is-open');
      if (hint) hint.style.opacity = '0';

      // let the flap + card animation play, then fade the whole gate away
      window.setTimeout(function () {
        gate.classList.add('is-dismissed');
        document.documentElement.classList.remove('gate-locked');
      }, 1300);

      // fully remove from the accessibility tree once hidden
      window.setTimeout(function () {
        gate.setAttribute('aria-hidden', 'true');
        gate.style.display = 'none';
      }, 2200);
    }

    envelope.addEventListener('click', openEnvelope);
    envelope.addEventListener('keyup', function (e) {
      if (e.key === 'Enter' || e.key === ' ') openEnvelope();
    });
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Countdown ---------- */
  var countdownSection = document.getElementById('countdown');
  if (countdownSection) {
    var targetDate = new Date(countdownSection.getAttribute('data-wedding-date'));
    var elDays = document.getElementById('cd-days');
    var elHours = document.getElementById('cd-hours');
    var elMinutes = document.getElementById('cd-minutes');
    var elSeconds = document.getElementById('cd-seconds');
    var grid = document.getElementById('countdownGrid');
    var message = document.getElementById('countdownMessage');

    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
      var diff = targetDate.getTime() - Date.now();

      if (diff <= 0) {
        if (grid) grid.hidden = true;
        if (message) message.hidden = false;
        clearInterval(timer);
        return;
      }

      var day = Math.floor(diff / 86400000);
      var hour = Math.floor((diff % 86400000) / 3600000);
      var min = Math.floor((diff % 3600000) / 60000);
      var sec = Math.floor((diff % 60000) / 1000);

      if (elDays) elDays.textContent = pad(day);
      if (elHours) elHours.textContent = pad(hour);
      if (elMinutes) elMinutes.textContent = pad(min);
      if (elSeconds) elSeconds.textContent = pad(sec);
    }

    tick();
    var timer = setInterval(tick, 1000);
  }
})();
