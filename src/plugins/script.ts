import Config from 'webpack-chain';
import Plugin from './plugin';

export interface ScriptOptions {
  cacheDirectory?: boolean;
  typescript?: boolean;
  react?: boolean;
}

export default class ScriptPlugin extends Plugin<ScriptOptions> {
  webpack(config: Config) {
    const { cacheDirectory = true, typescript = true, react = false } =
      this.options || {};

    const rule = config.module
      .rule('script')
      .test(/\.(js|ts|jsx|tsx)$/)
      .exclude.add(/node_modules/)
      .end();

    rule
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        cacheDirectory,
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              loose: true,
              useBuiltIns: 'usage',
              corejs: 3,
            },
          ],
          ...(typescript ? ['@babel/preset-typescript'] : []),
          ...(react ? ['@babel/preset-react'] : []),
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              useESModules: true,
            },
          ],
        ],
      });
  }
}
