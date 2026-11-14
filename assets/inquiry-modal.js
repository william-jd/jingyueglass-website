(function(){
  'use strict';

  var endpoint='https://formspree.io/f/mkopdvol';
  var quoteModal;
  var successModal;
  var form;
  var lastTrigger=null;
  var returnTrigger=null;

  function modalMarkup(){
    return '<div id="jyQuoteModal" class="jy-quote-backdrop" aria-hidden="true">'+
      '<div class="jy-quote-dialog" role="dialog" aria-modal="true" aria-labelledby="jyQuoteTitle">'+
        '<button type="button" class="jy-close" aria-label="Close inquiry form">×</button>'+
        '<div class="jy-quote-head">'+
          '<div class="jy-quote-kicker">Factory quotation request</div>'+
          '<h2 id="jyQuoteTitle">Tell Us What You Need</h2>'+
          '<p>Share the essential project information below so our team can prepare a suitable quotation.</p>'+
        '</div>'+
        '<div class="jy-quote-body">'+
          '<form id="jyQuoteForm" novalidate>'+
            '<input type="hidden" name="source_page" value="">'+
            '<input type="hidden" name="source_action" value="">'+
            '<input type="hidden" name="selected_product" value="">'+
            '<div id="jySelectedProduct" class="jy-selected-product" hidden><span>Selected product</span><strong></strong></div>'+
            '<div class="jy-grid">'+
              '<div class="jy-field"><label for="jyName">Your Name</label><input id="jyName" name="name" type="text" autocomplete="name" placeholder="John Smith"></div>'+
              '<div class="jy-field"><label for="jyCompany">Company Name</label><input id="jyCompany" name="company" type="text" autocomplete="organization" placeholder="Your company"></div>'+
            '</div>'+
            '<div class="jy-grid">'+
              '<div class="jy-field"><label for="jyEmail">Business Email *</label><input id="jyEmail" name="email" type="email" autocomplete="email" required placeholder="you@company.com"></div>'+
              '<div class="jy-field"><label for="jyQuantity">Estimated Order Quantity</label><input id="jyQuantity" name="quantity" type="text" inputmode="numeric" placeholder="e.g. 500 pcs"></div>'+
            '</div>'+
            '<div class="jy-field"><label for="jyMessage">Project Requirements & Notes *</label><textarea id="jyMessage" name="message" required placeholder="Please describe the product, size or capacity, logo or packaging request, quantity and destination if known."></textarea></div>'+
            '<button type="submit" class="jy-submit">SEND INQUIRY →</button>'+
            '<div class="jy-form-error" role="alert"></div>'+
            '<div class="jy-notice"><span aria-hidden="true">🔒</span><div><strong>Quote-use notice:</strong> The information you provide is used to review your request and prepare a quotation. Submitting this form does not require payment. We do not sell your contact details.</div></div>'+
          '</form>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div id="jySuccessModal" class="jy-success-backdrop" aria-hidden="true">'+
      '<div class="jy-success-card" role="dialog" aria-modal="true" aria-labelledby="jySuccessTitle">'+
        '<div class="jy-success-icon" aria-hidden="true">✓</div>'+
        '<h2 id="jySuccessTitle">Your inquiry has been submitted</h2>'+
        '<p>Thank you. Your information has been received for quotation review. Close this message to return to the page you were viewing.</p>'+
        '<button type="button" class="jy-success-close">Return to Website</button>'+
      '</div>'+
    '</div>';
  }

  function setOpen(el,isOpen){
    if(!el)return;
    el.classList.toggle('is-open',isOpen);
    el.setAttribute('aria-hidden',isOpen?'false':'true');
    document.documentElement.classList.toggle('jy-modal-lock',isOpen);
    document.body.classList.toggle('jy-modal-lock',isOpen);
  }

  function getSelectedProduct(trigger){
    if(!trigger)return '';
    var explicit=trigger.getAttribute('data-product')||trigger.getAttribute('data-sku');
    if(explicit)return explicit.trim();
    var text=(trigger.textContent||'').trim().replace(/\s+/g,' ');
    var match=text.match(/\bQuote(?:\s+Model)?\s+([A-Z0-9][A-Z0-9._/-]*\d[A-Z0-9._/-]*)\b/i);
    if(match)return match[1];
    var card=trigger.closest('.product-card,.card,[data-product],[data-sku]');
    if(card){
      var cardExplicit=card.getAttribute('data-product')||card.getAttribute('data-sku');
      if(cardExplicit)return cardExplicit.trim();
      var heading=card.querySelector('h2,h3,h4,.product-title,.product-name');
      if(heading)return heading.textContent.trim().replace(/\s+/g,' ');
    }
    return '';
  }

  function openQuote(trigger){
    lastTrigger=trigger||document.activeElement;
    returnTrigger=lastTrigger;
    var action=form.querySelector('[name="source_action"]');
    var page=form.querySelector('[name="source_page"]');
    var productInput=form.querySelector('[name="selected_product"]');
    var productDisplay=form.querySelector('#jySelectedProduct');
    var selectedProduct=getSelectedProduct(trigger);
    action.value=trigger&&trigger.textContent?trigger.textContent.trim().replace(/\s+/g,' '):'Quote request';
    page.value=window.location.href;
    productInput.value=selectedProduct;
    if(selectedProduct){
      productDisplay.hidden=false;
      productDisplay.querySelector('strong').textContent=selectedProduct;
    }else{
      productDisplay.hidden=true;
      productDisplay.querySelector('strong').textContent='';
    }
    var error=form.querySelector('.jy-form-error');
    error.textContent='';
    error.classList.remove('is-visible');
    setOpen(quoteModal,true);
    window.setTimeout(function(){var email=form.querySelector('[name="email"]');if(email)email.focus();},120);
  }

  function closeQuote(){
    setOpen(quoteModal,false);
    if(lastTrigger&&typeof lastTrigger.focus==='function')lastTrigger.focus();
  }

  function openSuccess(){
    returnTrigger=lastTrigger;
    setOpen(quoteModal,false);
    setOpen(successModal,true);
    var close=successModal.querySelector('.jy-success-close');
    if(close)window.setTimeout(function(){close.focus();},80);
  }

  function closeSuccess(){
    setOpen(successModal,false);
    window.setTimeout(function(){
      if(returnTrigger&&document.contains(returnTrigger)&&typeof returnTrigger.focus==='function')returnTrigger.focus({preventScroll:true});
    },0);
  }

  function isInquiryLink(anchor){
    var href=(anchor.getAttribute('href')||'').trim();
    var text=(anchor.textContent||'').trim();
    if(/(?:^|\/)#inquiry$/i.test(href)||/#inquiry$/i.test(href))return true;
    return /\b(get|request|send|ask|discuss|start)\b[\s\S]{0,50}\b(quote|quotation|pricing|price list|requirements|rfq|sample|project|document package|moq)\b/i.test(text)||/\bquote\b/i.test(text);
  }

  function bindTriggers(){
    document.querySelectorAll('a[href],button').forEach(function(el){
      if(el.closest('#jyQuoteModal,#jySuccessModal'))return;
      if(el.matches('a[href]')&&isInquiryLink(el))el.classList.add('jy-quote-open');
      if(el.classList.contains('jy-quote-open')){
        el.addEventListener('click',function(event){
          event.preventDefault();
          openQuote(el);
        });
      }
    });
  }

  function replaceLegacyForms(){
    document.querySelectorAll('form').forEach(function(legacyForm){
      if(legacyForm.id==='jyQuoteForm')return;
      var action=(legacyForm.getAttribute('action')||'').toLowerCase();
      var looksLikeInquiry=action.indexOf('formspree.io')>-1||legacyForm.id==='inquiryForm'||legacyForm.closest('#inquiry,.inquiry,.inquiry-section');
      if(!looksLikeInquiry)return;
      var container=legacyForm.parentElement;
      var button=document.createElement('button');
      button.type='button';
      button.className='jy-legacy-form-open';
      button.textContent='OPEN INQUIRY FORM';
      button.addEventListener('click',function(){openQuote(button);});
      legacyForm.hidden=true;
      legacyForm.setAttribute('aria-hidden','true');
      container.insertBefore(button,legacyForm);
    });
  }

  function submit(event){
    event.preventDefault();
    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }
    var button=form.querySelector('.jy-submit');
    var error=form.querySelector('.jy-form-error');
    button.disabled=true;
    button.textContent='SENDING...';
    error.textContent='';
    error.classList.remove('is-visible');

    fetch(endpoint,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}})
      .then(function(response){if(!response.ok)throw new Error('Submission failed');return response;})
      .then(function(){form.reset();openSuccess();})
      .catch(function(){error.textContent='The form could not be sent. Please try again or email sales@jingyueglass.com.';error.classList.add('is-visible');})
      .finally(function(){button.disabled=false;button.textContent='SEND INQUIRY →';});
  }

  function init(){
    var host=document.createElement('div');
    host.innerHTML=modalMarkup();
    while(host.firstChild)document.body.appendChild(host.firstChild);
    quoteModal=document.getElementById('jyQuoteModal');
    successModal=document.getElementById('jySuccessModal');
    form=document.getElementById('jyQuoteForm');

    bindTriggers();
    replaceLegacyForms();
    form.addEventListener('submit',submit);
    quoteModal.querySelector('.jy-close').addEventListener('click',closeQuote);
    successModal.querySelector('.jy-success-close').addEventListener('click',closeSuccess);
    quoteModal.addEventListener('click',function(event){if(event.target===quoteModal)closeQuote();});
    successModal.addEventListener('click',function(event){if(event.target===successModal)closeSuccess();});
    document.addEventListener('keydown',function(event){if(event.key==='Escape'){if(successModal.classList.contains('is-open'))closeSuccess();else if(quoteModal.classList.contains('is-open'))closeQuote();}});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
