document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // STATE & INITIAL CONFIG
  // ==========================================
  initHeaderScroll();
  initTheme();
  initRtl();
  initMobileMenu();
  initFAQ();
  initZipChecker();
  initFormSubmissions();
  initProductFilterAndModal();
});

// ==========================================
// 0. HEADER SCROLL SHRINK ANIMATION
// ==========================================
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;
  
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

// ==========================================
// 1. THEME SWITCHING (LIGHT/DARK)
// ==========================================
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply initial theme
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcons(currentTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      let theme = 'light';
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        theme = 'light';
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        theme = 'dark';
      }
      updateThemeIcons(theme);
    });
  });
}

function updateThemeIcons(theme) {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  themeToggleBtns.forEach(btn => {
    if (theme === 'dark') {
      // Show sun icon for dark mode (to toggle to light)
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      btn.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
      // Show moon icon for light mode (to toggle to dark)
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      btn.setAttribute('aria-label', 'Switch to Dark Mode');
    }
  });
}

// ==========================================
// 2. RTL LAYOUT TOGGLER (Segmented control)
// ==========================================
function initRtl() {
  const directionToggles = document.querySelectorAll('.direction-toggle');
  const currentRtl = localStorage.getItem('rtl') === 'true';

  // Apply initial RTL state
  setRtlState(currentRtl);

  directionToggles.forEach(toggle => {
    const ltrBtn = toggle.querySelector('.ltr-btn');
    const rtlBtn = toggle.querySelector('.rtl-btn');

    if (ltrBtn) {
      ltrBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setRtlState(false);
      });
    }

    if (rtlBtn) {
      rtlBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setRtlState(true);
      });
    }

    // Clicking container toggles direction
    toggle.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      setRtlState(!isRtl);
    });
  });
}

function setRtlState(isRtl) {
  if (isRtl) {
    document.documentElement.setAttribute('dir', 'rtl');
    localStorage.setItem('rtl', 'true');
    updateRtlSlider(true);
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    localStorage.setItem('rtl', 'false');
    updateRtlSlider(false);
  }
}

function updateRtlSlider(isRtl) {
  const directionToggles = document.querySelectorAll('.direction-toggle');
  directionToggles.forEach(toggle => {
    const ltrBtn = toggle.querySelector('.ltr-btn');
    const rtlBtn = toggle.querySelector('.rtl-btn');

    if (isRtl) {
      toggle.classList.add('rtl-active');
      if (ltrBtn) ltrBtn.classList.remove('active');
      if (rtlBtn) rtlBtn.classList.add('active');
      toggle.setAttribute('aria-label', 'Switch to Left to Right layout');
    } else {
      toggle.classList.remove('rtl-active');
      if (ltrBtn) ltrBtn.classList.add('active');
      if (rtlBtn) rtlBtn.classList.remove('active');
      toggle.setAttribute('aria-label', 'Switch to Right to Left layout');
    }
  });
}

// ==========================================
// 3. MOBILE SLIDE-IN MENU
// ==========================================
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close');

  if (!hamburger || !mobileNav || !mobileOverlay) return;

  function openMenu() {
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  hamburger.addEventListener('click', openMenu);
  mobileOverlay.addEventListener('click', closeMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close menu on hitting ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
}

// ==========================================
// 4. ACCORDION FAQ CONTROLS
// ==========================================
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all FAQs first
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      
      // Open if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ==========================================
// 5. DELIVERY AREA ZIP CODE CHECKER
// ==========================================
function initZipChecker() {
  const zipForm = document.getElementById('zip-checker-form');
  const zipInput = document.getElementById('zip-input');
  const zipResult = document.getElementById('zip-result');

  if (!zipForm || !zipInput || !zipResult) return;

  // Let's mock a set of covered delivery zones (e.g. zip codes starting with 12, 13, 90, 30)
  const coveredPrefixes = ['12', '13', '14', '90', '30', '02', '10'];

  zipForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = zipInput.value.trim();

    if (!val) {
      zipResult.textContent = 'Please enter a valid Zip Code.';
      zipResult.className = 'zip-result error';
      return;
    }

    const matches = coveredPrefixes.some(prefix => val.startsWith(prefix));

    if (matches) {
      zipResult.textContent = `🟢 Yes! We deliver directly to ${val} within 24 hours.`;
      zipResult.className = 'zip-result success';
    } else {
      zipResult.textContent = `❌ Sorry, we do not currently deliver directly to ${val}. However, we support bulk shipment ordering!`;
      zipResult.className = 'zip-result error';
    }
  });
}

// ==========================================
// 6. FORM SUBMISSION VALIDATION & SUCCESS ANIMATIONS
// ==========================================
function initFormSubmissions() {
  const forms = [
    { id: 'contact-form', successMsg: 'Thank you! Your message has been sent. We will respond within 4 business hours.' },
    { id: 'tour-booking-form', successMsg: 'Booking Request Received! We will review our schedule and contact you shortly with confirmation.' },
    { id: 'bulk-order-form', successMsg: 'Wholesale Inquiry Submitted! Our bulk distribution manager will email you within 24 hours.' },
    { id: 'quick-inquiry-form', successMsg: 'Quote Request Sent! A sales agent will contact you shortly.' }
  ];

  forms.forEach(f => {
    const formEl = document.getElementById(f.id);
    if (!formEl) return;

    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Perform visual submitting state
      const submitBtn = formEl.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Inquiry...';
      }

      // Simulate network request delay
      setTimeout(() => {
        // Find adjacent success element or hide form elements
        const formCard = formEl.parentElement;
        const successWrapper = formCard.querySelector('.form-success-wrapper');

        if (successWrapper) {
          // Fill success message
          const msgEl = successWrapper.querySelector('.success-message');
          if (msgEl) msgEl.textContent = f.successMsg;

          // Hide form
          formEl.style.display = 'none';
          
          // Show success animation wrapper
          successWrapper.classList.add('active');
        } else {
          // Fallback if success wrapper is missing: standard alert
          alert(f.successMsg);
          formEl.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
        }
      }, 1200);
    });
  });
}

// ==========================================
// 7. PRODUCTS FILTERING & INTERACTIVE DETAIL MODAL
// ==========================================
function initProductFilterAndModal() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const modal = document.getElementById('product-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');

  if (!productCards.length) return;

  // Category Filtering logic
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        if (filterVal === 'all') {
          card.style.display = 'flex';
        } else {
          const cardCat = card.getAttribute('data-category');
          if (cardCat === filterVal) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // Open Modal logic
  productCards.forEach(card => {
    const viewBtn = card.querySelector('.view-details-btn');
    if (!viewBtn) return;

    viewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Pull data from card attributes
      const title = card.getAttribute('data-title');
      const price = card.getAttribute('data-price');
      const category = card.getAttribute('data-category-label');
      const desc = card.getAttribute('data-desc');
      const img = card.querySelector('.product-img-wrapper img').src;
      const status = card.getAttribute('data-status') || 'In Stock';
      
      const origin = card.getAttribute('data-origin') || 'Straight from Coop A';
      const weight = card.getAttribute('data-weight') || 'N/A';
      const shelfLife = card.getAttribute('data-shelf-life') || 'Keep refrigerated';
      
      // Populate modal content
      if (modal) {
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-price').textContent = price;
        modal.querySelector('.modal-category').textContent = category;
        modal.querySelector('.modal-desc').textContent = desc;
        modal.querySelector('.modal-image img').src = img;
        modal.querySelector('.modal-image img').alt = title;

        const statusBadge = modal.querySelector('.modal-status');
        statusBadge.textContent = status;
        if (status.toLowerCase().includes('limit') || status.toLowerCase().includes('out')) {
          statusBadge.classList.add('out-of-stock');
        } else {
          statusBadge.classList.remove('out-of-stock');
        }

        // specs
        modal.querySelector('.spec-origin').textContent = origin;
        modal.querySelector('.spec-weight').textContent = weight;
        modal.querySelector('.spec-shelflife').textContent = shelfLife;

        // Open modal
        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Lock background scroll
      }
    });
  });

  // Close Modal logic
  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = ''; // Unlock background scroll
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });
}
