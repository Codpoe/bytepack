import Config from 'webpack-chain';

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
export default class Plugin<Options extends any = undefined> {
  constructor(public options?: Options) {}

  init() {}

  webpack(config: Config) {}

  lint() {}

  test() {}
}
