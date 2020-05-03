import friendlyPlugin from '../plugins/friendly';
import devPlugin from '../plugins/dev';
import prodPlugin from '../plugins/prod';
import scriptPlugin, { ScriptOptions } from '../plugins/script';
import stylePlugin from '../plugins/style';
import multiPagePlugin, { MultiPageOptions } from '../plugins/multi-page';
import { MiliPreset } from '../types';

export interface MPAOptions {
  multiPageOptions?: MultiPageOptions;
  scriptOptions?: ScriptOptions;
}

const MPAPreset: MiliPreset<MPAOptions> = (options = {}) => {
  const { multiPageOptions, scriptOptions } = options;
  return {
    plugins: [
      [multiPagePlugin, multiPageOptions],
      [scriptPlugin, scriptOptions],
      stylePlugin,
      friendlyPlugin,
      devPlugin,
      prodPlugin,
    ],
  };
};

export default MPAPreset;
