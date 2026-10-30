// ============================================
// Personal Website — Shared Scripts
// ============================================

(function () {
  'use strict';

  // --- Mobile Navigation Toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    // Close nav when a link is clicked (mobile)
    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // --- Dynamic Year in Footer ---
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Contact Form Handling ---
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = (data.get('name') || '').trim();
      const email = (data.get('email') || '').trim();
      const message = (data.get('message') || '').trim();

      // Basic validation
      if (!name || !email || !message) {
        status.className = 'form-status error';
        status.textContent = 'Please fill out all fields.';
        return;
      }

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        status.className = 'form-status error';
        status.textContent = 'Please enter a valid email address.';
        return;
      }

      const submitButton = form.querySelector('[type="submit"]');
      submitButton.disabled = true;
      status.className = 'form-status';
      status.textContent = 'Sending your message...';

      try {
        const response = await fetch('https://qhijzbormfwnqvspxotz.supabase.co/rest/v1/contacts', {
          method: 'POST',
          headers: {
            apikey: 'sb_publishable_insen69hYDy_0pCTiqJuEw_G2-9tVp-',
            Authorization: 'Bearer sb_publishable_insen69hYDy_0pCTiqJuEw_G2-9tVp-',
            'Content-Type': 'application/json',
            Prefer: 'return=minimal'
          },
          body: JSON.stringify({ name, email, message })
        });

        if (!response.ok) throw new Error(`Supabase request failed (${response.status})`);

        status.className = 'form-status success';
        status.textContent = `Thanks, ${name}! Your message has been sent. I'll get back to you soon. 🎉`;
        form.reset();
      } catch (error) {
        console.error('Contact form submission failed:', error);
        status.className = 'form-status error';
        status.textContent = 'Your message could not be sent. Please try again later.';
      } finally {
        submitButton.disabled = false;
      }

      // Clear success message after 5 seconds
      setTimeout(() => {
        status.className = 'form-status';
        status.textContent = '';
      }, 5000);
    });
  }

})();
