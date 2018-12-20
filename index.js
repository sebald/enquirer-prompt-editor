const { Prompt } = require('enquirer');
const { editAsync } = require('external-editor');

class Editor extends Prompt {
  constructor(options) {
    super(options);
  }

  async hint() {
    const message = this.state.cancelled
      ? 'Cancelled...'
      : this.state.submitted
      ? 'Received!'
      : 'Waiting for editor...';
    return this.styles.muted(message);
  }

  async render() {
    const size = this.state.size;

    const prefix = await this.prefix();
    const separator = await this.separator();
    const message = await this.message();

    const header = await this.header();
    const output = (await this.error()) || (await this.hint());
    const footer = await this.footer();

    let prompt = [prefix, message, separator].filter(Boolean).join(' ');
    prompt += ' ' + output;
    this.state.prompt = prompt;

    this.clear(size);
    this.write([header, prompt, footer].filter(Boolean).join('\n'));
    this.restore();

    if (this.state.submitted) {
      return;
    }

    editAsync(this.value, async (err, text) => {
      if (err) {
        await this.cancel(err);
      } else {
        this.value = text;
        await this.submit();
      }
    });
  }
}

module.exports = Editor;
