/* globals chrome */

var layout = document.querySelector("#layout");
layout.addEventListener("change", function (e) {
	chrome.storage.local.set({
		layout: this.value
	});
});

chrome.storage.local.get({
	layout: "right"
}, function (items) {
	layout.value = items.layout;
});
