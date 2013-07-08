Adds a panel to the Chrome Developer Tools that provides a multi-line split
console, like in Firebug, with syntax highlighting.

![Screenshot](https://raw.github.com/IceCreamYou/Chrome-BigConsole/master/screenshot.png)

## Why?

I like the split console in Firebug, and I don't like that Chrome doesn't work
exactly the same way, so I fixed it. Also, I learned how to write a Chrome
extension.

Chrome does have a built-in multiline split console called
[Snippets](https://developers.google.com/chrome-developer-tools/docs/authoring-development-workflow#snippets).
BigConsole is different in that it doesn't try to be an IDE, it just tries to
be a multiline REPL. Specifically it has a vertical split layout, no saving
blocks of code in files, there's a "Clear" button, and it has some nice editor
things that come for free with Ace Editor.

But mainly this is me wanting to control my environment in a generic way.

Using [FirebugLite](https://getfirebug.com/firebuglite) is a possible
alternative, but it has to append itself to the DOM which results in a number
of limitations. This results in a lot of switching back and forth with devtools.
BigConsole is easier, plus it has syntax highlighting.

## Implementation

BigConsole is currently implemented as a new panel in the Chrome developer
tools. It would be better if it could override the default Console tab but
Chrome does not currently expose the APIs to do that.

There are some limits to the way code is currently being evaluated. Most
importantly, the result of evaluation is converted to JSON and back before this
extension receives it, which means only acyclic objects can be inspected and
object types are not preserved. I have an idea for how to get around this but
it is pretty complicated and maybe not worth the effort.

**Note:** You can click on truncated console output to expand and collapse it.

## Status

BigConsole currently does most of what it was designed to do. That is, it
provides a multiline console and log which evaluates JavaScript in the page
context just like the default devtools console. However, there are a bunch of
features / fixes that would make it much better:

- Allow printing cyclic objects to the console
- Add executed command history
- Output into the log should get pretty-printed better and ideally it should be
  possible to inspect returned objects. (This will probably be done by including
  another library...)
- `console.log` currently only works as expected when it is called
  synchronously. If `console.log` is called asynchronously after the code
  finishes evaluating then it will actually try to record to the default
  Console panel because the `console` object is swapped out only temporarily
  while BigConsole scripts run.
- No `console` commands other than `console.log` are supported yet.
- It would be nice if commands that went to the default Console panel also went
  to the BigConsole, and vice versa. There are some experimental APIs that will
  make this possible, so once those hit the stable branch this could be
  worth investigating.
- The extension needs an icon for the extensions page!

## Installation

1. Clone the code
2. Go to `chrome://extensions`
3. Check the "Developer mode" checkbox at the top of the page
4. Click the "Load unpacked extension..." button which will appear at the top
   of the page
5. Navigate to the folder with the extension code in it and click "OK"

Then go to any page you want to inspect, open the devtools (CTRL+SHIFT+I), and
switch to the BigConsole tab.

To upgrade, just update the code (e.g. with `git pull`), then go to
`chrome://extensions` and click the "Reload (CTRL+R)" link under the extension.
If you have the devtools open, you'll have to close and reopen it before the
upgraded version will be loaded.

## Credits

[Isaac Sukin](http://www.isaacsukin.com/contact)
([@IceCreamYou](https://twitter.com/IceCreamYou)) is the author of this project.

Contributions are very much welcome!

The code is released under the [MIT License](http://opensource.org/licenses/MIT)
except the ace editor code, which is released under the BSD license as described
at the top of the relevant files.
