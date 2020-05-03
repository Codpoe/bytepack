import path from 'path';
import { Config } from './types';

export const ROOT_PATH = process.cwd();
export const PKG_PATH = path.join(__dirname, '../package.json');
export const IS_PROD = process.env.NODE_ENV === 'production';

export const DEFAULT_CONFIG: Config = {
  presets: [],
  plugins: [],
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
  },
};
