// ===================================================
// HOME PAGE ANIMATIONS & INTERACTIONS
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ===================================================
  // SCROLL REVEAL ANIMATIONS
  // ===================================================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger counter animation when stats section becomes visible
        if (entry.target.classList.contains('stats-section')) {
          animateCounters();
        }
      }
    });
  }, observerOptions);

  // Observe all fade-in sections
  const fadeElements = document.querySelectorAll('.fade-in-section');
  fadeElements.forEach(el => observer.observe(el));

  // ===================================================
  // ANIMATED COUNTERS
  // ===================================================
  
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    const counters = document.querySelectorAll('.counter-animate');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target')) || 0;
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      updateCounter();
    });
  }

  // ===================================================
  // HERO SECTION ENHANCEMENTS
  // ===================================================
  
  // Animate hero elements on load
  setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title-fade');
    const heroSubtitle = document.querySelector('.hero-subtitle-fade');
    const heroStats = document.querySelector('.hero-quick-stats');
    const heroButtons = document.querySelector('.hero-cta-buttons');
    
    if (heroTitle) heroTitle.style.opacity = '1';
    if (heroSubtitle) {
      setTimeout(() => {
        heroSubtitle.style.opacity = '1';
      }, 300);
    }
    if (heroStats) {
      setTimeout(() => {
        heroStats.style.opacity = '1';
        heroStats.style.transform = 'translateY(0)';
      }, 600);
    }
    if (heroButtons) {
      setTimeout(() => {
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
      }, 900);
    }
  }, 100);

  // ===================================================
  // STAT CARD HOVER EFFECTS
  // ===================================================
  
  const statCards = document.querySelectorAll('.stat-card-hover');
  
  statCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ===================================================
  // PLATFORM CARDS INTERACTION
  // ===================================================
  
  const platformCards = document.querySelectorAll('.platform-card');
  
  platformCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.platform-icon i');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.platform-icon i');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // ===================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ===================================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===================================================
  // PULSE ANIMATION ON LOAD
  // ===================================================
  
  setTimeout(() => {
    const pulseElements = document.querySelectorAll('.pulse-on-load');
    pulseElements.forEach(el => {
      el.classList.add('pulse-animation');
      setTimeout(() => {
        el.classList.remove('pulse-animation');
      }, 2000);
    });
  }, 1500);

  // ===================================================
  // PARALLAX EFFECT ON HERO
  // ===================================================
  
  let ticking = false;
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled < hero.offsetHeight) {
          hero.style.transform = `translateY(${scrolled * 0.5}px)`;
          if (heroContent) {
            heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight);
          }
        }
        
        ticking = false;
      });
      
      ticking = true;
    }
  });

  // ===================================================
  // FEATURE CARDS STAGGER ANIMATION
  // ===================================================
  
  const featureCards = document.querySelectorAll('.feature-card');
  
  const featureObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, { threshold: 0.2 });

  featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease';
    featureObserver.observe(card);
  });

  // ===================================================
  // VIDEO STATS UPDATE (if vid.js is loaded)
  // ===================================================
  
  // This section works with your existing vid.js
  // The view counter will be updated by vid.js
  
  // ===================================================
  // SUBSCRIBER COUNT UPDATE FOR HERO
  // ===================================================
  
  // Update hero subscriber count when main counter updates
  const mainSubCount = document.getElementById('sub-count');
  if (mainSubCount) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        const heroSubs = document.getElementById('hero-subs');
        if (heroSubs && mainSubCount.textContent !== 'Loading...') {
          heroSubs.textContent = mainSubCount.textContent;
        }
      });
    });
    
    observer.observe(mainSubCount, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  // ===================================================
  // WELCOME IMAGE ANIMATION
  // ===================================================
  
  const welcomeImage = document.querySelector('.welcome-image');
  if (welcomeImage) {
    welcomeImage.addEventListener('load', function() {
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    });
  }

  // ===================================================
  // CTA SECTION ATTENTION GRABBER
  // ===================================================
  
  const ctaSection = document.querySelector('.cta-section');
  if (ctaSection) {
    const ctaObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelector('.cta-card').classList.add('attention-pulse');
          setTimeout(() => {
            entry.target.querySelector('.cta-card').classList.remove('attention-pulse');
          }, 1000);
        }
      });
    }, { threshold: 0.5 });
    
    ctaObserver.observe(ctaSection);
  }

  // ===================================================
  // PROGRESS BAR ANIMATION ENHANCEMENT
  // ===================================================
  
  const progressBar = document.getElementById('progress-bar-fill');
  if (progressBar) {
    const progressObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger width animation
          const currentWidth = progressBar.style.width;
          progressBar.style.width = currentWidth;
        }
      });
    }, { threshold: 0.3 });
    
    const progressContainer = document.querySelector('.sub-goal-container');
    if (progressContainer) {
      progressObserver.observe(progressContainer);
    }
  }

  // ===================================================
  // CONSOLE EASTER EGG
  // ===================================================
  
  console.log('%c🎮 Welcome to Eyspeedyboy12\'s Website! 🎮', 
    'font-size: 20px; font-weight: bold; color: #36c7ff; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
  console.log('%cLooking for something? Check out the code! 👀', 
    'font-size: 14px; color: #a334ff;');
  console.log('%cDon\'t forget to subscribe! 🔔', 
    'font-size: 14px; color: #fe7ec8;');

  // ===================================================
  // ACCESSIBILITY ENHANCEMENTS
  // ===================================================
  
  // Add keyboard navigation hints
  document.addEventListener('keydown', function(e) {
    // Tab through interactive elements
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  });

  document.addEventListener('mousedown', function() {
    document.body.classList.remove('user-is-tabbing');
  });

});

// ===================================================
// UTILITY FUNCTIONS
// ===================================================

// Format large numbers with K, M suffixes
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
