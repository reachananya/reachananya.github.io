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
  });