import FriendlyPlugin from '../plugins/friendly';
import DevPlugin from '../plugins/dev';
import ProdPlugin from '../plugins/prod';
import ScriptPlugin, { ScriptOptions } from '../plugins/script';
import EntryPlugin, { EntryOptions } from '../plugins/entry';
import { Preset } from '../types';

export interface LibOptions {
  entryOptions?: EntryOptions;
  scriptOptions?: ScriptOptions;
}

const libPreset: Preset<LibOptions> = (options = {}) => {
  const { entryOptions, scriptOptions } = options;
  return {
    plugins: [
      new EntryPlugin(entryOptions),
      new ScriptPlugin(scriptOptions),
      new FriendlyPlugin(),
      new DevPlugin(),
      new ProdPlugin(),
    ],
  };
};

export default libPreset;
