var HISTORY_MAX_LENGTH = 10;
var SEVERITY = {
  TIP: 'tip',
  INFO: 'info',
  LOG: 'log',
  WARNING: 'warning',
  ERROR: 'error',
};
var history = [];
function addToHistory(s) {
  history.push(s);
  if (history.length > HISTORY_MAX_LENGTH) {
    history.shift();
  }
}
function addToConsole(s, input, sev) {
  var p = document.createElement('p');
  if (input) {
    p.className = 'input';
    p.textContent = '>>> ' + (s+'').replace(/\n/g, ' ').substring(0, 255);
  }
  else {
    p.appendChild(resultToOutput(s));
    p.className = 'output ' + (sev ? sev : SEVERITY.LOG);
  }
  document.getElementById('log-inner').appendChild(p);
  p.scrollIntoView(true);
}
function resultToOutput(s) {
  // TODO Use library that does this better and takes care of recursion
  var span = document.createElement('span');
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
    var x = document.createElement('span');
    x.textContent = '[';
    span.appendChild(x);
    var c = document.createElement('span');
    c.textContent = ', ';
    for (var i = 0, l = s.length; i < l; i++) {
      span.appendChild(resultToOutput(s[i]));
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
    var x = document.createElement('span');
    x.textContent = 'Object {';
    span.appendChild(x);
    var c = document.createElement('span');
    c.textContent = ', ';
    var d = document.createElement('span');
    d.textContent = ': ';
    var n = 0;
    for (var i in s) {
      if (s.hasOwnProperty(i)) {
        n++;
        span.appendChild(resultToOutput(i));
        span.appendChild(d.cloneNode(true));
        span.appendChild(resultToOutput(s[i]));
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
// Create a port with background page for message communication
window.onload = function() {
  try {
    var port = chrome.runtime.connect({name: "Eval in context"});
    // Add the eval'd response to the console when the background page sends it back
    port.onMessage.addListener(function (msg) {
      addToConsole(msg, false);
    });
  }
  catch(e) {
    console.error(e);
  }
  document.getElementById('run').addEventListener('click', function() {
    var s = document.getElementById('console').value;
    addToConsole(s, true);
    try {
      // Ask the background page to ask the content script to inject a script
      // into the DOM that can finally eval `s` in the right context.
      console.log('Posting message (panel.js): ' + s);
      port.postMessage(s);
    }
    catch(e) {
      addToConsole(e, false, SEVERITY.ERROR);
    }
  });
  document.getElementById('clear').addEventListener('click', function() {
    document.getElementById('console').value = '';
  });
  document.getElementById('log-inner').addEventListener('click', function(e) {
    e.target.parentNode.className += ' removeWrap';
  });
};
