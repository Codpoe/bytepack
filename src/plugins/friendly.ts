import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import Config from 'webpack-chain';
import Plugin from './plugin';
import { logger, isProd } from '../utils';

const completeChar = '\u2588';
const incompleteChar = '\u2591';

const progressPluginHandler = (percent: number, msg: string) => {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);

  percent = Math.floor(percent * 100);

  let bar = '';

  for (let i = 0; i <= 100; i += 10) {
    if (i <= percent) {
      bar += completeChar;
    } else {
      bar += incompleteChar;
    }
  }

  logger.info('PROGRESS', `${bar} ${percent}% ${msg}`);
  process.stdout.cursorTo(10000);
};

export default class FriendlyPlugin extends Plugin {
  webpack(config: Config) {
    config
      .plugin('progress')
      .use(webpack.ProgressPlugin, [progressPluginHandler])
      .end()
      .plugin('friendly-errors')
      .use(FriendlyErrorsWebpackPlugin)
      .end()
      .when(isProd(), (config) =>
        config.plugin('clean').use(CleanWebpackPlugin).end()
      );
  }
}
