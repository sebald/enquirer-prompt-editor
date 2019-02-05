import { Prompt } from 'enquirer';

// Copy/paste since enquirer doesn't really have usable typings...
interface BasePromptOptions {
  name: string | (() => string);
  type: string | (() => string);
  message: string | (() => string) | (() => Promise<string>);
  initial?: any;
  required?: boolean;
  format?(value: string): string | Promise<string>;
  result?(value: string): string | Promise<string>;
  skip?: ((state: object) => boolean | Promise<boolean>) | boolean;
  validate?(
    value: string
  ): boolean | Promise<boolean> | string | Promise<string>;
  onSubmit?(
    name: string,
    value: any,
    prompt: Enquirer.Prompt
  ): boolean | Promise<boolean>;
  onCancel?(
    name: string,
    value: any,
    prompt: Enquirer.Prompt
  ): boolean | Promise<boolean>;
  stdin?: NodeJS.ReadStream;
  stdout?: NodeJS.WriteStream;
}

declare const EditorPrompt: Prompt;
export = EditorPrompt;

export interface EditorPromptOptions extends BasePromptOptions {
  extension?: string;
}
