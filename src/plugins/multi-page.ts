import fastGlob from 'fast-glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Config from 'webpack-chain';
import Plugin from './plugin';
import { isProd } from '../utils';

export interface MultiPageOptions {
  outputPath?: string;
  publicPath?: string;
}

export default class MultiPagePlugin extends Plugin<MultiPageOptions> {
  webpack(config: Config) {
    const { outputPath, publicPath } = this.options || {};
    const entryFiles =
      fastGlob.sync('./src/pages/*/index.{js,ts,jsx,tsx}') || [];

    const htmlWebpackPlugin = config.plugin('HtmlWebpackPlugin');

    entryFiles.forEach((file) => {
      const name = (file.match(/\/src\/pages\/(.*)\/index\./) || [])[1];

      config.entry(name).add(file).end();

      htmlWebpackPlugin.use(HtmlWebpackPlugin, [
        {
          template: `./src/pages/${name}/index.html`,
          filename: `views/${name}.html`,
          chunks: [name],
          inject: true,
        },
      ]);
    });

    config.output
      .path(outputPath as string)
      .publicPath(publicPath as string)
      .filename(isProd() ? 'js/[name]_[contenthash].js' : 'js/[name].js') // 生成环境，使用 contenthash 进行缓存)
      .chunkFilename(isProd() ? 'js/[id]_[contenthash].js' : 'js/[id].js');
  }
}
