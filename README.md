typist-jquery
=============

Typist is a jQuery plugin that allows you to animate text as if it were being typed onto the screen.

```javascript
$('#terminal').typist({
  height: 300
});

$('#terminal').typist('prompt')
  .wait(1500)
  .typist('type', 'greet')
  .typist('echo', 'Hello, world!')
```

See it in action at http://chartulo.us

This software is licensed under the MIT license.  See the details in the file called LICENSE.

## Options

Pass in options when initializing your 'terminal' by passing in an object with the following properties.

* `height`
Typist sets your div to be fixed height with overflow: hidden, so that text scrolls off the top like a terminal window.  Use `height` to set the desired height (just passes through to CSS). Integer number of pixels.

* `width`
Sets a fixed width for your terminal element. Integer number of pixels.

* `backgroundColor`
Set the color of the terminal element.  Any string that's a valid color in CSS.

* `textColor`
Set the text color.  Any string that's a valid color in CSS.

* `fontFamily`
Set the font family for the text in the terminal.

## API

### `typist(config)`
Initializes the terminal element.

### `typist('prompt')`
Adds a prompt line and starts a cursor blinking.

### `typist('type', text)`
Types text on a prompt line.

### `typist('echo', text)`
Prints out text as if it were the output of a command.  Creates a new line.

### `typist('wait', millis)`
Pauses animation for the specified number of milliseconds.  If on a prompt line, cursor continues to blink.

### `typist('speed', fast_or_slow)`
Sets the speed of typing/echoing for commands that come afterwards

