Adds a panel to the Chrome Developer Tools that provides a multi-line split
console, like in Firebug.

![Screenshot](https://raw.github.com/IceCreamYou/Chrome-BigConsole/master/screenshot.png)

Includes:

- Vertical split style multiline REPL
- Syntax highlighting and nice editor things thanks to Ace Editor
- Pretty-printed output
- "Run" button or CTRL+Enter to execute code
- "Clear" button to clear REPL
- "History" drop-down to restore previously executed code

## Why?

Chrome has a built-in multiline split console called
[Snippets](https://developers.google.com/chrome-developer-tools/docs/authoring-development-workflow#snippets).
However, I found that I could iterate and try out code faster in Firebug's
console than I could in Snippets. I built BigConsole to be the Chrome
equivalent of Firebug's BigConsole. Where Snippets is more like a light IDE,
BigConsole is simpler and geared towards iterating on code as quickly as
possible in a multiline, syntax-highlighted REPL.

Using [FirebugLite](https://getfirebug.com/firebuglite) is a possible
alternative, but it has a number of limitations.

## Known issues

- The only `console` functions that log to BigConsole are `error`, `info`,
  `log`, and `warn` - and these only do so when called synchronously from
  BigConsole itself. (If they log to BigConsole, they will also log to the
  normal console.) It would be nice if BigConsole showed everything the normal
  console shows and vice versa.
- It would be nice if large objects were printed in a collapsed format and only
  expanded when clicked on.
- The pretty-printing of most objects takes up an unnecessary amount of space.

## Installation

1. Clone the code
2. Go to `chrome://extensions`
3. Check the "Developer mode" checkbox at the top of the page
4. Click the "Load unpacked extension..." button which will appear at the top
   of the page
5. Navigate to the folder with the extension code in it and click "OK"

Then go to any page you want to inspect, open the devtools (CTRL+SHIFT+I), and
switch to the BigConsole tab.

To update, just update the code (e.g. with `git pull`), then go to
`chrome://extensions` and click the "Reload (CTRL+R)" link under the extension.
If you have the devtools open, you'll have to close and reopen it before the
upgraded version will be loaded.

## Credits

[Isaac Sukin](http://www.isaacsukin.com/contact)
([@IceCreamYou](https://twitter.com/IceCreamYou)) is the author of this
project.

Contributions are very much welcome!

As described in the
[license file](https://github.com/IceCreamYou/Chrome-BigConsole/blob/master/LICENSE.md),
the Ace Editor code is included under the BSD 3-Clause License, the PrettyPrint
code is included under a modified BSD 2-Clause License, and the rest of this
project is released under the MIT License.
