var logPane = document.getElementById('log');
var consolePane = document.getElementById('console-wrapper');
var resizeBtn = document.getElementById('btn-resize');

resizeBtn.addEventListener('drag', handleDrag);

window.onresize = function(){
  // updateLayout(resizeBtn.offsetLeft);
  logPane.style.width = '';
  consolePane.style.width = '';
}

function handleDrag(ev) {
  var offsetX = ev.x;
  updateLayout(offsetX);
}

function updateLayout(offset) {
  if (offset) {
    logPane.style.width = offset + 'px';
    consolePane.style.width = (window.innerWidth - offset - resizeBtn.offsetWidth) + 'px';
  }
}