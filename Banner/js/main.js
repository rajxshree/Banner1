/**
 * DesignCraft Studio - Main Interactive JavaScript
 * High-End Animations, Interactivity, Particles & Drag Controls
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initHeroCanvas();
  initStickyNavbar();
  initMobileDrawer();
  initPortfolio();
  initBeforeAfterSlider();
  initCounterStats();
  initTestimonialCarousel();
  initContactForm();
  init3DTilt();
  initScrollAnimations();
});

/* ==========================================================================
   1. Hero Canvas Ambient Particle Network
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 28 : 55;
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. Sticky Header & Active Nav Links
   ========================================================================== */
function initStickyNavbar() {
  const header = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
  const hamburger = document.getElementById('hamburger-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('mobile-nav-overlay');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    drawer.classList.toggle('open');
    overlay.classList.toggle('visible');
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu();
    });
  });
}

/* ==========================================================================
   4. Portfolio Filtering & Fullscreen Modal
   ========================================================================== */
const projectData = [
  {
    title: 'Royal Sangeet & Music Gala',
    category: 'Music & Events Poster',
    categoryFilter: 'posters events',
    image: 'assets/royal-music-event.jpg',
    description: 'An opulent royal event creative and promotional branding designed for a grand palace musical night and classical sangeet celebration. Features regal velvet aesthetics, traditional zardozi textures, and high-impact luxury event design.',
    dimensions: 'A1 / 24x36in (300 DPI) & Digital Suite',
    deliverables: 'Vector AI, Layered PSD, PDF Print, Web PNG',
    turnaround: '24-48 Hours'
  },
  {
    title: 'Apex Pro X Wireless Audio',
    category: 'Gaming Hardware Banner',
    categoryFilter: 'banners business-ads',
    image: 'assets/portfolio-2-banner.svg',
    description: 'High-conversion paid display banners and multi-format esports hardware campaign graphics. Engineered with cybernetic isometric grids, glowing neon cyan accents, and clear product feature hierarchy.',
    dimensions: '1920x1080, 1200x628, 300x250, 728x90',
    deliverables: 'HTML5 Animated Banners, PSD, High-Res JPG/PNG',
    turnaround: '24 Hours'
  },
  {
    title: 'Origin Ceremonial Matcha',
    category: 'Social Media Creative',
    categoryFilter: 'social',
    image: 'assets/portfolio-3-social.svg',
    description: 'Minimalist luxury social media carousel and story suite designed for an authentic Uji matcha brand. Blends organic sage tones, gold leaf gradients, and Japanese typography for superior engagement.',
    dimensions: '1080x1350 (4:5 Portrait) & 1080x1920 Stories',
    deliverables: 'Figma Components, Editable Canva Templates, PNGs',
    turnaround: '24 Hours'
  },
  {
    title: 'Pulse: AI Convergence 2026',
    category: 'Tech Summit Event Poster',
    categoryFilter: 'events posters',
    image: 'assets/portfolio-4-event.svg',
    description: 'Holographic conference branding and key promotional poster for a global artificial intelligence symposium in San Francisco. Features 3D neural connectivity nodes and clean corporate layout.',
    dimensions: 'A2 / 18x24in Print & 16:9 Digital Screens',
    deliverables: 'Print-Ready CMYK PDF, Vector SVG, Social Kit',
    turnaround: '36 Hours'
  },
  {
    title: 'Lumen Volt Energy Drink',
    category: 'High-CTR Advertisement Creative',
    categoryFilter: 'business-ads social',
    image: 'assets/portfolio-5-ad.svg',
    description: 'Direct-response performance marketing ad creative designed for Meta and TikTok advertising. Employs vibrant lightning motifs, bold value proposition badges, and high-contrast conversion triggers.',
    dimensions: '1080x1080 Square & 1080x1920 Reels',
    deliverables: 'Layered PSD, Ad Variations A/B, WebP/PNG',
    turnaround: '24 Hours'
  },
  {
    title: 'Fintech Horizon Liquidity',
    category: 'Corporate Promotional Banner',
    categoryFilter: 'banners business-ads',
    image: 'assets/portfolio-6-business.svg',
    description: 'Executive B2B corporate promotional design and roll-up exhibition banner for an enterprise liquidity platform. Clean geometric layout with modern glassmorphism charts and deep navy credibility.',
    dimensions: '850x2000mm Roll-Up & 1200x675 LinkedIn',
    deliverables: 'Large Format Print PDF, Vector Illustrator, Web Deck',
    turnaround: '48 Hours'
  }
];

function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  const filterTriggers = document.querySelectorAll('.filter-trigger');

  // Filter functionality
  function applyFilter(filter) {
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
    });

    cards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = '';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (card.style.opacity === '0') {
            card.style.display = 'none';
          }
        }, 200);
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      applyFilter(filter);
    });
  });

  // External triggers (from Services or Footer links)
  filterTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const filter = trigger.getAttribute('data-filter');
      applyFilter(filter);
    });
  });

  // Modal Functionality
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-image');
  const modalCat = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-description');
  const modalDim = document.getElementById('modal-dimensions');
  const modalDel = document.getElementById('modal-deliverables');
  const modalTurn = document.getElementById('modal-turnaround');
  const modalOrderBtn = document.getElementById('modal-order-btn');

  function openModal(index) {
    const data = projectData[index];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalCat.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;
    modalDim.textContent = data.dimensions;
    modalDel.textContent = data.deliverables;
    modalTurn.textContent = data.turnaround;

    // Pre-fill dropdown in contact form when clicking "Request Similar Design"
    modalOrderBtn.onclick = () => {
      closeModal();
      const select = document.getElementById('design-type');
      if (select) {
        if (data.categoryFilter.includes('banners')) select.value = 'Banner Design';
        else if (data.categoryFilter.includes('posters')) select.value = 'Poster Design';
        else if (data.categoryFilter.includes('social')) select.value = 'Social Media Creatives';
        else if (data.categoryFilter.includes('events')) select.value = 'Event Posters';
        else select.value = 'Advertisement Creatives';
      }
    };

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Click card to open modal
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      openModal(idx);
    });
  });

  // Hero mockups click to open modal
  const heroMockups = document.querySelectorAll('.floating-mockup');
  heroMockups.forEach(m => {
    m.addEventListener('click', () => {
      const pIdx = parseInt(m.getAttribute('data-project'), 10);
      if (!isNaN(pIdx)) openModal(pIdx);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. Interactive Before / After Comparison Slider
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('ba-slider');
  const handle = document.getElementById('ba-handle');
  const afterLayer = document.getElementById('ba-after-layer');
  const afterContent = afterLayer ? afterLayer.querySelector('.ba-after-content') : null;

  if (!container || !handle || !afterLayer || !afterContent) return;

  let isDragging = false;

  function updateSliderWidth() {
    afterContent.style.width = `${container.offsetWidth}px`;
  }
  updateSliderWidth();
  window.addEventListener('resize', updateSliderWidth);

  function setSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    let pos = ((x - rect.left) / rect.width) * 100;
    if (pos < 5) pos = 5;
    if (pos > 95) pos = 95;

    handle.style.left = `${pos}%`;
    afterLayer.style.width = `${pos}%`;
  }

  // Mouse Events
  handle.addEventListener('mousedown', () => (isDragging = true));
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => (isDragging = false));
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  // Touch Events for Mobile
  handle.addEventListener('touchstart', () => (isDragging = true), { passive: true });
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => (isDragging = false));
  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });
}

/* ==========================================================================
   6. Animated Stat Counters
   ========================================================================== */
function initCounterStats() {
  const counterItems = document.querySelectorAll('.counter-num');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterItems.forEach(item => {
          const target = parseInt(item.getAttribute('data-target'), 10);
          const suffix = item.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1800;
          const stepTime = 25;
          const increment = target / (duration / stepTime);

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              item.textContent = target + suffix;
              clearInterval(timer);
            } else {
              item.textContent = Math.floor(count) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.35 });

  const banner = document.getElementById('stats-banner');
  if (banner) observer.observe(banner);
}

/* ==========================================================================
   7. Testimonial Carousel Controls
   ========================================================================== */
function initTestimonialCarousel() {
  const carousel = document.getElementById('testimonial-carousel');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!carousel || !prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -380, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: 380, behavior: 'smooth' });
  });
}

/* ==========================================================================
   8. Contact Form & File Drag/Drop
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('project-form');
  const dropzone = document.getElementById('upload-dropzone');
  const fileInput = document.getElementById('reference-file');
  const fileNamePreview = document.getElementById('file-name-preview');
  const uploadLabel = document.getElementById('upload-label');
  const toast = document.getElementById('toast-notice');

  if (!form) return;

  // File picker trigger
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        showFileName(fileInput.files[0].name);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) {
        showFileName(fileInput.files[0].name);
      }
    });

    function showFileName(name) {
      uploadLabel.style.display = 'none';
      fileNamePreview.style.display = 'block';
      fileNamePreview.textContent = `Attached: ${name} (Ready to send)`;
    }
  }

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `
      <span>Sending Request...</span>
      <svg class="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;animation:spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
    `;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      form.reset();
      if (uploadLabel) uploadLabel.style.display = '';
      if (fileNamePreview) fileNamePreview.style.display = 'none';

      // Show toast
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4500);
    }, 1200);
  });
}

/* ==========================================================================
   9. 3D Card Perspective Tilt
   ========================================================================== */
function init3DTilt() {
  const cards = document.querySelectorAll('.service-card, .floating-mockup');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   10. GSAP ScrollTrigger Animations
   ========================================================================== */
function initScrollAnimations() {
  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero Entrance
  gsap.from('.hero-badge-wrap', { opacity: 0, y: 25, duration: 0.8, delay: 0.2 });
  gsap.from('.hero-title', { opacity: 0, y: 35, duration: 1, delay: 0.4 });
  gsap.from('.hero-desc', { opacity: 0, y: 30, duration: 0.9, delay: 0.6 });
  gsap.from('.hero-actions', { opacity: 0, y: 25, duration: 0.8, delay: 0.8 });
  gsap.from('.hero-stats-mini', { opacity: 0, y: 20, duration: 0.8, delay: 1 });
  gsap.from('.floating-mockup', { opacity: 0, scale: 0.8, duration: 1.2, delay: 0.5, stagger: 0.2 });

  // Scroll reveals for sections
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: (i % 3) * 0.15
    });
  });

  gsap.utils.toArray('.portfolio-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: (i % 2) * 0.15
    });
  });

  gsap.utils.toArray('.process-step').forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: 'top 85%'
      },
      opacity: 0,
      y: 30,
      duration: 0.7,
      delay: i * 0.12
    });
  });

  gsap.utils.toArray('.why-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      },
      opacity: 0,
      y: 35,
      duration: 0.7,
      delay: (i % 4) * 0.1
    });
  });
}
