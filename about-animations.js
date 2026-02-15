// ===================================================
// ABOUT PAGE ANIMATIONS & INTERACTIONS
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
        
        // Trigger specific animations based on section
        if (entry.target.classList.contains('stats-section')) {
          animateCounters();
        }
        
        if (entry.target.classList.contains('skills-section')) {
          animateSkillBars();
        }
        
        if (entry.target.classList.contains('achievements-section')) {
          animateAchievements();
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
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          if (target > 1000) {
            counter.textContent = (Math.floor(current / 100) * 100).toLocaleString() + '+';
          } else {
            counter.textContent = Math.floor(current);
          }
          requestAnimationFrame(updateCounter);
        } else {
          if (target > 1000) {
            counter.textContent = target.toLocaleString() + '+';
          } else {
            counter.textContent = target + '+';
          }
        }
      };

      updateCounter();
    });
  }

  // ===================================================
  // SKILL BAR ANIMATIONS
  // ===================================================
  
  let skillsAnimated = false;

  function animateSkillBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
      const targetWidth = bar.getAttribute('data-width');
      
      setTimeout(() => {
        bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        bar.style.width = targetWidth + '%';
      }, index * 150);
    });
  }

  // ===================================================
  // ACHIEVEMENT BADGES ANIMATION
  // ===================================================
  
  let achievementsAnimated = false;

  function animateAchievements() {
    if (achievementsAnimated) return;
    achievementsAnimated = true;

    const badges = document.querySelectorAll('.achievement-badge');
    
    badges.forEach((badge, index) => {
      setTimeout(() => {
        badge.style.opacity = '1';
        badge.style.transform = 'scale(1)';
        
        // Add a bounce effect for unlocked badges
        if (!badge.classList.contains('locked')) {
          setTimeout(() => {
            badge.style.transform = 'scale(1.1)';
            setTimeout(() => {
              badge.style.transform = 'scale(1)';
            }, 200);
          }, 300);
        }
      }, index * 100);
    });
  }

  // ===================================================
  // PROFILE CARD ANIMATION
  // ===================================================
  
  setTimeout(() => {
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
      profileCard.style.opacity = '1';
      profileCard.style.transform = 'translateY(0)';
    }
  }, 300);

  // ===================================================
  // FUN FACTS HOVER EFFECTS
  // ===================================================
  
  const factCards = document.querySelectorAll('.fact-card');
  
  factCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.fact-icon').style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('.fact-icon').style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // ===================================================
  // GAME SHOWCASE CARDS STAGGER
  // ===================================================
  
  const gameCards = document.querySelectorAll('.game-showcase-card');
  
  const gameObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80);
      }
    });
  }, { threshold: 0.2 });

  gameCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease';
    gameObserver.observe(card);
  });

  // ===================================================
  // TIMELINE ITEMS ANIMATION
  // ===================================================
  
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });

  // ===================================================
  // SETUP CARDS INTERACTION
  // ===================================================
  
  const setupCards = document.querySelectorAll('.about-section2');
  
  setupCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1.2) translateY(-5px)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1) translateY(0)';
      }
    });
  });

  // ===================================================
  // STAT CARDS HOVER EFFECTS
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
  // PROFILE BADGE PULSE
  // ===================================================
  
  const profileBadge = document.querySelector('.profile-badge');
  if (profileBadge) {
    setInterval(() => {
      profileBadge.style.transform = 'scale(1.1)';
      setTimeout(() => {
        profileBadge.style.transform = 'scale(1)';
      }, 300);
    }, 3000);
  }

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
  // CONSOLE EASTER EGG
  // ===================================================
  
  console.log('%c👤 About Eyspeedyboy12', 
    'font-size: 20px; font-weight: bold; color: #36c7ff; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
  console.log('%cThanks for checking out my story! 🎮', 
    'font-size: 14px; color: #a334ff;');
  console.log('%cWanna collab? Hit me up on Discord! 💬', 
    'font-size: 14px; color: #fe7ec8;');

  // ===================================================
  // INITIALIZATION
  // ===================================================
  
  // Set initial states
  const badges = document.querySelectorAll('.achievement-badge');
  badges.forEach(badge => {
    badge.style.opacity = '0';
    badge.style.transform = 'scale(0.8)';
    badge.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });

});

// ===================================================
// UTILITY FUNCTIONS
// ===================================================

// Format numbers with K suffix
function formatNumber(num) {
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
