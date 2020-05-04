import Plugin from './plugins/plugin';

export type Preset<T> = (options?: T) => Config;

export interface Config {
  presets?: (Preset<any> | [Preset<any>, Parameters<Preset<any>>])[];
  plugins?: Plugin<any>[];
  devServer?: {
    host?: string;
    port?: number;
    hot?: boolean;
  };
  watch?: {};
}

export type LogType = 'info' | 'success' | 'warning' | 'error';

export type LogFn = (prefix?: string, text?: string) => void;

export interface Logger {
  info: LogFn;
  success: LogFn;
  warning: LogFn;
  error: LogFn;
}
