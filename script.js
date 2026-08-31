(function () {
  'use strict';

  var cover = document.getElementById('cover');
  var site = document.getElementById('site');
  var envelope = document.getElementById('envelopeButton');

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0,0);

  if (cover && site && envelope) {
    envelope.addEventListener('click', function () {
      envelope.classList.add('is-open');
      cover.classList.add('is-opening');
      site.setAttribute('aria-hidden', 'false');
      var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var dismissDelay = reducedMotion ? 50 : 1250;
      var removeDelay = reducedMotion ? 120 : 2200;
      window.setTimeout(function () {
        cover.classList.add('is-dismissed');
      }, dismissDelay);
      window.setTimeout(function () {
        cover.hidden = true;
        document.body.classList.remove('cover-active');
      }, removeDelay);
    });
  }

  var weddingDate = new Date('2026-12-01T16:00:00+05:00').getTime();
  var ids = ['days','hours','minutes','seconds'];
  var message = document.getElementById('countdownMessage');

  function pad(value,width) { return String(value).padStart(width || 2,'0'); }
  function updateCountdown() {
    var remaining = weddingDate - Date.now();
    if (remaining <= 0) {
      remaining = 0;
      if (message) message.hidden = false;
    }
    var values = [
      Math.floor(remaining / 86400000),
      Math.floor((remaining % 86400000) / 3600000),
      Math.floor((remaining % 3600000) / 60000),
      Math.floor((remaining % 60000) / 1000)
    ];
    ids.forEach(function (id,index) {
      var element = document.getElementById(id);
      if (element) element.textContent = pad(values[index],index === 0 ? 3 : 2);
    });
  }

  updateCountdown();
  window.setInterval(updateCountdown,1000);
}());
