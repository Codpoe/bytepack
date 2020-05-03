import { Plugin } from '../types';
import { IS_PROD } from '../constants';

const devPlugin: Plugin = (api) => {
  api.webpack((config) => {
    config.when(!IS_PROD, (config) => {
      config.mode('development').devtool('cheap-module-eval-source-map');
    });
  });
};

export default devPlugin;
