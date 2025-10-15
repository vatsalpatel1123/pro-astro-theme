const WEBHOOK_URL = 'https://automate.axonflash.com/webhook/0c63e44e-69e0-4285-8967-57dcf0a97ec5'; // replace with your n8n webhook

export function initFormHandler() {
  document.querySelectorAll('.common-form').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // ✅ stop page reload
      e.stopPropagation();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Add form metadata
      data.formName = form.getAttribute('id') || 'Unnamed Form';
      data.pageURL = window.location.href; // Full URL with domain
      data.pagePath = window.location.pathname; // Just the path like /contact or /great-neck
      data.submittedAt = new Date().toISOString(); // Timestamp

      try {
        const res = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          alert('✅ Form submitted successfully!');
          form.reset();
        } else {
          alert('⚠️ Something went wrong.');
        }
      } catch (err) {
        console.error('❌ Form submission error:', err);
        alert('❌ Network error. Please try again later.');
      }
    });
  });
}