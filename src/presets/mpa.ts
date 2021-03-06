import FriendlyPlugin from '../plugins/friendly';
import DevPlugin from '../plugins/dev';
import ProdPlugin from '../plugins/prod';
import ScriptPlugin, { ScriptOptions } from '../plugins/script';
import StylePlugin from '../plugins/style';
import MultiPagePlugin, { MultiPageOptions } from '../plugins/multi-page';
import { Preset } from '../types';

export interface MpaOptions {
  multiPageOptions?: MultiPageOptions;
  scriptOptions?: ScriptOptions;
}

const mpaPreset: Preset<MpaOptions | undefined> = (options = {}) => {
  const { multiPageOptions, scriptOptions } = options;
  return {
    plugins: [
      new MultiPagePlugin(multiPageOptions),
      new ScriptPlugin(scriptOptions),
      new StylePlugin(),
      new FriendlyPlugin(),
      new DevPlugin(),
      new ProdPlugin(),
    ],
  };
};

export default mpaPreset;
