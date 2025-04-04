document.addEventListener('DOMContentLoaded', function() {
  // Flag to track if navigation was recently clicked
  let navigationJustClicked = false;
  
  // Initialize components
  initNavigation();
  initFAQ();
  initModals();
  initReviewSlider();
  initPillarInteractions();
  initAnimations();
  initFacebookChat();
  initCurriculumModal();
  initColorThemeEnhancements();

  // Initialize scrolling effects
  window.addEventListener('scroll', function() {
    handleScroll();
    parallaxEffect();
    animateOnScroll();
    
    // Only highlight navigation if we haven't just clicked a nav link
    if (!navigationJustClicked) {
      highlightNavigation();
    }
  });

  // Initialize navigation
  function initNavigation() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navLinks = document.querySelectorAll('.navbar-links a');

    if (navbarToggle && navbarMenu) {
      navbarToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarMenu.classList.toggle('active');
      });
    }

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
          // Skip if it's the curriculum link - now handled in initModals
          if (this.getAttribute('href') === '#curriculum') {
            return;
          }
          
          e.preventDefault();
          const targetId = this.getAttribute('href');
          
          if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              // Close mobile menu if open
              if (navbarToggle && navbarMenu) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
              }
              
              // Ensure body scrolling is enabled
              document.body.style.overflow = '';
              
              // Temporarily disable automatic highlighting
              navigationJustClicked = true;
              
              // Remove any existing active classes
              navLinks.forEach(navLink => navLink.classList.remove('active'));
              
              // Smooth scroll to target with snap support
              targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
              
              // Update URL hash without scrolling
              history.pushState(null, null, targetId);
              
              // Re-enable automatic highlighting after scroll animation completes
              setTimeout(() => {
                navigationJustClicked = false;
              }, 1000); // 1 second delay to match smooth scroll duration
            }
          }
        }
      });
    });
  }

  // Handle scroll event for navbar
  function handleScroll() {
    const navbar = document.querySelector('.navbar');
    const ctaSection = document.querySelector('.cta-section');
    const footer = document.querySelector('.footer');
    
    if (navbar && ctaSection && footer) {
      // Get the actual element positions rather than viewport-relative positions
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const ctaTop = ctaSection.getBoundingClientRect().top + scrollTop;
      const footerTop = footer.getBoundingClientRect().top + scrollTop;
      
      // Calculate how far we've scrolled into the page
      const scrollProgress = scrollTop + (viewportHeight * 0.8); // 80% of viewport height as threshold
      
      // Only switch to white navbar when we reach the CTA section or footer
      if (scrollProgress >= ctaTop || scrollProgress >= footerTop) {
        navbar.classList.remove('scrolled');
      } else if (scrollTop > 50) {
        // For all other sections including FAQ, keep the dark navbar
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  // Initialize FAQ section
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      if (question) {
        question.addEventListener('click', function() {
          // Close all other items
          faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle current item
          item.classList.toggle('active');
        });
      }
    });
  }

  // Initialize modals
  function initModals() {
    const modals = document.querySelectorAll('.modal');
    const termsBtn = document.getElementById('read-terms-btn');
    const footerTermsBtn = document.getElementById('footer-terms-btn');
    const aboutUsBtn = document.getElementById('about-us-btn');
    const closeButtons = document.querySelectorAll('.close-modal');
    const curriculumLink = document.querySelector('.navbar-links a[href="#curriculum"]');
    
    // Terms modal
    if (termsBtn) {
      termsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(document.getElementById('terms-modal'));
      });
    }
    
    if (footerTermsBtn) {
      footerTermsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(document.getElementById('terms-modal'));
      });
    }
    
    // About modal
    if (aboutUsBtn) {
      aboutUsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(document.getElementById('about-modal'));
      });
    }
    
    // Curriculum modal - fix the event listener
    if (curriculumLink) {
      curriculumLink.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Curriculum link clicked'); // Add debug log
        
        // Close mobile menu if open
        const navbarToggle = document.querySelector('.navbar-toggle');
        const navbarMenu = document.querySelector('.navbar-menu');
        if (navbarToggle && navbarMenu) {
          navbarToggle.classList.remove('active');
          navbarMenu.classList.remove('active');
        }
        
        const curriculumModal = document.getElementById('curriculum-modal');
        if (curriculumModal) {
          console.log('Curriculum modal found'); // Add debug log
          openModal(curriculumModal);
          highlightCurrentMonth();
        } else {
          console.error('Curriculum modal not found!');
        }
      });
    } else {
      console.error('Curriculum link not found!');
    }
    
    // Close buttons
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        closeAllModals();
      });
    });
    
    // Close when clicking outside the modal content
    window.addEventListener('click', function(event) {
      modals.forEach(modal => {
        if (event.target === modal) {
          closeModal(modal);
        }
      });
    });
    
    // Close when pressing Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeAllModals();
      }
    });

    // Add this code to handle the new X button
    const closeXButtons = document.querySelectorAll('.close-modal-x');
    
    closeXButtons.forEach(button => {
      button.addEventListener('click', function() {
        closeAllModals();
      });
    });
  }

  function openModal(modal) {
    if (modal) {
      console.log('Opening modal:', modal.id);
      
      // Reset scroll position to top
      const modalContent = modal.querySelector('.modal-content');
      if (modalContent) {
        setTimeout(() => {
          modalContent.scrollTop = 0;
        }, 10);
      }
      
      // Mobile-specific handling
      if (window.innerWidth <= 480) {
        // Save current body scroll position to restore later
        modal.dataset.scrollY = window.scrollY.toString();
        // Add touch handling for better mobile experience
        modal.addEventListener('touchmove', preventBodyScroll, { passive: false });
      }
      
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      
      // Add a very small delay to ensure display:block has applied
      setTimeout(() => {
        modal.classList.add('modal-open');
      }, 10);
    } else {
      console.error('Modal not found');
    }
  }

  function closeModal(modal) {
    if (modal) {
      console.log('Closing modal:', modal.id);
      
      // Mobile-specific handling
      if (window.innerWidth <= 480) {
        // Remove touch handling
        modal.removeEventListener('touchmove', preventBodyScroll);
        // Restore scroll position after modal closes
        const savedScrollY = parseInt(modal.dataset.scrollY || '0', 10);
        setTimeout(() => {
          window.scrollTo(0, savedScrollY);
        }, 300);
      }
      
      modal.classList.remove('modal-open');
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Reset to default
      }, 300);
    } else {
      console.error('Modal not found for closing');
      document.body.style.overflow = ''; // Fallback reset
    }
  }

  // Helper function for preventing body scroll when modal is open on mobile
  function preventBodyScroll(event) {
    // Check if we should allow scrolling within the modal content
    const modalContent = event.target.closest('.modal-content');
    if (!modalContent) {
      event.preventDefault();
    }
  }

  function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      closeModal(modal);
    });
  }

  // Initialize review slider
  function initReviewSlider() {
    new Swiper('.review-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        }
      },
      on: {
        init: function() {
          checkForAnimation();
        },
      }
    });
  }

  // Glass Pillar Interactions
  function initPillarInteractions() {
    const glassPillars = document.querySelectorAll('.glass-pillar');
    
    glassPillars.forEach(pillar => {
      // For mobile - handle click to toggle active state
      pillar.addEventListener('click', function(e) {
        e.preventDefault();
        
        // If already active, deactivate
        if (this.classList.contains('active')) {
          this.classList.remove('active');
          return;
        }
        
        // Remove active class from all pillars
        glassPillars.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked pillar
        this.classList.add('active');
      });
      
      // For desktop - handle touch end to prevent sticky hover states on mobile
      pillar.addEventListener('mouseleave', function() {
        this.classList.remove('active');
      });
    });
    
    // Close active pillar when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.glass-pillar')) {
        glassPillars.forEach(p => p.classList.remove('active'));
      }
    });
  }

  // Check if elements need animation
  function checkForAnimation() {
    const elements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('animated');
      }
    });
  }

  // Initialize animations
  function initAnimations() {
    // Add animation classes to elements
    const benefitCards = document.querySelectorAll('.benefit-card');
    const processSteps = document.querySelectorAll('.process-step');
    const pricingPlans = document.querySelectorAll('.pricing-plan');
    
    benefitCards.forEach((card, index) => {
      card.classList.add('fade-in-up');
      card.style.animationDelay = (index * 0.2) + 's';
    });
    
    processSteps.forEach((step, index) => {
      step.classList.add('fade-in-up');
      step.style.animationDelay = (index * 0.15) + 's';
    });
    
    pricingPlans.forEach((plan, index) => {
      plan.classList.add('fade-in-up');
      plan.style.animationDelay = (index * 0.2) + 's';
    });
    
    // Add fade-in-up to section titles
    document.querySelectorAll('.section-title, .section-subtitle').forEach(el => {
      el.classList.add('fade-in-up');
    });
    
    // Initial check
    checkForAnimation();
  }

  // Animate elements on scroll
  function animateOnScroll() {
    checkForAnimation();
  }

  // Create parallax effect on scroll
  function parallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-image, .about-image');
    
    parallaxElements.forEach(element => {
      const scrollPosition = window.scrollY;
      const elementPosition = element.offsetTop;
      const windowHeight = window.innerHeight;
      
      if (scrollPosition + windowHeight > elementPosition) {
        const distance = scrollPosition + windowHeight - elementPosition;
        const parallaxValue = distance * 0.1;
        
        if (element.classList.contains('hero-image')) {
          element.style.transform = `translateY(${parallaxValue * 0.3}px)`;
        } else {
          element.style.transform = `translateY(${parallaxValue * 0.2}px)`;
        }
      }
    });
  }

  // Highlight active navigation item
  function highlightNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-links a');
    
    // Get the current scroll position with adjusted offset for better highlighting
    const scrollPosition = window.scrollY + 150; // Increased offset for better detection
    
    // Default to first section if no section is active
    let currentSection = null;
    
    // Find the current section - loop backward to prioritize later sections for overlap cases
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      // Check if we're within this section
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section;
        break;
      }
    }
    
    // If we didn't find an active section, use the first visible one
    if (!currentSection && sections.length > 0) {
      const firstVisibleSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      
      if (firstVisibleSection) {
        currentSection = firstVisibleSection;
      } else {
        currentSection = sections[0]; // Fallback to first section
      }
    }
    
    // Highlight the corresponding nav link
    if (currentSection) {
      const currentId = currentSection.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  // Initialize Facebook chat
  function initFacebookChat() {
    if (typeof FB !== 'undefined') {
      FB.CustomerChat.show();
    }
  }

  // Curriculum Modal Functionality
  function initCurriculumModal() {
    console.log('Curriculum modal initialized');
    
    // Pre-highlight the current month in case the modal is opened later
    highlightCurrentMonth();
    
    // Improve mobile scrolling behavior
    const curriculumModal = document.getElementById('curriculum-modal');
    if (curriculumModal) {
      // Initialize scroll position at top when modal opens
      curriculumModal.addEventListener('click', function(event) {
        if (event.target === this) {
          closeModal(this);
        }
      });
      
      // Update modal position for mobile
      const updateModalForMobile = () => {
        if (window.innerWidth <= 480) {
          const modalContent = curriculumModal.querySelector('.modal-content');
          if (modalContent) {
            // Reset modal scroll position when opened
            curriculumModal.addEventListener('transitionend', function() {
              if (curriculumModal.classList.contains('modal-open')) {
                modalContent.scrollTop = 0;
              }
            }, { once: true });
          }
        }
      };
      
      // Call on init and window resize
      updateModalForMobile();
      window.addEventListener('resize', updateModalForMobile);
    }
  }

  // Highlight the current month in the calendar
  function highlightCurrentMonth() {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const currentMonthName = monthNames[currentMonthIndex];
    
    console.log('Highlighting current month:', currentMonthName);
    
    const monthCards = document.querySelectorAll('.month-card');
    
    monthCards.forEach(card => {
      const cardMonth = card.getAttribute('data-month');
      const cardMonthIndex = monthNames.indexOf(cardMonth);
      
      // Reset any previous styles
      card.classList.remove('current-month', 'past-month');
      card.style.animation = '';
      card.style.boxShadow = '';
      card.style.borderColor = '';
      card.style.opacity = '';
      
      if (cardMonth === currentMonthName) {
        // Current month styling
        card.classList.add('current-month');
        card.style.animation = 'pulse 2s infinite ease-in-out';
        card.style.boxShadow = '0 0 15px rgba(109, 46, 70, 0.6)';
        card.style.borderColor = '#D4AF37';
      } else if (cardMonthIndex < currentMonthIndex) {
        // Past month styling
        card.classList.add('past-month');
        card.style.opacity = '0.7';
        card.style.boxShadow = '0 0 5px rgba(109, 46, 70, 0.2)';
        card.style.borderColor = '#6D2E46';
      }
    });
  }

  // Add animation classes to CTAs
  const ctaButtons = document.querySelectorAll('.btn-primary');
  ctaButtons.forEach(button => {
    // Add subtle pulse animation to primary buttons
    setInterval(() => {
      button.classList.add('pulse');
      setTimeout(() => {
        button.classList.remove('pulse');
      }, 1000);
    }, 5000);
  });

  // Function to enhance the burgundy color theme experience
  function initColorThemeEnhancements() {
    // Add subtle hover effect to benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.borderColor = '#6D2E46';
        this.style.boxShadow = '0 10px 25px rgba(109, 46, 70, 0.2)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
      });
    });
    
    // Add subtle gold accent to pricing plan hover
    const pricingPlans = document.querySelectorAll('.pricing-plan');
    pricingPlans.forEach(plan => {
      plan.addEventListener('mouseenter', function() {
        const badge = this.querySelector('.plan-badge');
        if (badge) {
          badge.style.backgroundColor = '#D4AF37';
          badge.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.5)';
        }
      });
      
      plan.addEventListener('mouseleave', function() {
        const badge = this.querySelector('.plan-badge');
        if (badge) {
          badge.style.backgroundColor = '';
          badge.style.boxShadow = '';
        }
      });
    });
    
    // Highlight current month in curriculum
    highlightCurrentMonth();
  }
});