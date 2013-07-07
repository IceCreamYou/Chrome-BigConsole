Adds a panel to the Chrome Developer Tools that provides a multi-line console, like in Firebug.

## Why?

Because when you're running a lot of code in the console, you don't want to hit `shift+enter` to get a newline,
or `up` to restore your history -- you just want a normal textarea that persists between running the code.
Also, you can do fun things with the console when it is multi-line, like add syntax highlighting.
That's what BigConsole is for.

## Implementation

BigConsole is currently implemented as a new panel in the Chrome developer tools.
It would be better if it could override the default Console tab but I have not yet figured out a way to do that
(if it's even possible).
Also, there is a new experimental API that allows reading from and writing to the console from an extension,
so maybe once that gets more stable that will be a better way to do it.
In the mean time we unfortunately have to fake a lot of things.

## Status

BigConsole currently doesn't work because there's a problem with evaluating the inputted code in the page's context.

Also, there are a number of improvements that should be made:

- `console.log` and friends should go to the BigConsole if executed from there
- Adding syntax highlighting (probably with something like AceEditor) would be nice
- Adding executed command history would also be nice
- Output into the log should get prettified better (can probably include another library that could do this better)
