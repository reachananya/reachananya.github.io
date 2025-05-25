// Canvas resize handler
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('demo-canvas');
  const header = document.querySelector('.large-header');
  
  if (!canvas) return;
  
  // Function to properly size the canvas
  function resizeCanvas() {
    // Set canvas width and height to match the header
    if (canvas.width !== header.clientWidth || canvas.height !== header.clientHeight) {
      canvas.width = header.clientWidth;
      canvas.height = header.clientHeight;
      
      // If the demo.js has an init function, reinitialize it (optional)
      if (typeof window.initCanvas === 'function') {
        window.initCanvas();
      }
    }
  }
  
  // Function to adjust animation settings based on screen size
  function adjustAnimationSettings() {
    const isMobile = window.innerWidth <= 768;
    if (window.particlesJS) {
      // Get the current configuration
      const config = window.particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": isMobile ? 30 : 80, // Reduce number of particles on mobile
            "density": {
              "enable": true,
              "value_area": isMobile ? 1200 : 800 // Increase area between particles on mobile
            }
          },
          "color": {
            "value": "#2a9d5c"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            }
          },
          "opacity": {
            "value": isMobile ? 0.3 : 0.5, // Reduce opacity on mobile
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": isMobile ? 2 : 3, // Reduce particle size on mobile
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": isMobile ? 100 : 150, // Reduce connection distance on mobile
            "color": "#2a9d5c",
            "opacity": isMobile ? 0.2 : 0.4, // Reduce line opacity on mobile
            "width": 1
          }
        }
      });
    }
  }
  
  // Run on page load
  resizeCanvas();
  adjustAnimationSettings();
  
  // Run on window resize with debounce
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeCanvas();
      adjustAnimationSettings();
    }, 250);
  });
  
  // Ensure canvas remains full-size
  const observer = new ResizeObserver(() => {
    resizeCanvas();
  });
  
  // Observe the header element for size changes
  observer.observe(header);
}); 