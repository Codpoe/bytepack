import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import WebpackChain from 'webpack-chain';
import { MiliConfig, MiliApi } from './types';
import { logPkgInfo, defaults } from './utils';
import { DEFAULT_CONFIG } from './constants';

function parsePresets(presets: MiliConfig['presets']) {
  const plugins: MiliConfig['plugins'] = [];

  presets?.forEach((preset) => {
    const content = Array.isArray(preset) ? preset[0](preset[1]) : preset();

    if (content.presets) {
      plugins.push(...parsePresets(content.presets));
    }

    if (content.plugins) {
      plugins.push(...content.plugins);
    }
  });

  return plugins;
}

function createApi(params: { webpackChain: WebpackChain }): MiliApi {
  const { webpackChain } = params;

  return {
    webpack: (fn) => {
      fn(webpackChain);
    },
  };
}

function mountPlugin(api: MiliApi, miliConfig: MiliConfig) {
  return (...plugins: NonNullable<MiliConfig['plugins']>) => {
    plugins?.forEach((plugin) => {
      let fn;
      let options;

      if (Array.isArray(plugin)) {
        [fn, options] = plugin;
      } else {
        fn = plugin;
      }

      fn(api, options, miliConfig);
    });
  };
}

export default (miliConfig: MiliConfig = {}) => {
  logPkgInfo();

  const { presets = [], plugins = [], devServer } = defaults(
    DEFAULT_CONFIG,
    miliConfig
  );
  const allPlugins = parsePresets(presets).concat(plugins);
  const webpackChain = new WebpackChain();
  const api = createApi({ webpackChain });

  mountPlugin(api, miliConfig)(...allPlugins);

  const webpackConfig = webpackChain.toConfig();
  const compiler = webpack(webpackConfig);

  compiler.watch({}, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(err || stats.toString());
    }
  });

  const server = new webpackDevServer(compiler, {
    contentBase: webpackConfig.output?.path || 'dist',
    quiet: true,
    ...devServer,
  });

  server.listen(8080);
};
