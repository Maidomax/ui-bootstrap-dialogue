# ui-bootstrap-dialogue
A confirmation/alert/prompt modal dialog service for ui-bootstrap. Similar to Bootbox, but doesn't depend on bootstrap.js

Installation
------------
Add to your project with `bower install ui-bootstrap-dialogue --save`, or manually.

Usage
-----
Include `ui-bootstrap-dialogue.js` file, add `ui.bootstrap.dialogue` to your app's dependencies. You will now have a `$dialogue` service available in your app. Currently there are four methods available:
- `$dialogue.alert(message, callback)`
- `$dialogue.confirm(message, callback)`
- `$dialogue.prompt(message, callback)`
- `$dialogue.dialog(options)`

which are self-explanatory, but you can check out the [Bootbox](http://bootboxjs.com/) documentation to see the behavior it mimics. More features will be added soon, prompt with a default value is coming next.

Contributing
------------
My idea is to make it work like [Bootbox](http://bootboxjs.com/), but without making it depend on Bootstrap's bootstrap.js, but work with [UI Bootstrap](https://angular-ui.github.io/bootstrap/) instead. Adding resonable universal configurability, documentation and test coverage would be nice. This project is in an early stage, and any help would be welcome.
