import fs from 'fs-extra';
import boxen, { BorderStyle } from 'boxen';
import chalk, { BackgroundColor, Color } from 'chalk';
import { PKG_PATH } from './constants';
import { Logger, LogType } from './types';

let pkg: Record<string, any>;

const logColors: Record<LogType, typeof Color> = {
  info: 'blue',
  success: 'green',
  warning: 'yellow',
  error: 'red',
};

export function getPkg(): Record<string, any>;
export function getPkg(key: string): any;
export function getPkg(key?: string): any {
  if (!pkg) {
    pkg = fs.readJsonSync(PKG_PATH);
  }
  return key ? pkg[key] : pkg;
}

export function logPkgInfo() {
  console.log(
    boxen(`${getPkg('name')} ${getPkg('version')}`, {
      padding: 1,
      borderStyle: BorderStyle.Round,
    })
  );
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function log(type: LogType, prefix = '', text = '') {
  const color = logColors[type];
  const bgColor = `bg${capitalizeFirstLetter(color)}` as typeof BackgroundColor;
  prefix = chalk[bgColor].black('', prefix.toUpperCase(), '');
  text = chalk[color](text);

  process.stdout.write(`${prefix} ${text}`);
}

export const logger: Logger = ([
  'info',
  'success',
  'warning',
  'error',
] as LogType[]).reduce((res, type) => {
  res[type] = (prefix = '', text = '') => log(type, prefix, text);
  return res;
}, {} as Logger);

export function defaults<T extends any>(defaultOptions: T, options: T): T {
  if (Array.isArray(defaultOptions)) {
    return [...(defaultOptions as any), ...((options as any) || [])] as any;
  }

  if (typeof defaultOptions === 'object') {
    if (typeof options === 'undefined') {
      return { ...defaultOptions };
    }

    const res = { ...options };

    Object.keys(defaultOptions).forEach((key) => {
      res[key] = defaults(defaultOptions[key], options[key]);
    });

    return res;
  }

  if (typeof options === 'undefined') {
    return defaultOptions;
  }

  return options;
}
