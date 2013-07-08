chrome.runtime.onConnect.addListener(function (port) {
  // Listen for message from the panel and pass it on to the content
  port.onMessage.addListener(function (message) {
    console.log('Received message from panel (background.js): ' + message);
    // Request a tab for sending needed information
    chrome.tabs.query({'active': true,'currentWindow': true}, function (tabs) {
      // Send message to content script
      if (tabs && tabs[0]) {
        console.log('Sending message to content script on tab ' + tabs[0].id + ' (background.js)');
        chrome.tabs.sendMessage(tabs[0].id, message);
      }
    });
  });
  // Post back to Devtools from content
  chrome.runtime.onMessage.addListener(function (message, sender) {
    console.log('Received message from content; sending pack to panel (background.js): ' + message);
    port.postMessage(message);
  });
});
