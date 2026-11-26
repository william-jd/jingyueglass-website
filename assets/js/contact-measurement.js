/* Contact intent and confirmed form receipts; never read message contents into GA. */
(function () {
  'use strict';
  if (window.jyContactMeasurement) return;
  var measurementId = 'G-J6CW9S3D7Q';
  var eventOnly = !!(document.currentScript && document.currentScript.hasAttribute('data-contact-only-ga'));
  var receipts = new WeakSet();
  function emit(name, params) {
    // Analytics is optional: a blocked tag must never interrupt contact or delivery.
    try {
      if (window['ga-disable-' + measurementId]) return;
      if (!window.gtag && eventOnly) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', measurementId, { send_page_view: false });
        var tag = document.createElement('script');
        tag.async = true;
        tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
        document.head.appendChild(tag);
      }
      if (typeof window.gtag === 'function') window.gtag('event', name, params);
    } catch (_) { /* An analytics error must not affect the buyer. */ }
  }
  function accepted(attempt, provider) {
    if (!attempt || receipts.has(attempt)) return;
    receipts.add(attempt);
    emit('generate_lead', { lead_type: 'form_submission', form_provider: provider });
  }
  function whatsapp() { emit('contact_whatsapp', { contact_method: 'whatsapp' }); }
  function handleLink(e) {
    if (e.defaultPrevented || (e.type === 'auxclick' && e.button !== 1)) return;
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var u;
    try { u = new URL(a.href, document.baseURI); } catch (_) { return; }
    if ((u.protocol === 'https:' && u.hostname === 'wa.me' && /^\/\d+\/?$/.test(u.pathname)) ||
        (u.protocol === 'https:' && /^(api|web)\.whatsapp\.com$/.test(u.hostname) && /^\/send\/?$/.test(u.pathname)) ||
        (u.protocol === 'whatsapp:' && u.hostname === 'send')) whatsapp();
  }
  window.jyContactMeasurement = { accepted: accepted, whatsapp: whatsapp };
  document.addEventListener('click', handleLink);
  document.addEventListener('auxclick', handleLink);
})();
