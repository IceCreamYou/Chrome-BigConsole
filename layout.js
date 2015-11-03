/**
 * Allows resizing the console and log panes.
 */
(function() {

var logPane = document.getElementById('log'),
    consolePane = document.getElementById('console-wrapper');

// Set the pane widths based on drag position.
document.getElementById('drag-resize-bar').addEventListener('drag', function(event) {
  if (event.x) {
    var maxWidth = window.innerWidth - this.offsetWidth,
        logPaneWidth = Math.min(Math.max(event.x, 0), maxWidth);
    logPane.style.width = logPaneWidth + 'px';
    consolePane.style.width = (maxWidth - logPaneWidth) + 'px';
  }
});

// If the window is resized, reset the pane proportions.
window.addEventListener('resize', function() {
  logPane.style.width = '';
  consolePane.style.width = '';
});

}).call(this);
