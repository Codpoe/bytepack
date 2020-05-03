import Config from 'webpack-chain';

export interface MiliApi {
  webpack(fn: (config: Config) => void): void;
}

export interface MiliPlugin<T = any> {
  (api: MiliApi, options?: T, miliConfig?: MiliConfig): void;
}

export interface MiliPreset<T = any> {
  (options?: T): MiliConfig;
}

export interface MiliConfig {
  presets?: (MiliPreset | [MiliPreset, any])[];
  plugins?: (MiliPlugin | [MiliPlugin, any])[];
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
