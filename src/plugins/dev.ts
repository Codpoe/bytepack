import Config from 'webpack-chain';
import Plugin from './plugin';
import { isProd } from '../utils';

export default class DevPlugin extends Plugin {
  webpack(config: Config) {
    config.when(!isProd(), (config) => {
      config.mode('development').devtool('cheap-module-eval-source-map');
    });
  }
}
