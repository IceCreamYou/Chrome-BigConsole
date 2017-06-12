/**
 * Allows resizing the console and log panes.
 */
(function() {

var logPane = document.getElementById('log'),
    consolePane = document.getElementById('console-wrapper'),
    container = document.getElementById('container');

// Set the pane widths based on drag position.
document.getElementById('drag-resize-bar').addEventListener('drag', function(event) {
  var layout = container.getAttribute("data-layout");
  switch (layout) {
    case "top":
      if (event.y > 0) {
        let maxHeight = window.innerHeight - this.offsetHeight,
            consolePaneHeight = Math.min(event.y, maxHeight);
        consolePane.style.flexBasis = consolePaneHeight + 'px';
        logPane.style.flexBasis = (maxHeight - consolePaneHeight) + 'px';
      }
      break;
    case "bottom":
      if (event.y > 0) {
        let maxHeight = window.innerHeight - this.offsetHeight,
            logPaneHeight = Math.min(event.y, maxHeight);
        logPane.style.flexBasis = logPaneHeight + 'px';
        consolePane.style.flexBasis = (maxHeight - logPaneHeight) + 'px';
      }
      break;
    case "left":
      if (event.x > 0) {
        let maxWidth = window.innerWidth - this.offsetWidth,
            consolePaneWidth = Math.min(event.x, maxWidth);
        consolePane.style.flexBasis = consolePaneWidth + 'px';
        logPane.style.flexBasis = (maxWidth - consolePaneWidth) + 'px';
      }
      break;
    case "right":
    default:
      if (event.x > 0) {
        let maxWidth = window.innerWidth - this.offsetWidth,
            logPaneWidth = Math.min(event.x, maxWidth);
        logPane.style.flexBasis = logPaneWidth + 'px';
        consolePane.style.flexBasis = (maxWidth - logPaneWidth) + 'px';
      }
      break;
  }
});

}).call(this);
