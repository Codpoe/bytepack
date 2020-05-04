import fs from 'fs-extra';
import boxen, { BorderStyle } from 'boxen';
import chalk, { BackgroundColor, Color } from 'chalk';
import { PKG_PATH, DEFAULT_CONFIG } from './constants';
import { Logger, LogType, Config } from './types';

interface Cache {
  pkg?: Record<string, any>;
  config?: Omit<Config, 'presets'>;
}

const cache: Cache = {};

const logColors: Record<LogType, typeof Color> = {
  info: 'blue',
  success: 'green',
  warning: 'yellow',
  error: 'red',
};

export function getPkg(): Record<string, any>;
export function getPkg(key: string): any;
export function getPkg(key?: string): any {
  if (!cache.pkg) {
    cache.pkg = fs.readJsonSync(PKG_PATH);
  }
  return key ? (cache.pkg as Record<string, any>)[key] : cache.pkg;
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

export function parsePresets(presets: Config['presets']) {
  const plugins: Config['plugins'] = [];

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

export function parseConfig(config: Config) {
  if (!cache.config) {
    const { presets = [], plugins = [], ...rest } = defaults(
      DEFAULT_CONFIG,
      config
    );

    cache.config = {
      plugins: parsePresets(presets).concat(plugins),
      ...rest,
    };
  }

  return cache.config;
}

export function setNodeEnv(nodeEnv: 'development' | 'production') {
  process.env.NODE_ENV = nodeEnv;
}

export function isProd() {
  return process.env.NODE_ENV === 'production';
}
