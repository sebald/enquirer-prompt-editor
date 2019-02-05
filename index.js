const { Prompt } = require('enquirer');
const { edit } = require('edit-briefly');

class Editor extends Prompt {
  constructor(options) {
    super(options);
    this.value = options.initial || '';
    this.cursorHide();
  }

  async keypress(input, event = {}) {
    /**
     * Whitelist only certain key events.
     * This prevents accidental submits, when `return` is pressed.
     */
    if (!['cancel'].includes(event.name)) {
      return;
    }
    await super.keypress(input, event);
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

    /**
     * Call this as a side effect, otherwhise we'll end in a endless loop
     * of submits if validation fails.
     *
     * submit -> invalid -> render -> ...
     */
    this.openEditor();
  }

  async openEditor() {
    if (this.state.submitted) {
      return;
    }

    const text = await edit({
      contents: this.value,
      extension: this.options.extension || '',
    });
    this.value = text;
    await this.submit();
  }
}

module.exports = Editor;
