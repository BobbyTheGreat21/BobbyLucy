(function () {
  'use strict';

  /* ---------- Envelope gate ---------- */
  var gate = document.getElementById('envelopeGate');
  var envelope = document.getElementById('envelopeButton');
  var hint = document.getElementById('envelopeHint');
  var hero = document.querySelector('.hero-inner[data-reveal]');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (gate && envelope) {
    document.documentElement.classList.add('gate-locked');

    var opened = false;
    function openEnvelope() {
      if (opened) return;
      opened = true;

      envelope.classList.add('is-open');
      if (hint) hint.style.opacity = '0';

      // Finish the card reveal before gently handing off to the page.
      window.setTimeout(function () {
        gate.classList.add('is-dismissed');
        document.documentElement.classList.remove('gate-locked');
      }, reduceMotion ? 50 : 1750);

      window.setTimeout(function () {
        if (hero) hero.classList.add('is-visible');
      }, reduceMotion ? 50 : 1850);

      // Fully remove the gate after its fade has completed.
      window.setTimeout(function () {
        gate.setAttribute('aria-hidden', 'true');
        gate.style.display = 'none';
      }, reduceMotion ? 150 : 2700);
    }

    envelope.addEventListener('click', openEnvelope);
    envelope.addEventListener('keyup', function (e) {
      if (e.key === 'Enter' || e.key === ' ') openEnvelope();
    });
  } else if (hero) {
    hero.classList.add('is-visible');
  }

  /* ---------- Scroll reveal ---------- */
  // The hero is revealed by the envelope sequence; sections reveal on scroll.
  var revealEls = document.querySelectorAll('[data-reveal]:not(.hero-inner)');
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

  /* ---------- Invitation card tilt ---------- */
  var invitationCard = document.querySelector('.invitation-card');
  var canTilt = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (invitationCard && canTilt && !reduceMotion) {
    invitationCard.addEventListener('pointermove', function (event) {
      var rect = invitationCard.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width;
      var y = (event.clientY - rect.top) / rect.height;

      invitationCard.style.setProperty('--tilt-x', ((0.5 - y) * 12).toFixed(2) + 'deg');
      invitationCard.style.setProperty('--tilt-y', ((x - 0.5) * 12).toFixed(2) + 'deg');
      invitationCard.style.setProperty('--glow-x', (x * 100).toFixed(1) + '%');
      invitationCard.style.setProperty('--glow-y', (y * 100).toFixed(1) + '%');
    });

    invitationCard.addEventListener('pointerleave', function () {
      invitationCard.style.setProperty('--tilt-x', '0deg');
      invitationCard.style.setProperty('--tilt-y', '0deg');
      invitationCard.style.setProperty('--glow-x', '50%');
      invitationCard.style.setProperty('--glow-y', '50%');
    });
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
