/**
 * Evaluates commands in the editor panel.
 *
 * By Isaac Sukin (IceCreamYou) 2015. MIT Licensed.
 */
(function() {

// See prettyprint.js for the copyright notice on this code. Minified with:
// uglifyjs --screw-ie8 -m -c dead_code=false,side_effects=false,unused=false --comments /^\s*Copyright/ -v --output prettyprint.min.js -- prettyprint.js
var prettyPrintString = ((function() {
  /* var prettyPrint=function(){var e={el:function(t,n){var o=document.createElement(t),r;if(n=e.merge({},n),n&&n.style){var a=n.style;e.applyCSS(o,n.style),delete n.style}for(r in n)n.hasOwnProperty(r)&&(o[r]=n[r]);return o},applyCSS:function(e,t){for(var n in t)if(t.hasOwnProperty(n))try{e.style[n]=t[n]}catch(o){}},txt:function(e){return document.createTextNode(e)},row:function(t,n,o){o=o||"td";var r=e.count(t,null)+1,a=e.el("tr"),d,i={style:e.getStyles(o,n),colSpan:r,onmouseover:function(){var t=this.parentNode.childNodes;e.forEach(t,function(t){"td"===t.nodeName.toLowerCase()&&e.applyCSS(t,e.getStyles("td_hover",n))})},onmouseout:function(){var t=this.parentNode.childNodes;e.forEach(t,function(t){"td"===t.nodeName.toLowerCase()&&e.applyCSS(t,e.getStyles("td",n))})}};return e.forEach(t,function(t){null!==t&&(d=e.el(o,i),t.nodeType?d.appendChild(t):d.innerHTML=e.shorten(t.toString()),a.appendChild(d))}),a},hRow:function(t,n){return e.row(t,n,"th")},table:function(t,n){t=t||[];var o={thead:{style:e.getStyles("thead",n)},tbody:{style:e.getStyles("tbody",n)},table:{style:e.getStyles("table",n)}},r=e.el("table",o.table),a=e.el("thead",o.thead),d=e.el("tbody",o.tbody);return t.length&&(r.appendChild(a),a.appendChild(e.hRow(t,n))),r.appendChild(d),{node:r,tbody:d,thead:a,appendChild:function(e){this.tbody.appendChild(e)},addRow:function(t,o,r){return this.appendChild(e.row.call(e,t,o||n,r)),this}}},shorten:function(e){return e},htmlentities:function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},merge:function(t,n){"object"!=typeof t&&(t={});for(var o in n)if(n.hasOwnProperty(o)){var r=n[o];if("object"==typeof r){t[o]=e.merge(t[o],r);continue}t[o]=r}for(var a=2,d=arguments.length;d>a;a++)e.merge(t,arguments[a]);return t},count:function(e,t){for(var n=0,o=0,r=e.length;r>o;o++)e[o]===t&&n++;return n},thead:function(e){return e.getElementsByTagName("thead")[0]},forEach:function(e,t,n){n||(n=t);for(var o=e.length,r=-1;++r<o&&n(e[r],r,e)!==!1;);return!0},type:function(e){try{if(null===e)return"null";if(void 0===e)return"undefined";var t=Object.prototype.toString.call(e).match(/\s(.+?)\]/)[1].toLowerCase();return e.nodeType?1===e.nodeType?"domelement":"domnode":/^(string|number|array|regexp|function|date|boolean|error)$/.test(t)?t:"object"==typeof e?e.jquery&&"string"==typeof e.jquery?"jquery":"object":e===window||e===document?"object":"default"}catch(n){return"default"}},within:function(e){return{is:function(t){for(var n in e)if(e[n]===t)return n;return""}}},common:{circRef:function(n,o,r){return e.expander("[POINTS BACK TO <strong>"+o+"</strong>]","Click to show this item anyway",function(){this.parentNode.appendChild(t(n,{maxDepth:1}))})},depthReached:function(n,o){return e.expander("[DEPTH REACHED]","Click to show this item anyway",function(){try{this.parentNode.appendChild(t(n,{maxDepth:1}))}catch(o){this.parentNode.appendChild(e.table(["ERROR OCCURED DURING OBJECT RETRIEVAL"],"error").addRow([o.message]).node)}})}},getStyles:function(n,o){return o=t.settings.styles[o]||{},e.merge({},t.settings.styles.default[n],o[n])},expander:function(t,n,o){return e.el("a",{innerHTML:e.shorten(t)+' <b style="visibility:hidden;">[+]</b>',title:n,onmouseover:function(){this.getElementsByTagName("b")[0].style.visibility="visible"},onmouseout:function(){this.getElementsByTagName("b")[0].style.visibility="hidden"},onclick:function(){return this.style.display="none",o.call(this),!1},style:{cursor:"pointer"}})},stringify:function(t){var n=e.type(t),o,r=!0;if("array"===n)return o="[",e.forEach(t,function(t,n){o+=(0===n?"":", ")+e.stringify(t)}),o+"]";if("object"==typeof t){o="{";for(var a in t)t.hasOwnProperty(a)&&(o+=(r?"":", ")+a+":"+e.stringify(t[a]),r=!1);return o+"}"}return"regexp"===n?"/"+t.source+"/":"string"===n?'"'+t.replace(/"/g,'\\"')+'"':t.toString()},headerGradient:function(){var e=document.createElement("canvas");if(!e.getContext)return"";var t=e.getContext("2d");e.height=30,e.width=1;var n=t.createLinearGradient(0,0,0,30);n.addColorStop(0,"rgba(0,0,0,0)"),n.addColorStop(1,"rgba(0,0,0,0.25)"),t.fillStyle=n,t.fillRect(0,0,1,30);var o=e.toDataURL&&e.toDataURL();return"url("+(o||"")+")"}()},t=function(n,o){o=o||{};var r=e.merge({},t.config,o),a=e.el("div"),d=t.config,i=0,l={},c=!1;t.settings=r;var u={string:function(t){return e.txt('"'+e.shorten(t.replace(/"/g,'\\"'))+'"')},number:function(t){return e.txt(t)},regexp:function(t){var n=e.table(["RegExp",null],"regexp"),o=e.table(),a=e.expander("/"+t.source+"/","Click to show more",function(){this.parentNode.appendChild(n.node)});return o.addRow(["g",t.global]).addRow(["i",t.ignoreCase]).addRow(["m",t.multiline]),n.addRow(["source","/"+t.source+"/"]).addRow(["flags",o.node]).addRow(["lastIndex",t.lastIndex]),r.expanded?n.node:a},domelement:function(t,n){var o=e.table(["DOMElement",null],"domelement"),a=["id","className","innerHTML","src","href"],d=t.nodeName||"";return o.addRow(["tag","&lt;"+d.toLowerCase()+"&gt;"]),e.forEach(a,function(n){t[n]&&o.addRow([n,e.htmlentities(t[n])])}),r.expanded?o.node:e.expander("DOMElement ("+d.toLowerCase()+")","Click to show more",function(){this.parentNode.appendChild(o.node)})},domnode:function(t){var n=e.table(["DOMNode",null],"domelement"),o=e.htmlentities((t.data||"UNDEFINED").replace(/\n/g,"\\n"));return n.addRow(["nodeType",t.nodeType+" ("+t.nodeName+")"]).addRow(["data",o]),r.expanded?n.node:e.expander("DOMNode","Click to show more",function(){this.parentNode.appendChild(n.node)})},jquery:function(e,t,n){return u.array(e,t,n,!0)},object:function(t,n,o){var a=e.within(l).is(t);if(a)return e.common.circRef(t,a,r);if(l[o||"TOP"]=t,n===r.maxDepth)return e.common.depthReached(t,r);var d=e.table(["Object",null],"object"),i=!0;for(var s in t)if(!t.hasOwnProperty||t.hasOwnProperty(s)){var p=t[s],h=e.type(p);i=!1;try{d.addRow([s,u[h](p,n+1,s)],h)}catch(f){window.console&&window.console.log&&console.log(f.message)}}i?d.addRow(["<small>[empty]</small>"]):d.thead.appendChild(e.hRow(["key","value"],"colHeader"));var m=r.expanded||c?d.node:e.expander(e.stringify(t),"Click to show more",function(){this.parentNode.appendChild(d.node)});return c=!0,m},array:function(t,n,o,a){var d=e.within(l).is(t);if(d)return e.common.circRef(t,d);if(l[o||"TOP"]=t,n===r.maxDepth)return e.common.depthReached(t);var i=a?"jQuery":"Array",c=e.table([i+"("+t.length+")",null],a?"jquery":i.toLowerCase()),s=!0,p=0;return a&&c.addRow(["selector",t.selector]),e.forEach(t,function(o,a){return r.maxArray>=0&&++p>r.maxArray?(c.addRow([a+".."+(t.length-1),u[e.type(o)]("...",n+1,a)]),!1):(s=!1,c.addRow([a,u[e.type(o)](o,n+1,a)]),void 0)}),a||(s?c.addRow(["<small>[empty]</small>"]):c.thead.appendChild(e.hRow(["index","value"],"colHeader"))),r.expanded?c.node:e.expander(e.stringify(t),"Click to show more",function(){this.parentNode.appendChild(c.node)})},error:function(t){var n=e.table(["Error",null],"error");return n.addRow(["Type",t.name]).addRow(["Message",t.message]).addRow(["Stack trace",t.stack]),r.expanded?n.node:e.expander(e.stringify(t),"Click to show more",function(){this.parentNode.appendChild(n.node)})},"function":function(t,n,o){var a=e.within(l).is(t);if(a)return e.common.circRef(t,a);l[o||"TOP"]=t;var d=e.table(["Function",null],"function"),i=e.table(["Arguments"]),c=(t.toString().match(/^function\s+(\w+)\b/)||["","<anonymous>"])[1],u=t.toString().match(/\((.+?)\)/),s=t.toString().match(/\(.*?\)\s+?\{?([\S\s]+)/)[1].replace(/\}?$/,"");return d.addRow(["method name",c]).addRow(["arguments",u?u[1].replace(/[^\w_,\s]/g,""):"<small>[none/native]</small>"]).addRow(["body",s]),r.expanded?d.node:e.expander("function(){...}","Click to see more about this function.",function(){this.parentNode.appendChild(d.node)})},date:function(t){var n=e.table(["Date",null],"date"),o=t.toString().split(/\s/);return n.addRow(["Time",o[4]]).addRow(["Date",o.slice(0,4).join("-")]),r.expanded?n.node:e.expander("Date (timestamp): "+ +t,"Click to see a little more info about this date",function(){this.parentNode.appendChild(n.node)})},"boolean":function(t){return e.txt(t.toString().toUpperCase())},undefined:function(){return e.txt("UNDEFINED")},"null":function(){return e.txt("NULL")},"default":function(){return e.txt("prettyPrint: TypeNotFound Error")}};return a.appendChild(u[r.forceObject?"object":e.type(n)](n,i)),a};return t.config={expanded:!0,forceObject:!1,maxDepth:3,maxArray:-1,styles:{array:{th:{backgroundColor:"#6DBD2A",color:"white"}},"function":{th:{backgroundColor:"#D82525"}},regexp:{th:{backgroundColor:"#E2F3FB",color:"#000"}},object:{th:{backgroundColor:"#1F96CF"}},jquery:{th:{backgroundColor:"#FBF315"}},error:{th:{backgroundColor:"red",color:"yellow"}},domelement:{th:{backgroundColor:"#F3801E"}},date:{th:{backgroundColor:"#A725D8"}},colHeader:{th:{backgroundColor:"#EEE",color:"#000",textTransform:"uppercase"}},"default":{table:{borderCollapse:"collapse",width:"100%"},td:{padding:"5px",fontSize:"12px",backgroundColor:"#FFF",color:"#222",border:"1px solid #000",verticalAlign:"top",fontFamily:'"Consolas","Lucida Console",Courier,mono',whiteSpace:"pre"},td_hover:{},th:{padding:"5px",fontSize:"12px",backgroundColor:"#222",color:"#EEE",textAlign:"left",border:"1px solid #000",verticalAlign:"top",fontFamily:'"Consolas","Lucida Console",Courier,mono',backgroundImage:e.headerGradient,backgroundRepeat:"repeat-x"}}}},t}(); */
}) + '').match(/^[\s\S]*?\/\*!?\s*([\s\S]+?)\s*\*\/$/m)[1];

/**
 * Severity levels.
 */
var SEVERITY = {
  TIP: 'tip',
  INFO: 'info',
  INPUT: 'input',
  LOG: 'log',
  WARNING: 'warn',
  ERROR: 'error',
};

/**
 * Translates strings.
 *
 * Currently a placeholder.
 */
function t(s) {
  return s;
}

/**
 * Escapes HTML.
 */
function escapeHTML(s) {
  var el = document.createElement('div');
  el.textContent = s;
  return el.innerHTML;
}

/**
 * Evaluates code.
 *
 * This is copied to a local variable in order to more easily test outside of
 * Chrome Dev Tools.
 *
 * @param {String} strToEval
 *   The string to evaluate as JavaScript.
 * @param {Function} callbackWithResult
 *   A function to invoke after the string is evaluated. If the string is
 *   evaluated without errors, this function gets the return value passed to it
 *   as the first parameter and `false` as the second parameter. Otherwise,
 *   the first parameter is `undefined` and the second parameter is the
 *   exception that was thrown. This is because of the way that Chrome's
 *   evaluate-in-window function behaves (which is actually different than what
 *   the Chrome extension documentation claims).
 */
var BigConsoleEval;
try {
  BigConsoleEval = chrome.devtools.inspectedWindow.eval;
}
catch(e) {
  BigConsoleEval = function(strToEval, callbackWithResult) {
    try {
      callbackWithResult(eval(strToEval), false);
    }
    catch(ex) {
      callbackWithResult(undefined, ex);
    }
  };
}

/**
 * The history of snippets the user evaluated.
 */
var SnippetHistory = (function() {
  var HISTORY_MAX_ENTRY_COUNT = 10,
      HISTORY_SNIPPET_DEFAULT_MAX_LENGTH = 40;
      hist = [];

  /**
   * Transforms a snippet into text suitable for an HTML option content.
   *
   * @param {String} snippet
   *   The code snippet to transform.
   * @param {Number} [maxLength=HISTORY_SNIPPET_DEFAULT_MAX_LENGTH]
   *   The maximum length of the option string.
   */
  function snippetToOptionString(snippet, maxLength) {
    if (typeof maxLength === 'undefined') {
      maxLength = HISTORY_SNIPPET_DEFAULT_MAX_LENGTH;
    }

    // Flatten to one line.
    snippet = escapeHTML(snippet).replace(/\s+/g, ' ');

    // Abbreviate snippet.
    var snippetLength = snippet.length;
    if (snippetLength > maxLength) {
      snippet = snippet.substring(0, 25) + '&hellip;' +
                snippet.substring(snippetLength - 15, snippetLength);
    }

    return snippet;
  }

  return {
    /**
     * Add a snippet to the history.
     *
     * @param {String} command
     *   A snippet to add to the command history.
     */
    add: function(command) {
      hist.push(command);
      if (hist.length > HISTORY_MAX_ENTRY_COUNT) {
        hist.shift();
      }
    },
    clear: function() {
      hist.length = 0;
    },
    get: function(index) {
      if (typeof index === 'number') {
        return hist[index];
      }
      return hist.slice();
    },
    render: function () {
      var output = '<select class="snippet-history">';
      output += '<option value="" selected>' + t('History') + '</option>';
      for (var i = 0, l = hist.length; i < l; i++) {
        output += '<option value="' + i + '">' +
                    snippetToOptionString(hist[i]) +
                  '</option>';
      }
      output += '</select>';
      return output;
    },
  };
})();

/**
 * Wrap the snippet so that it executes as desired.
 *
 * Instead of wrapping the console object, it would be convenient to use
 * https://developer.chrome.com/extensions/experimental_devtools_console to
 * just display whatever the normal console would display. However, that API
 * has been experimental and mostly undocumented for years, so it doesn't look
 * like using it is a viable path at this time.
 */
function prepareForEval(snippet) {
  return '(function() {' +
      'var prop;' +
      'if (typeof console.__BIGCONSOLE !== \'object\') {' +
        'console.__BIGCONSOLE = {' +
          'error: [],' +
          'info: [],' +
          'log: [],' +
          'warn: [],' +
        '};' +
        'var c2 = {};' +
        'for (prop in console.__BIGCONSOLE) {' +
          'if (console.__BIGCONSOLE.hasOwnProperty(prop)) {' +
            'c2[prop] = console[prop];' +
            '(function(prop) {' +
              'console[prop] = function() {' +
                'c2[prop].apply(this, arguments);' +
                'console.__BIGCONSOLE[prop].push(Array.prototype.slice.call(arguments));' +
              '};' +
            '})(prop);' +
          '}' +
        '}' +
      '}' +
      'else {' +
        'console.__BIGCONSOLE = {' +
          'error: [],' +
          'info: [],' +
          'log: [],' +
          'warn: [],' +
        '};' +
      '}' +
      'var data,' +
          '__CLEAR = clear,' +
          'didClear = false;' +
      'clear = function() {' +
        'didClear = true;' +
        '__CLEAR();' +
      '};' +
      'try {' +
        'data = eval("' + snippet.replace(
          /\0|\'|\"|\\|\n|\r|\v|\t|[\b]|\f/g,
          function(match) {
            // Escape string escape sequences.
            return '\\' + match;
          }
        ) + '");' +
      '}' +
      'catch (exception) {' +
        'data = exception;' +
      '}' +
      prettyPrintString +
      'var wrapperElement = document.createElement(\'div\');' +
      'wrapperElement.appendChild(prettyPrint(data));' +
      'var data = wrapperElement.innerHTML,' +
          'logs = {};' +
      'for (prop in console.__BIGCONSOLE) {' +
        'if (console.__BIGCONSOLE.hasOwnProperty(prop)) {' +
          'logs[prop] = [];' +
          'console.__BIGCONSOLE[prop].forEach(function(item) {' +
            'while (wrapperElement.lastChild) {' +
              'wrapperElement.removeChild(wrapperElement.lastChild);' +
            '}' +
            'wrapperElement.appendChild(item.length === 1 ? prettyPrint(item[0]) : prettyPrint(item));' +
            'logs[prop].push(wrapperElement.innerHTML);' +
          '});' +
        '}' +
      '}' +
      'return {' +
        'clear: didClear,' +
        'data: data,' +
        'logs: logs,' +
      '};' +
    '})();';
}

/**
 * Adds text to the console.
 *
 * @param {String} message
 *   The text to add to the console. Input is escaped but other messages are
 *   not.
 * @param {String} [sev=SEVERITY.LOG]
 *   A severity level for the console message.
 */
function addToConsole(message, sev) {
  var p = document.createElement('div');
  p.classList.add('log-item');
  p.classList.add(sev ? sev : SEVERITY.LOG);
  if (sev === SEVERITY.INPUT) {
    p.textContent = (message+'').replace(/\r?\n|\n?\r/g, ' ');
  }
  else {
    if (typeof message === 'string') {
      var el = document.createElement('div');
      el.innerHTML = message;
      message = el;
    }
    p.appendChild(message);
    p.classList.add('output');
  }
  document.getElementById('log-inner').appendChild(p);
  p.scrollIntoView(true);
}

/**
 * Run the snippet.
 */
function run(editor) {
  var snippet = editor.getValue();
  SnippetHistory.add(snippet);
  addToConsole(snippet, SEVERITY.INPUT);

  s = prepareForEval(snippet);
  try {
    BigConsoleEval(s, function(result, isError) {
      if (isError || typeof result !== 'object') {
        addToConsole(prettyPrint(isError), SEVERITY.ERROR);
        return;
      }
      if (result.clear) {
        document.getElementById('log-inner').innerHTML = '';
      }
      if (result.logs) {
        ['error', 'info', 'log', 'warn'].forEach(function(severity) {
          result.logs[severity].forEach(function(item) {
            addToConsole(item, severity);
          });
        });
      }
      addToConsole(result.data);
    });
  }
  catch(e) {
    addToConsole(prettyPrint(e), SEVERITY.ERROR);
  }
  document.getElementById('snippets').innerHTML = SnippetHistory.render();
}

/**
 * Sets up the Ace Editor.
 */
function setupEditor() {
  var editor = ace.edit('editor');
  editor.setTheme('ace/theme/monokai');
  editor.setBehavioursEnabled(true);
  editor.setDisplayIndentGuides(true);
  editor.setHighlightActiveLine(true);
  editor.setHighlightGutterLine(true);
  editor.setHighlightSelectedWord(true);
  editor.setPrintMarginColumn(80);
  editor.setShowFoldWidgets(true);
  editor.setShowInvisibles(false);
  editor.setShowPrintMargin(true);
  editor.setWrapBehavioursEnabled(false);

  var session = editor.getSession();
  session.setMode('ace/mode/javascript');
  session.setTabSize(2);
  session.setUseSoftTabs(true);
  session.setUseWrapMode(true);
  session.setWrapLimitRange(null, null); // free wrap

  // Map/remap/unmap keyboard commands.
  editor.commands.removeCommands([
    'findnext', // Defaults to Ctrl-K
    'gotoline', // Defaults to Ctrl-L
    'transposeletters', // Defaults to Ctrl-T
  ]);
  editor.commands.addCommands([{
      name: 'execute',
      bindKey: 'ctrl+enter',
      exec: run,
      readOnly: true,
    }, {
      name: 'findnext',
      bindKey: {
        win: 'Ctrl-G',
        mac: 'Command-G',
      },
      exec: function(editor) {
        editor.findNext();
      },
      readOnly: true,
    }
  ]);
  editor.focus();
  return editor;
}

/**
 * Set up.
 */
window.addEventListener('load', function() {
  // Manage the editor.
  var editor = setupEditor();
  document.getElementById('run').addEventListener('click', function() {
    run(editor);
  });
  document.getElementById('clear').addEventListener('click', function() {
    editor.setValue('');
  });

  // Put the selected historical snippet in the editor.
  document.getElementById('snippets').addEventListener('change', function(event) {
    if (event.target.classList.contains('snippet-history') && event.target.value) {
      editor.setValue(SnippetHistory.get(parseInt(event.target.value, 10)));
      this.innerHTML = SnippetHistory.render();
    }
  });
  document.getElementById('snippets').innerHTML = SnippetHistory.render();

  // Expand/collapse truncated log messages.
  document.getElementById('log-inner').addEventListener('click', function(event) {
    if (event.target.classList.contains('log-item')) {
      event.target.classList.toggle('removeWrap');
    }
  });
});

}).call(this);
