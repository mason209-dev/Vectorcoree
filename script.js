/* global Swiper */
// Vector Core — Final Premium JavaScript (Fully Updated with Fixed Nav Previews)


// --- 1. PRELOADER & TYPEWRITER ENGINE ---
const preloader = document.getElementById('preloader');
const heroSection = document.querySelector('.hero.section');
const typewriterElement = document.getElementById('typewriter-text-main');
const typewriterSound = document.getElementById('typewriter-sound');

const textToType = " Excellence in every brand.";
let charIndex = 0;

const hasSeenPreloader = sessionStorage.getItem('preloaderShown');

if (!hasSeenPreloader) {
  function typeEffect() {
    if (charIndex < textToType.length) {
      if (typewriterSound) {
        typewriterSound.currentTime = 0;
        typewriterSound.play().catch(() => {});
      }
      if (typewriterElement) {
        typewriterElement.textContent += textToType.charAt(charIndex);
      }
      charIndex++;
      setTimeout(typeEffect, 70);
    } else {
      setTimeout(() => {
        if (preloader) preloader.classList.add('fade-out');
        if (heroSection) {
          heroSection.style.opacity = '1';
          heroSection.classList.add('visible');
        }
        document.body.classList.remove('loading-active');
        sessionStorage.setItem('preloaderShown', 'true');
      }, 500);
    }
  }
  setTimeout(typeEffect, 500);
} else {
  if (preloader) preloader.classList.add('fade-out');
  if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.classList.add('visible');
  }
  document.body.classList.remove('loading-active');
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Sidebar Toggle + Hamburger
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('close-btn');

  const toggleSidebar = () => {
    sidebar?.classList.toggle('active');
    hamburger?.classList.toggle('active');
  };

  hamburger?.addEventListener('click', toggleSidebar);
  closeBtn?.addEventListener('click', toggleSidebar);

  // All internal links smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Ignore empty anchors

      const target = document.querySelector(targetId);
      if (target) {
        // Close sidebar if open
        if (sidebar?.classList.contains('active')) toggleSidebar();

        // Smooth scroll with offset for fixed navbar
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Falling Tech Particles
  const container = document.getElementById('particles');
  if (container) {
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      container.appendChild(particle);
    }
  }

  // Scroll Progress Bar
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const height = document.body.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (window.scrollY / height) * 100 : 0;
      scrollProgress.style.width = `${progress}%`;
    });
  }

  // Back to Top
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Services Carousel Manual Controls (seamless loop) - kept as original
  const servicesCarousel = document.querySelector('.services-carousel');
  if (servicesCarousel) {
    const track = servicesCarousel.querySelector('.carousel-track');
    const prevBtn = servicesCarousel.querySelector('.carousel-prev');
    const nextBtn = servicesCarousel.querySelector('.carousel-next');

    const cardWidth = 200;
    const gap = 30;
    const step = cardWidth + gap;

    if (track && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        track.style.animationPlayState = 'paused';
        track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = `translateX(${step}px)`;

        setTimeout(() => {
          track.style.transition = 'none';
          track.style.transform = 'translateX(-50%)';
          void track.offsetHeight;
          track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          track.style.transform = 'translateX(0)';
          track.style.animationPlayState = 'running';
        }, 600);
      });

      nextBtn.addEventListener('click', () => {
        track.style.animationPlayState = 'paused';
        track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = `translateX(-${step}px)`;

        setTimeout(() => {
          track.style.transition = 'none';
          track.style.transform = 'translateX(0)';
          void track.offsetHeight;
          track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          track.style.transform = 'translateX(-50%)';
          track.style.animationPlayState = 'running';
        }, 600);
      });
    }
  }

  // Process Reveal on Scroll
  const processSteps = document.querySelectorAll('.process-step-reveal');
  if (processSteps.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    }, { threshold: 0.2 });

    processSteps.forEach(step => observer.observe(step));
  }

  // Portfolio Swiper
  new Swiper('.portfolio-swiper', {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    grabCursor: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      320: { slidesPerView: 1.15, spaceBetween: 15 },
      1024: { slidesPerView: 1, spaceBetween: 50 }
    }
  });

  // UPDATED: Interactive Navbar Dropdown Previews (Fixed Hover Persistence)
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    const preview = item.querySelector('.nav-preview');
    if (!preview) return; // Only items with preview

    // Show on mouse enter the entire nav item
    item.addEventListener('mouseenter', () => {
      preview.style.opacity = '1';
      preview.style.visibility = 'visible';
      preview.style.pointerEvents = 'auto';
    });

    // Hide only when mouse leaves the entire nav item (link + preview)
    item.addEventListener('mouseleave', () => {
      preview.style.opacity = '0';
      preview.style.visibility = 'hidden';
      preview.style.pointerEvents = 'none';
    });
  });
});