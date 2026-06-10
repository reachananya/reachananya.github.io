// Canvas resize handler
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('demo-canvas');
  const header = document.querySelector('.large-header');

  if (!canvas) return;

  function resizeCanvas() {
    // particles.js manages its own canvas sizing — nothing to do here
  }
  
  // Function to handle mobile vs desktop animation
  function handleAnimation() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // On mobile: Hide the canvas and remove any existing particles
      canvas.style.display = 'none';
      if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.particlesEmpty();
      }
    } else {
      // On desktop: Show the canvas and initialize particles
      canvas.style.display = 'block';
      if (window.particlesJS) {
        window.particlesJS('demo-canvas', {
          "particles": {
            "number": {
              "value": 80,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#c8c8c8"
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
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
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
              "distance": 150,
              "color": "#c8c8c8",
              "opacity": 0.25,
              "width": 0.4
            },
            "move": {
              "enable": true,
              "speed": 0.6,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            }
          },
          "retina_detect": true
        });
      }
    }
  }
  
  // Run on page load
  resizeCanvas();
  handleAnimation();
  
  // Run on window resize with debounce
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeCanvas();
      handleAnimation();
    }, 250);
  });
  
  // Ensure canvas remains full-size
  const observer = new ResizeObserver(() => {
    resizeCanvas();
  });
  
  // Observe the header element for size changes
  observer.observe(header);
}); 