import { IS_PROD } from '../constants';
import { MiliPlugin } from '../types';

const prodPlugin: MiliPlugin = (api) => {
  api.webpack((config) => {
    config.when(IS_PROD, (config) => {
      config.mode('production');
    });
  });
};

export default prodPlugin;
