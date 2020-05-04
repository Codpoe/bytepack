import Config from 'webpack-chain';
import Plugin from './plugin';
import { isProd } from '../utils';

export default class ProdPlugin extends Plugin {
  webpack(config: Config) {
    config.when(isProd(), (config) => {
      config.mode('production');
    });
  }
}
