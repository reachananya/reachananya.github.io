// portrait.js — exact port of gazijarin/Gazi-V2 AsciiPortrait.jsx → vanilla JS

(function () {
  var SIZE = 380;                            // square canvas (logical px)
  var CHARS = " .:-=+*#%@".split("");       // sparse → dense (brightness-mapped)

  // font / grid gaps matching her implementation
  var FONT_SIZE = 8;
  var COL_GAP   = FONT_SIZE * 0.7;          // 5.6
  var ROW_GAP   = FONT_SIZE * 1.1;          // 8.8

  var canvas = document.getElementById('portrait-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  canvas.width  = SIZE * dpr;
  canvas.height = SIZE * dpr;
  ctx.scale(dpr, dpr);
  canvas.style.width  = SIZE + 'px';
  canvas.style.height = SIZE + 'px';

  // ── Mouse (lagged, like hers) ──────────────────────────────
  var mouse       = { x: -1000, y: -1000, active: false };
  var mouseTarget = { x: -1000, y: -1000 };

  canvas.addEventListener('click', function () {
    window.location.href = 'about.html';
  });

  canvas.addEventListener('mousemove', function (e) {
    var r = canvas.getBoundingClientRect();
    mouseTarget.x = e.clientX - r.left;
    mouseTarget.y = e.clientY - r.top;
    mouse.active = true;
  });
  canvas.addEventListener('mouseleave', function () {
    mouse.active = false;
    mouseTarget.x = -1000;
    mouseTarget.y = -1000;
  });

  // ── Image sampling ─────────────────────────────────────────
  var rawParticles = [];

  function sampleImage(img) {
    var offscreen = document.createElement('canvas');
    offscreen.width  = SIZE;
    offscreen.height = SIZE;
    var oc = offscreen.getContext('2d');

    // Fill more of the canvas so face features are larger
    var scale     = 0.9;
    var imgAspect = img.naturalWidth / img.naturalHeight;
    var dh        = SIZE * scale;
    var dw        = dh * imgAspect;
    if (dw > SIZE * scale) { dw = SIZE * scale; dh = dw / imgAspect; }
    var ox = (SIZE - dw) / 2;
    var oy = (SIZE - dh) / 2;
    oc.drawImage(img, ox, oy, dw, dh);

    var pixels = oc.getImageData(0, 0, SIZE, SIZE).data;
    rawParticles = [];

    for (var y = 0; y < SIZE; y += ROW_GAP) {
      for (var x = 0; x < SIZE; x += COL_GAP) {
        var i  = (Math.floor(y) * SIZE + Math.floor(x)) * 4;
        var r  = pixels[i];
        var g  = pixels[i + 1];
        var b  = pixels[i + 2];
        var a  = pixels[i + 3];

        // Her filter: alpha > 128 (works for transparent PNGs)
        // Extra: also skip near-white pixels (white JPEG background)
        if (a < 128) continue;
        // luminance-based white filter: skips near-white background, keeps skin highlights
        var luma = 0.299 * r + 0.587 * g + 0.114 * b;
        if (luma > 245) continue;

        var brightness  = (r + g + b) / (3 * 255);
        var charIndex   = Math.floor(brightness * (CHARS.length - 1));

        rawParticles.push({
          x:     Number(x.toFixed(1)),
          y:     Number(y.toFixed(1)),
          char:  CHARS[charIndex],
          alpha: Number((0.4 + brightness * 0.6).toFixed(2))
        });
      }
    }
  }

  // ── Particle creation (her exact logic) ───────────────────
  var particles = [];

  function buildParticles() {
    particles = rawParticles.map(function (p) {
      return {
        x:            p.x + (Math.random() - 0.5) * 400,
        y:            p.y + (Math.random() - 0.5) * 400,
        targetX:      p.x,
        targetY:      p.y,
        vx:           0,
        vy:           0,
        char:         p.char,
        baseAlpha:    p.alpha,
        currentAlpha: 0,
        delay:        Math.random() * 0.4,
        shimmer:      Math.random() * Math.PI * 2
      };
    });
  }

  // ── Animation loop (her exact draw logic) ─────────────────
  var startTime = null;
  var animId;

  function draw(now) {
    animId = requestAnimationFrame(draw);

    if (startTime === null) startTime = now;
    var elapsed = (now - startTime) / 1000;   // seconds

    ctx.clearRect(0, 0, SIZE, SIZE);
    if (!particles.length) return;

    // Lag mouse position (her 0.15 lerp)
    mouse.x += (mouseTarget.x - mouse.x) * 0.15;
    mouse.y += (mouseTarget.y - mouse.y) * 0.15;

    ctx.font = FONT_SIZE + 'px monospace';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    for (var k = 0; k < particles.length; k++) {
      var p = particles[k];
      var particleTime = elapsed - p.delay;
      if (particleTime < 0) continue;

      // Fade-in alpha (her eased formula)
      var fadeProgress = Math.min(particleTime / 1.5, 1);
      var easedFade    = 1 - Math.pow(1 - fadeProgress, 2);

      var isActive = mouse.active || particleTime < 3.0;
      var shimmerVal = isActive ? Math.sin(elapsed * 2 + p.shimmer) * 0.1 : 0;
      p.currentAlpha = Math.max(0, p.baseAlpha * easedFade + shimmerVal);

      // Move easing toward target
      var moveProgress = Math.min(particleTime / 2.5, 1);
      var easedMove    = 1 - Math.pow(1 - moveProgress, 3);

      // Mouse repulsion (her exact formula)
      if (mouse.active) {
        var dx   = p.x - mouse.x;
        var dy   = p.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var maxDist = SIZE * 0.2;
        if (dist < maxDist && dist > 0) {
          var force = (1 - dist / maxDist) * 4;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      // Spring toward target (her ramping pullStrength)
      var tdx = p.targetX - p.x;
      var tdy = p.targetY - p.y;
      var pullStrength = 0.01 + easedMove * 0.08;
      p.vx += tdx * pullStrength;
      p.vy += tdy * pullStrength;

      if (isActive) {
        // Breathing micro-drift (her sin/cos)
        p.vx += Math.sin(elapsed * 0.5 + p.targetY * 0.1) * 0.15;
        p.vy += Math.cos(elapsed * 0.5 + p.targetX * 0.1) * 0.15;
        p.vx *= 0.92;
        p.vy *= 0.92;
      } else {
        p.vx *= 0.85;
        p.vy *= 0.85;
        // Hard-snap when fully settled
        if (particleTime > 4.0 && Math.abs(tdx) < 0.01 && Math.abs(tdy) < 0.01) {
          p.x = p.targetX; p.y = p.targetY;
          p.vx = 0; p.vy = 0;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      // Her color: rgba(100,255,218) = teal — adapted to site accent green
      ctx.fillStyle = 'rgba(80,216,144,' + p.currentAlpha.toFixed(2) + ')';
      ctx.fillText(p.char, p.x, p.y);
    }
  }

  // ── Load image and start ───────────────────────────────────
  function tryLoad(src, rest) {
    var img = new Image();
    img.onload = function () {
      sampleImage(img);
      buildParticles();
      requestAnimationFrame(draw);
    };
    img.onerror = function () {
      if (rest && rest.length) tryLoad(rest[0], rest.slice(1));
    };
    img.src = src;
  }

  document.addEventListener('DOMContentLoaded', function () {
    tryLoad('img/portrait.jpg', ['img/portrait.png', 'img/portrait.jpeg']);
  });

})();
