/* globals chrome */
(function () {

var layout = document.getElementById("layout");
var theme = document.getElementById("theme");
var snippets = document.getElementById("snippets");
var autocomplete = document.getElementById("autocomplete");

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
snippets.addEventListener("change", function (e) {
  chrome.storage.local.set({
    snippets: this.checked
  });
});
autocomplete.addEventListener("change", function (e) {
  chrome.storage.local.set({
    autocomplete: this.checked
  });
});

chrome.storage.local.get({
  layout: "right",
  theme: "ace/theme/monokai",
  snippets: false,
  autocomplete: true
}, function (items) {
  layout.value = items.layout;
  theme.value = items.theme;
  snippets.checked = items.snippets;
  autocomplete.checked = items.autocomplete;
});

}).call(this);
