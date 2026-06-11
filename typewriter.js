// Typewriter effect — page titles + landing name
(function () {

  var CSS = [
    '.tw-cursor { color: #50d890; animation: tw-blink 0.65s step-end infinite; }',
    '@keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }',
    /* name underline emerges after typing */
    '.name-typed-line {',
    '  display: block;',
    '  height: 2px;',
    '  background: #50d890;',
    '  width: 0;',
    '  margin: 10px auto 0;',
    '  transition: width 0.6s ease;',
    '}',
    '.name-typed .name-typed-line { width: 80px; }',
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
      typeInto(pageTitle, text, 55);
    }

    // ── LANDING NAME ──
    var nameHeader = document.querySelector('.main-title-header');
    if (nameHeader) {
      var nameLink = nameHeader.querySelector('.name-link');
      if (nameLink) {
        // add line element
        var line = document.createElement('span');
        line.className = 'name-typed-line';
        nameHeader.appendChild(line);

        // hide children, build plain target
        nameLink.innerHTML = '';
        typeInto(nameLink, 'Ananya Singhal', 75, function () {
          // restore spans for hover/arrow JS
          nameLink.innerHTML = '<strong><span>Ananya</span> <span>Singhal</span></strong>';
          // trigger line
          nameHeader.classList.add('name-typed');
        });
      }
    }

  });
})();
