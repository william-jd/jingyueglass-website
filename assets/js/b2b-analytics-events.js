/**
 * Jingyue Glass B2B Conversion & Engagement Event Tracker for GA4
 * Measurement ID: G-J6CW9S3D7Q
 */
document.addEventListener('DOMContentLoaded', function() {
  function trackEvent(name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
      // console.log('[GA4 Event]', name, params);
    }
  }

  // 1. Track WhatsApp Clicks
  document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(function(el) {
    el.addEventListener('click', function() {
      var text = (el.innerText || el.getAttribute('aria-label') || 'WhatsApp Link').trim();
      var href = el.getAttribute('href') || '';
      trackEvent('contact_whatsapp', {
        event_category: 'Lead',
        event_label: text,
        link_url: href,
        page_location: window.location.pathname
      });
      trackEvent('generate_lead', {
        currency: 'USD',
        value: 100.0,
        lead_type: 'whatsapp'
      });
    });
  });

  // 2. Track Email Clicks
  document.querySelectorAll('a[href^="mailto:"]').forEach(function(el) {
    el.addEventListener('click', function() {
      var href = el.getAttribute('href') || '';
      var email = href.replace(/^mailto:/i, '').split('?')[0];
      trackEvent('contact_email', {
        event_category: 'Lead',
        event_label: email,
        page_location: window.location.pathname
      });
      trackEvent('generate_lead', {
        currency: 'USD',
        value: 50.0,
        lead_type: 'email'
      });
    });
  });

  // 3. Track WeChat Interactions
  document.querySelectorAll('.widget-btn-wechat, [data-wechat], .wechat-trigger, a[href*="weixin"]').forEach(function(el) {
    el.addEventListener('click', function() {
      trackEvent('contact_wechat', {
        event_category: 'Lead',
        event_label: 'WeChat Contact Widget',
        page_location: window.location.pathname
      });
      trackEvent('generate_lead', {
        currency: 'USD',
        value: 50.0,
        lead_type: 'wechat'
      });
    });
  });

  // 4. Strong Client-Side Form Validation, Email Dispatch & Anti-Bot Shield
  var SALES_INQUIRY_ENDPOINT = 'https://formsubmit.co/ajax/sales@jingyueglass.com';

  function submitInquiryPayload(payload, callback) {
    if (window.fetch) {
      fetch(SALES_INQUIRY_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        // console.log('[Inquiry Submitted to sales@jingyueglass.com]', data);
        if (callback) callback(null, data);
      })
      .catch(function(err) {
        console.warn('[Inquiry Dispatch Warning]', err);
        if (callback) callback(err);
      });
    } else {
      if (callback) callback(null);
    }
  }

  document.querySelectorAll('form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      // 4.1 Check Honeypot: if _gotcha is filled by automated bot, cancel submission
      var gotcha = form.querySelector('input[name="_gotcha"]');
      if (gotcha && gotcha.value && gotcha.value.trim() !== '') {
        e.preventDefault();
        e.stopPropagation();
        console.warn('[Anti-Spam] Bot submission blocked via honeypot.');
        return false;
      }

      // 4.2 Validate Required Email Field
      var emailInput = form.querySelector('input[type="email"], input[name="email"]');
      var emailVal = '';
      if (emailInput) {
        emailVal = (emailInput.value || '').trim();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailPattern.test(emailVal)) {
          e.preventDefault();
          e.stopPropagation();
          emailInput.style.border = '2px solid #ef4444';
          emailInput.style.backgroundColor = '#fff5f5';
          emailInput.focus();
          alert('Please enter a valid business email address so we can send your quote.');
          return false;
        } else {
          emailInput.style.border = '';
          emailInput.style.backgroundColor = '';
        }
      }

      // 4.3 Validate Required Name Field
      var nameInput = form.querySelector('input[name="name"], input[name="your_name"]');
      var nameVal = '';
      if (nameInput) {
        nameVal = (nameInput.value || '').trim();
        if (nameInput.hasAttribute('required') && !nameVal) {
          e.preventDefault();
          e.stopPropagation();
          nameInput.style.border = '2px solid #ef4444';
          nameInput.style.backgroundColor = '#fff5f5';
          nameInput.focus();
          alert('Please provide your name or company contact.');
          return false;
        } else {
          nameInput.style.border = '';
          nameInput.style.backgroundColor = '';
        }
      }

      // 4.4 Extract Product / Requirements / Phone
      var skuInput = form.querySelector('#modal-sku, #modalProductInput, input[name="product"], input[name="sku"]');
      var productVal = skuInput ? (skuInput.value || '').trim() : '';

      var qtyInput = form.querySelector('#modalSelectedQty, select[name="quantity"], input[name="quantity"]');
      var qtyVal = qtyInput ? (qtyInput.value || '').trim() : '';

      var phoneInput = form.querySelector('input[type="tel"], input[name="phone"], input[name="whatsapp"]');
      var phoneVal = phoneInput ? (phoneInput.value || '').trim() : '';

      var messageInput = form.querySelector('textarea');
      var messageVal = messageInput ? (messageInput.value || '').trim() : '';

      // 4.5 GA4 Event Tracking
      var formId = form.getAttribute('id') || form.getAttribute('name') || 'rfq_form';
      trackEvent('inquiry_submit', {
        event_category: 'Lead',
        event_label: formId,
        page_location: window.location.pathname
      });
      trackEvent('generate_lead', {
        currency: 'USD',
        value: 500.0,
        lead_type: 'form_submission'
      });

      // 4.6 Dispatch Form Submission directly to sales@jingyueglass.com
      var subjectTitle = productVal ? ('New Quote Request: ' + productVal + ' (Jingyue Glass)') : ('New RFQ Inquiry from ' + (nameVal || emailVal || 'Website Visitor'));
      var inquiryPayload = {
        _subject: subjectTitle,
        _template: 'table',
        _captcha: 'false',
        buyer_email: emailVal,
        buyer_name: nameVal || 'Not provided',
        buyer_phone_whatsapp: phoneVal || 'Not provided',
        target_product_sku: productVal || 'General Inquiry / Custom Manufacturing',
        target_quantity: qtyVal || 'Not specified',
        customization_requirements: messageVal || 'No additional note',
        source_page_url: window.location.href,
        source_page_title: document.title,
        submission_time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }) + ' (CST)'
      };

      submitInquiryPayload(inquiryPayload);
    });
  });

  // 5. Track Quote / Catalog / Sample CTA Buttons
  document.querySelectorAll('.btn-quote, .product-card-cta, .btn-table-quote, a[href*="#inquiry"], a[href*="quote-checklist"], a[href*="sample-approval"]').forEach(function(el) {
    el.addEventListener('click', function() {
      var text = (el.innerText || 'Quote Button').trim();
      trackEvent('request_quote_click', {
        event_category: 'Engagement',
        event_label: text,
        page_location: window.location.pathname
      });
    });
  });

  // 6. Track CBM Calculator Interactions
  var cbmBtn = document.getElementById('btn-calc-cbm') || document.querySelector('.btn-calculate-cbm');
  if (cbmBtn) {
    cbmBtn.addEventListener('click', function() {
      trackEvent('use_cbm_calculator', {
        event_category: 'Tool',
        event_label: 'Container CBM Calculation',
        page_location: window.location.pathname
      });
    });
  }
});
