import { IS_PROD } from '../constants';
import { Plugin } from '../types';

const prodPlugin: Plugin = (api) => {
  api.webpack((config) => {
    config.when(IS_PROD, (config) => {
      config.mode('production');
    });
  });
};

export default prodPlugin;
