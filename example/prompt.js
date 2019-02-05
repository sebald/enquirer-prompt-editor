const Enquirer = require('enquirer');
const enquirer = new Enquirer();

enquirer.register('editor', require('..'));
enquirer
  .prompt({
    type: 'editor',
    name: 'bio',
    message: 'Please write a short bio of at least 3 lines.',
    extension: 'md',
    initial: '# Well hello there!\n\n',
    validate: text => {
      console.log('VALIDATE', text);
      if (typeof text !== 'string') {
        return true;
      }

      if (text.split('\n').length < 2) {
        return 'Must be at least 3 lines.';
      }
      return true;
    },
  })
  .then(answers => console.log(answers))
  .catch(err => console.log(err));
