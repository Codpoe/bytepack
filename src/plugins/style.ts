import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { IS_PROD } from '../constants';
import { MiliPlugin } from '../types';

const stylePlugin: MiliPlugin = (api) => {
  api.webpack((config) => {
    const rule = config.module
      .rule('style')
      .test(/\.(css|less)$/)
      .exclude.add(/node_modules/)
      .end();

    rule
      .use('MiniCssExtractPlugin.loader')
      .loader(MiniCssExtractPlugin.loader)
      .options({
        hmr: !IS_PROD, // 非生成环境，启用热替换
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
        filename: IS_PROD ? 'css/[name]_[contenthash].css' : 'css/[name].css', // 生成环境，使用 contenthash 进行缓存
        chunkFilename: IS_PROD ? 'css/[id]_[contenthash].css' : 'css/[id].css',
      },
    ]);
  });
};

export default stylePlugin;
