// ===================================================
// FAQ ACCORDION FUNCTIONALITY
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Toggle the clicked item
      faqItem.classList.toggle('active');
      
      // Smooth scroll to item if it was just opened
      if (!isActive) {
        setTimeout(() => {
          const offset = 100;
          const elementPosition = faqItem.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 300);
      }
    });
  });

  // ===================================================
  // SEARCH FUNCTIONALITY
  // ===================================================
  
  const searchInput = document.getElementById('faq-search');
  const faqItems = document.querySelectorAll('.faq-item');
  const faqCategories = document.querySelectorAll('.faq-category');
  
  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      // Show all items and categories
      faqItems.forEach(item => {
        item.style.display = 'block';
        item.classList.remove('search-highlight');
      });
      faqCategories.forEach(category => {
        category.style.display = 'block';
      });
      return;
    }
    
    let hasVisibleItems = false;
    
    faqCategories.forEach(category => {
      let categoryHasMatch = false;
      const itemsInCategory = category.querySelectorAll('.faq-item');
      
      itemsInCategory.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = 'block';
          item.classList.add('search-highlight');
          categoryHasMatch = true;
          hasVisibleItems = true;
          
          // Auto-expand matched items
          if (!item.classList.contains('active')) {
            item.classList.add('active');
          }
        } else {
          item.style.display = 'none';
          item.classList.remove('search-highlight');
        }
      });
      
      // Show/hide category based on matches
      category.style.display = categoryHasMatch ? 'block' : 'none';
    });
  });

  // ===================================================
  // QUICK LINKS / CATEGORY JUMP
  // ===================================================
  
  const quickBtns = document.querySelectorAll('.faq-quick-btn[data-category]');
  
  quickBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const categoryName = this.getAttribute('data-category');
      const targetCategory = document.querySelector(`.faq-category[data-category="${categoryName}"]`);
      
      if (targetCategory) {
        const offset = 100;
        const elementPosition = targetCategory.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Add pulse animation
        targetCategory.classList.add('pulse-animation');
        setTimeout(() => {
          targetCategory.classList.remove('pulse-animation');
        }, 1000);
      }
    });
  });

  // ===================================================
  // EXPAND ALL / COLLAPSE ALL
  // ===================================================
  
  const expandAllBtn = document.getElementById('expand-all');
  let allExpanded = false;
  
  expandAllBtn.addEventListener('click', function() {
    allExpanded = !allExpanded;
    
    faqItems.forEach(item => {
      if (allExpanded) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Update button text and icon
    const icon = this.querySelector('i');
    const text = allExpanded ? 'Collapse All' : 'Expand All';
    
    if (allExpanded) {
      icon.className = 'hgi hgi-stroke hgi-arrow-collapse-02';
    } else {
      icon.className = 'hgi hgi-stroke hgi-arrow-expand-02';
    }
    
    // Update button text (keep icon, change text)
    this.innerHTML = '';
    this.appendChild(icon);
    this.appendChild(document.createTextNode(' ' + text));
  });

  // ===================================================
  // BACK TO TOP BUTTON
  // ===================================================
  
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===================================================
  // KEYBOARD NAVIGATION
  // ===================================================
  
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // ===================================================
  // ANALYTICS (Optional - track which FAQs are clicked)
  // ===================================================
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const questionText = this.querySelector('span').textContent;
      console.log('FAQ clicked:', questionText);
      // You can add Google Analytics or other tracking here
      // Example: gtag('event', 'faq_click', { 'question': questionText });
    });
  });

});
