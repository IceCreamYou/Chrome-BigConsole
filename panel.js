// Use a custom eval so we can test this page outside of dev tools for better inspection
var BigConsole_myEval;
try {
  BigConsole_myEval = chrome.devtools.inspectedWindow.eval;
}
catch(e) {
  BigConsole_myEval = function(strToEval, callbackWithResult) {
    try {
      callbackWithResult(eval(strToEval), false);
    }
    catch(ex) {
      callbackWithResult(undefined, ex);
    }
  };
}

(function() {

var HISTORY_MAX_LENGTH = 10;
var MAX_RECURSION_DEPTH = 10; // Call stack max is 1000 at time of writing
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
  else if (typeof s === 'function' || s instanceof Function) {
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
function setupEditor() {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.setHighlightActiveLine(true);
  editor.setShowPrintMargin(true);
  editor.setBehavioursEnabled(true);
  editor.setDisplayIndentGuides(true);
  editor.setHighlightActiveLine(true);
  editor.setHighlightGutterLine(true);
  editor.setHighlightSelectedWord(true);
  editor.setKeyboardHandler('windows');
  editor.setPrintMarginColumn(80);
  editor.setShowFoldWidgets(true);
  editor.setShowInvisibles(false);
  editor.setWrapBehavioursEnabled(false);
  var session = editor.getSession();
  session.setMode("ace/mode/javascript");
  session.setTabSize(2);
  session.setUseSoftTabs(true);
  session.setUseWrapMode(true);
  session.setWrapLimitRange(null, null); // free wrap
  editor.commands.removeCommands(["findnext", "gotoline"]); // Default is CTRL+L and CTRL+K which is super annoying
  editor.commands.addCommands([{
    name: "execute",
    bindKey: "ctrl+enter",
    exec: run,
    readOnly: true
  }, {
    name: "findnext",
    bindKey: {win: "Ctrl-G", mac: "Command-G"},
    exec: function(editor) { editor.findNext(); },
    readOnly: true
  }]);
  editor.focus();
  return editor;
}
function setupConsole() {
  var temp = function() {
    if (window.console && !console.BIGCONSOLE) {
      window._console = window.console;
    }
    if (window._bigconsole) {
      window.console = window._bigconsole;
      return;
    }
    window.console = {BIGCONSOLE: true};
    console.__data = [];
    console.log = function() {
      for (var i = 0; i < arguments.length; i++) {
        console.__data.push(arguments[i]);
      }
    };
    console.__dump = function() {
      var x = console.__data;
      console.__data = [];
      return x;
    };
  };
  return '('+temp+')();';
}
function teardownConsole() {
  var temp = function() {
    var x = [];
    try {
      x = console.__dump();
    } catch(e) {}
    if (window._console) {
      window._bigconsole = window.console;
      window.console = window._console;
      delete window._console;
    }
    return x;
  };
  return '('+temp+')();';
}
function prepareForEval(s) {
  return s;
}
function run(editor) {
  var s = editor.getValue();
  addToConsole(s, true);
  s = prepareForEval(s);
  BigConsole_myEval(setupConsole() + s, function(result, isError) {
    BigConsole_myEval(teardownConsole(), function(r, iE) {
      // The chrome documentation is wrong about the callback parameter values
      if (isError) {
        result = isError;
        isError = true;
      }
      for (var i = 0; i < r.length; i++) {
        addToConsole(r[i], false);
      }
      addToConsole(result, false, isError ? SEVERITY.ERROR : SEVERITY.LOG);
    });
  });
}
window.onload = function() {
  var editor = setupEditor();
  document.getElementById('run').addEventListener('click', function() {
    run(editor);
  });
  document.getElementById('clear').addEventListener('click', function() {
    editor.setValue('');
  });
  document.getElementById('log-inner').addEventListener('click', function(e) {
    var cur = e.target, i = 0, max = MAX_RECURSION_DEPTH+2;
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

}).call(this);
