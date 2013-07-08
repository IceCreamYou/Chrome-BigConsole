var HISTORY_MAX_LENGTH = 10;
var MAX_RECURSION_DEPTH = 10;
var SEVERITY = {
  TIP: 'tip',
  INFO: 'info',
  LOG: 'log',
  WARNING: 'warning',
  ERROR: 'error',
};
var hist = [];
function addToHistory(s) {
  hist.push(s);
  if (hist.length > HISTORY_MAX_LENGTH) {
    hist.shift();
  }
}
function addToConsole(s, input, sev) {
  var p = document.createElement('p');
  if (input) {
    p.className = 'input';
    p.textContent = '>>> ' + (s+'').replace(/\r?\n|\n?\r/g, ' ');
  }
  else {
    p.appendChild(resultToOutput(s));
    p.className = 'output ' + (sev ? sev : SEVERITY.LOG);
  }
  document.getElementById('log-inner').appendChild(p);
  p.scrollIntoView(true);
}
function resultToOutput(s, depth) {
  // TODO Use library that does this better and takes care of recursion
  if (!depth) {
    depth = 1;
  }
  else {
    ++depth;
  }
  var span = document.createElement('span'), c, d, i, n, x;
  if (depth > MAX_RECURSION_DEPTH) return span;
  if (typeof s === 'undefined') {
    span.className = 'undefined';
    span.textContent = 'undefined';
  }
  else if (s === null) {
    span.className = 'undefined';
    span.textContent = 'null';
  }
  else if (typeof s === 'boolean' || s instanceof Boolean) {
    span.className = 'boolean';
    span.textContent = s+'';
  }
  else if (typeof s === 'number' || s instanceof Number) {
    span.className = 'number';
    span.textContent = s+'';
  }
  else if (typeof s === 'string' || s instanceof String) {
    span.className = 'boolean';
    span.textContent = '"' + s + '"';
  }
  else if (typeof s === 'function') {
    span.className = 'function';
    span.textContent = s+'';
  }
  else if (typeof s === 'xml') {
    span.className = 'xml';
    span.textContent = s+'';
  }
  else if (s instanceof Array) {
    span.className = 'array';
    x = document.createElement('span');
    x.textContent = '[';
    span.appendChild(x);
    c = document.createElement('span');
    c.textContent = ', ';
    for (i = 0, l = s.length; i < l; i++) {
      span.appendChild(resultToOutput(s[i], depth));
      if (i !== l-1) {
        span.appendChild(c.cloneNode(true));
      }
    }
    x = document.createElement('span');
    x.textContent = ']';
    span.appendChild(x);
  }
  else if (s instanceof Error) {
    span.className = 'error';
    span.textContent = s.name + ': ' + s.message + ' (line ' + s.lineNumber + ' in ' + s.fileName + ')' + "\n" + s.stack;
  }
  else {
    span.className = 'object';
    x = document.createElement('span');
    x.textContent = 'Object {';
    span.appendChild(x);
    c = document.createElement('span');
    c.textContent = ', ';
    d = document.createElement('span');
    d.textContent = ': ';
    n = 0;
    for (i in s) {
      if (s.hasOwnProperty(i)) {
        n++;
        span.appendChild(resultToOutput(i, depth));
        span.appendChild(d.cloneNode(true));
        span.appendChild(resultToOutput(s[i], depth));
        span.appendChild(c.cloneNode(true));
      }
    }
    if (n) {
      span.removeChild(span.lastChild);
    }
    x = document.createElement('span');
    x.textContent = '}';
    span.appendChild(x);
  }
  return span;
}
function prepareForEval(s) {
  return s;
}
window.onload = function() {
  // Use a custom eval so we can test this page outside of dev tools for better inspection
  var myEval;
  try {
    myEval = chrome.devtools.inspectedWindow.eval;
  }
  catch(e) {
    myEval = function(x, y) {
      try {
        var z = eval(x);
        y(z, false);
      }
      catch(ex) {
        y(undefined, ex);
      }
    };
  }
  document.getElementById('run').addEventListener('click', function() {
    var s = document.getElementById('console').value;
    addToConsole(s, true);
    try {
      // Ask the background page to ask the content script to inject a script
      // into the DOM that can finally eval `s` in the right context.
      s = prepareForEval(s);
      myEval(s, function(result, isError) {
        if (isError) {
          result = isError;
          isError = true;
        }
        addToConsole(result, false, isError ? SEVERITY.ERROR : SEVERITY.LOG);
      });
    }
    catch(e) {
      addToConsole(e, false, SEVERITY.ERROR);
    }
  });
  document.getElementById('clear').addEventListener('click', function() {
    document.getElementById('console').value = '';
  });
  document.getElementById('log-inner').addEventListener('click', function(e) {
    var cur = e.target, i = 0, max = 10;
    // Find the first <p> ancestor
    do {
      i++;
      cur = cur.parentNode;
    } while (cur.parentNode && i < max && cur.nodeName.toLowerCase() !== 'p');
    // Toggle the removeWrap class
    if (cur.className.indexOf('removeWrap') == -1) {
      cur.className += ' removeWrap';
    }
    else {
      cur.className = cur.className.replace(/\bremoveWrap\b/, '');
    }
  });
};
