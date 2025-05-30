document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.updates-timeline');
    const wrapper = document.querySelector('.updates-wrapper');
    let autoScrollInterval;
    let hasReachedBottom = false;
    
    // Function to start auto scrolling
    function startAutoScroll() {
      // Clear any existing interval to prevent multiple intervals
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
      
      // Only start if we haven't reached bottom yet
      if (!hasReachedBottom) {
        autoScrollInterval = setInterval(function() {
          // Small increment for smooth scrolling
          timeline.scrollTop += 1;
          
          // Check if we've reached the bottom
          if (timeline.scrollTop + timeline.clientHeight >= timeline.scrollHeight) {
            clearInterval(autoScrollInterval);
            hasReachedBottom = true;
          }
        }, 50); // Adjust speed - higher number = slower scroll
      }
    }
    
    // Start scrolling when page loads
    startAutoScroll();
    
    // Pause when mouse enters
    wrapper.addEventListener('mouseenter', function() {
      clearInterval(autoScrollInterval);
    });
    
    // Resume when mouse leaves (if not at bottom)
    wrapper.addEventListener('mouseleave', function() {
      if (!hasReachedBottom) {
        startAutoScroll();
      }
    });
    
    // Stop auto-scroll if user manually scrolls
    timeline.addEventListener('wheel', function() {
      clearInterval(autoScrollInterval);
      // Don't restart automatically after manual scroll
    });

    // Function to check if small-title is wrapping and manage arrow visibility
    function checkTitleWrap() {
      const smallTitle = document.querySelector('.small-title');
      const arrowGroups = document.querySelectorAll('.projects-group, .code-group, .research-group');
      
      if (smallTitle) {
        // Get the height of the small title
        const titleHeight = smallTitle.offsetHeight;
        // Get the line height (approximate using font size)
        const computedStyle = window.getComputedStyle(smallTitle);
        const fontSize = parseFloat(computedStyle.fontSize);
        const lineHeight = fontSize * 1.5; // Slightly increased for better detection
        
        // If height is significantly more than one line, it's wrapping
        const isWrapping = titleHeight > (lineHeight * 1.2);
        
        // Also check window width for a more reliable approach
        const isMobile = window.innerWidth <= 768;
        
        // Hide arrow groups if wrapping or on mobile - no transition
        arrowGroups.forEach(group => {
          if (isWrapping || isMobile) {
            group.style.display = 'none';
          } else {
            group.style.display = 'block';
          }
        });
      }
    }
    
    // Function to position arrows based on their associated text elements
    function positionArrows() {
      // Only proceed if arrows are visible
      if (window.innerWidth <= 768) return;
      
      // Get the text elements and their associated arrow groups
      const projectPointer = document.querySelector('.project-pointer-container');
      const codePointer = document.querySelector('.code-pointer-container');
      const researchPointer = document.querySelector('.research-pointer-container');
      
      const projectsGroup = document.querySelector('.projects-group');
      const codeGroup = document.querySelector('.code-group');
      const researchGroup = document.querySelector('.research-group');
      
      // Get the main title element to calculate relative positioning
      const mainTitle = document.querySelector('.main-title');
      
      // Only proceed if elements are found
      if (!mainTitle || !projectPointer || !codePointer || !researchPointer) return;
      
      // Get the position and dimensions
      const mainTitleRect = mainTitle.getBoundingClientRect();
      const projectRect = projectPointer.getBoundingClientRect();
      const codeRect = codePointer.getBoundingClientRect();
      const researchRect = researchPointer.getBoundingClientRect();
      
      // Calculate optimal positions for arrows based on text positions
      // We're setting explicit top values relative to the mainTitle
      if (projectsGroup) {
        const projectsIndicator = projectsGroup.querySelector('.projects-indicator');
        if (projectsIndicator) {
          projectsIndicator.style.top = (projectRect.bottom - mainTitleRect.top - 140) + 'px';
          projectsIndicator.style.bottom = 'auto'; // Override any bottom setting
        }
      }
      
      if (codeGroup) {
        const codeIndicator = codeGroup.querySelector('.code-indicator');
        if (codeIndicator) {
          codeIndicator.style.top = (codeRect.bottom - mainTitleRect.top - 140) + 'px';
          codeIndicator.style.bottom = 'auto'; // Override any bottom setting
        }
      }
      
      if (researchGroup) {
        const researchIndicator = researchGroup.querySelector('.research-indicator');
        if (researchIndicator) {
          researchIndicator.style.top = (researchRect.bottom - mainTitleRect.top - 145) + 'px';
          researchIndicator.style.bottom = 'auto'; // Override any bottom setting
        }
      }
    }
    
    // Run checks and positioning on page load with a small delay
    setTimeout(function() {
      checkTitleWrap();
      positionArrows();
    }, 100);
    
    // Run on window resize with debounce for performance
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        checkTitleWrap();
        positionArrows();
      }, 250);
    });
    
    // Handle scroll down button
    const scrollDownLink = document.querySelector('.scroll-down-link');
    if (scrollDownLink) {
      scrollDownLink.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Smooth scroll to target
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    }
    
    // Mobile Sidebar Navigation - Completely rewritten for reliability
    document.addEventListener('click', function(event) {
      // Handle hamburger menu click
      if (event.target.closest('.hamburger-menu') || event.target.matches('.hamburger-icon span')) {
        console.log('Hamburger clicked through event delegation');
        
        const hamburgerIcon = document.querySelector('.hamburger-icon');
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const sidebarOverlay = document.querySelector('.sidebar-overlay');
        
        // Toggle classes
        if (hamburgerIcon) hamburgerIcon.classList.toggle('hamburger-active');
        if (mobileSidebar) mobileSidebar.classList.toggle('active');
        if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
        
        // Toggle body scroll
        if (mobileSidebar && mobileSidebar.classList.contains('active')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
      
      // Handle sidebar close button click
      if (event.target.closest('.sidebar-close')) {
        console.log('Close button clicked through event delegation');
        
        const hamburgerIcon = document.querySelector('.hamburger-icon');
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const sidebarOverlay = document.querySelector('.sidebar-overlay');
        
        // Remove active classes
        if (hamburgerIcon) hamburgerIcon.classList.remove('hamburger-active');
        if (mobileSidebar) mobileSidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      // Handle sidebar overlay click
      if (event.target.closest('.sidebar-overlay')) {
        console.log('Overlay clicked through event delegation');
        
        const hamburgerIcon = document.querySelector('.hamburger-icon');
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const sidebarOverlay = document.querySelector('.sidebar-overlay');
        
        // Remove active classes
        if (hamburgerIcon) hamburgerIcon.classList.remove('hamburger-active');
        if (mobileSidebar) mobileSidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      // Handle sidebar item click
      if (event.target.closest('.sidebar-item')) {
        console.log('Sidebar item clicked through event delegation');
        
        const hamburgerIcon = document.querySelector('.hamburger-icon');
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const sidebarOverlay = document.querySelector('.sidebar-overlay');
        
        // Remove active classes
        if (hamburgerIcon) hamburgerIcon.classList.remove('hamburger-active');
        if (mobileSidebar) mobileSidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Debug logging on page load
    window.addEventListener('load', function() {
      console.log('Page fully loaded - navigation elements:');
      console.log('- hamburgerMenu:', !!document.querySelector('.hamburger-menu'));
      console.log('- hamburgerIcon:', !!document.querySelector('.hamburger-icon'));
      console.log('- mobileSidebar:', !!document.querySelector('.mobile-sidebar'));
      console.log('- sidebarClose:', !!document.querySelector('.sidebar-close'));
      console.log('- sidebarOverlay:', !!document.querySelector('.sidebar-overlay'));
    });
  });
  
  // Immediate initialization for mobile navigation
  console.log('Immediate navigation check:');
  console.log('- hamburgerMenu:', !!document.querySelector('.hamburger-menu'));
  console.log('- hamburgerIcon:', !!document.querySelector('.hamburger-icon'));
  console.log('- mobileSidebar:', !!document.querySelector('.mobile-sidebar'));
  console.log('- sidebarClose:', !!document.querySelector('.sidebar-close'));
  console.log('- sidebarOverlay:', !!document.querySelector('.sidebar-overlay'));
  
  // Add click handlers outside DOMContentLoaded if needed
  const hamburgerMenuDirect = document.querySelector('.hamburger-menu');
  if (hamburgerMenuDirect) {
    console.log('Adding direct click handler to hamburger menu');
    hamburgerMenuDirect.addEventListener('click', function() {
      console.log('Direct hamburger click detected');
      const hamburgerIcon = document.querySelector('.hamburger-icon');
      const mobileSidebar = document.querySelector('.mobile-sidebar');
      const sidebarOverlay = document.querySelector('.sidebar-overlay');
      
      if (hamburgerIcon) hamburgerIcon.classList.toggle('hamburger-active');
      if (mobileSidebar) mobileSidebar.classList.toggle('active');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
      
      if (mobileSidebar && mobileSidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }