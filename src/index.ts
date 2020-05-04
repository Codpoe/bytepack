import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import WebpackChain from 'webpack-chain';
import { Config } from './types';
import { logPkgInfo, parseConfig, setNodeEnv } from './utils';

export default class Bytepack {
  originConfig: Config;
  config: Config;

  constructor(config: Config = {}) {
    this.originConfig = config;
    this.config = parseConfig(config);

    logPkgInfo();
  }

  getWebpackConfig() {
    const webpackChain = new WebpackChain();

    this.config.plugins?.forEach((plugin) => {
      plugin.webpack(webpackChain);
    });

    return webpackChain.toConfig();
  }

  dev() {
    setNodeEnv('development');

    const compiler = webpack(this.getWebpackConfig());

    compiler.watch(this.config.watch as any, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(err || stats.toString());
      }
    });
  }

  devServer() {
    setNodeEnv('development');

    const webpackConfig = this.getWebpackConfig();
    const comiler = webpack(webpackConfig);
    const server = new webpackDevServer(comiler, {
      contentBase: webpackConfig.output?.path || 'dist',
      quiet: true,
      ...this.config.devServer,
    });

    server.listen(this.config.devServer?.port || 8080);
  }

  build() {
    setNodeEnv('production');

    const compiler = webpack(this.getWebpackConfig());

    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(err || stats.toString());
      }
    });
  }
}
