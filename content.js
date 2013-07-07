function executeScriptInPageContext(script) {
  var s = document.createElement("script");
  s.textContent = '(function() { var x = (function() { ' + script + ' })(); console.log("Executed method in context (content.js) with result: " + x); window.postMessage({type: "BigConsole", result: x }, "*"); })();';
  document.body.appendChild(s);
  document.body.removeChild(s);
}
// Send the result of the eval back to devtools via the background page
window.addEventListener('message', function(e) {
  if (e.source != window) return;
  if (e.data.type && e.data.type == 'BigConsole') {
    // Send to background page
    console.log('Received message from DOM; sending message to background page (content.js): ' + e.data.result);
    chrome.runtime.sendMessage(e.data.result);
  }
});
// Listen for the content to eval from the panel via the background page
chrome.runtime.onMessage.addListener(function (message, sender) {
  console.log('Received message from background; sending it to DOM context (content.js): ' + message);
  executeScriptInPageContext(message);
});
