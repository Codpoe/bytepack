import friendlyPlugin from '../plugins/friendly';
import devPlugin from '../plugins/dev';
import prodPlugin from '../plugins/prod';
import scriptPlugin, { ScriptOptions } from '../plugins/script';
import stylePlugin from '../plugins/style';
import multiPagePlugin, { MultiPageOptions } from '../plugins/multi-page';
import { Preset } from '../types';

export interface MpaOptions {
  multiPageOptions?: MultiPageOptions;
  scriptOptions?: ScriptOptions;
}

const mpaPreset: Preset<MpaOptions> = (options = {}) => {
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

export default mpaPreset;
