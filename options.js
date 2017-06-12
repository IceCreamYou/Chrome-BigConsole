/* globals chrome */
(function () {

var layout = document.querySelector("#layout");
var theme = document.querySelector("#theme");

layout.addEventListener("change", function (e) {
	chrome.storage.local.set({
		layout: this.value
	});
});
theme.addEventListener("change", function (e) {
	chrome.storage.local.set({
		theme: this.value
	});
});

chrome.storage.local.get({
	layout: "right",
	theme: "ace/theme/monokai"
}, function (items) {
	layout.value = items.layout;
	theme.value = items.theme;
});

}).call(this);
