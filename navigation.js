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
    
    // Auto-scroll only applies on pages that have the updates timeline
    if (timeline && wrapper) {
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
    }

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
    
    // NOTE: arrow vertical placement is handled entirely by CSS (the indicators
    // sit in normal flow directly under the tagline). A previous positionArrows()
    // helper set an explicit `top` computed relative to .main-title, but the
    // indicators' offset parent is their .*-group, so that offset was applied on
    // top of the group's flow position — pushing the arrows down and opening a
    // gap. Only the wrap/visibility check remains.

    // Run wrap check on page load with a small delay
    setTimeout(function() {
      checkTitleWrap();
    }, 100);

    // Run on window resize with debounce for performance
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        checkTitleWrap();
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
    
  });