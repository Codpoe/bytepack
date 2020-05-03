import WebpackChain from 'webpack-chain';

export interface Api {
  webpack(fn: (config: WebpackChain) => void): void;
}

export interface Plugin<T = any> {
  (api: Api, options?: T, config?: Config): void;
}

export interface Preset<T = any> {
  (options?: T): Config;
}

export interface Config {
  presets?: (Preset | [Preset, any])[];
  plugins?: (Plugin | [Plugin, any])[];
  devServer?: {
    host?: string;
    port?: number;
    hot?: boolean;
  };
}

export type LogType = 'info' | 'success' | 'warning' | 'error';

export type LogFn = (prefix?: string, text?: string) => void;

export interface Logger {
  info: LogFn;
  success: LogFn;
  warning: LogFn;
  error: LogFn;
}
