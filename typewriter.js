// Typewriter effect — inner page titles only
(function () {

  var CSS = [
    '.tw-cursor { color: #50d890; animation: tw-blink 0.65s step-end infinite; }',
    '@keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }',
  ].join('\n');

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  function typeInto(el, text, speed, onDone) {
    el.textContent = '';
    var cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    cursor.textContent = '|';
    el.appendChild(cursor);
    var i = 0;
    function tick() {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i++]), cursor);
        setTimeout(tick, speed);
      } else {
        setTimeout(function () {
          cursor.style.visibility = 'hidden'; // keep space, no reflow
          if (onDone) onDone();
        }, 400);
      }
    }
    tick();
  }

  document.addEventListener('DOMContentLoaded', function () {

    // ── PAGE TITLE (inner pages) ──
    var pageTitle = document.querySelector('.page-header-thin .page-title');
    if (pageTitle) {
      var raw = pageTitle.textContent.trim();
      var text = '/' + raw;
      typeInto(pageTitle, text, 28);
    }

});
})();
