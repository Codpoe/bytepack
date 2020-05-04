import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Config from 'webpack-chain';
import Plugin from './plugin';
import { isProd } from '../utils';

export default class StylePlugin extends Plugin {
  webpack(config: Config) {
    const rule = config.module
      .rule('style')
      .test(/\.(css|less)$/)
      .exclude.add(/node_modules/)
      .end();

    rule
      .use('MiniCssExtractPlugin.loader')
      .loader(MiniCssExtractPlugin.loader)
      .options({
        hmr: !isProd(), // 非生成环境，启用热替换
      });

    rule.use('css-loader').loader('css-loader').options({
      importLoaders: 2,
    });

    rule
      .use('postcss-loader')
      .loader('postcss-loader')
      .options({
        plugins: [autoprefixer()],
      });

    rule.use('less-loader').loader('less-loader');

    config.plugin('MiniCssExtractPlugin').use(MiniCssExtractPlugin, [
      {
        filename: isProd() ? 'css/[name]_[contenthash].css' : 'css/[name].css', // 生成环境，使用 contenthash 进行缓存
        chunkFilename: isProd() ? 'css/[id]_[contenthash].css' : 'css/[id].css',
      },
    ]);
  }
}
