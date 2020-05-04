import webpack from 'webpack';
import fastGlob from 'fast-glob';
import Config from 'webpack-chain';
import Plugin from './plugin';

export interface EntryOptions extends webpack.Entry {}

export default class EntryPlugin extends Plugin<EntryOptions> {
  webpack(config: Config) {
    const entry = this.options || { index: 'src/index.{js,ts,jsx,tsx}' };

    Object.keys(entry).forEach((name) => {
      const entryConfig = config.entry(name);
      fastGlob.sync(entry[name]).forEach((entryFile) => {
        entryConfig.add(entryFile);
      });
    });
  }
}
