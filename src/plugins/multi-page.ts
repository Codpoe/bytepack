import glob from 'glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { ROOT_PATH, IS_PROD } from '../constants';
import { MiliPlugin } from '../types';

export interface MultiPageOptions {
  outputPath?: string;
  publicPath?: string;
}

const multiPagePlugin: MiliPlugin<MultiPageOptions> = (api, options = {}) => {
  const { outputPath, publicPath } = options;
  const entryFiles =
    glob.sync(path.join(ROOT_PATH, './src/pages/*/main.{js,ts,jsx,tsx}')) || [];

  api.webpack((config) => {
    const htmlWebpackPlugin = config.plugin('HtmlWebpackPlugin');

    entryFiles.forEach((file) => {
      const name = (file.match(/\/src\/pages\/(.*)\/main\./) || [])[1];

      config.entry(name).add(file).end();

      htmlWebpackPlugin.use(HtmlWebpackPlugin, [
        {
          template: path.join(ROOT_PATH, `./src/pages/${name}/main.html`),
          filename: `${name}.html`,
          chunks: [name],
          inject: true,
        },
      ]);
    });

    config.output
      .path(outputPath as string)
      .publicPath(publicPath as string)
      .filename(IS_PROD ? 'js/[name]_[contenthash].js' : 'js/[name].js') // 生成环境，使用 contenthash 进行缓存)
      .chunkFilename(IS_PROD ? 'js/[id]_[contenthash].js' : 'js/[id].js');
  });
};

export default multiPagePlugin;
