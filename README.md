# enquirer-prompt-editor

Prompt for [`enquirer`](https://github.com/enquirer/enquirer) that opens your preferred text editor (`$VISUAL` or `$EDITOR`) and waits for you to save your input during a prompt.

## Install

```
$ yarn add enquirer-prompt-editor
```

## Usage

```js
const Enquirer = require('enquirer');
const enquirer = new Enquirer();

enquirer.register('editor', require('enquirer-prompt-editor'));
enquirer
  .prompt({
    type: 'editor',
    name: 'bio',
    message: 'Please write a short bio of at least 3 lines.',
    extension: 'md',
    validate: text => {
      if (text.split('\n').length < 2) {
        return 'Must be at least 3 lines.';
      }
      return true;
    },
  })
  .then(answers => console.log(answers))
  .catch(err => console.log(err));
```
