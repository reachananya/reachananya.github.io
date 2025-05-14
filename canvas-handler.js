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
  
  // Run on page load
  resizeCanvas();
  
  // Run on window resize with debounce
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 250);
  });
  
  // Ensure canvas remains full-size
  const observer = new ResizeObserver(() => {
    resizeCanvas();
  });
  
  // Observe the header element for size changes
  observer.observe(header);
}); 