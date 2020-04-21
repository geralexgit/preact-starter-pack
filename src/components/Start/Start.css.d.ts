declare namespace StartCssModule {
  export interface IStartCss {
    h1: string;
  }
}

declare const StartCssModule: StartCssModule.IStartCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StartCssModule.IStartCss;
};

export = StartCssModule;
