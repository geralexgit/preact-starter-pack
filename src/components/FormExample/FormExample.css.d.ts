declare namespace FormExampleCssModule {
  export interface IFormExampleCss {
    formWrapper: string;
  }
}

declare const FormExampleCssModule: FormExampleCssModule.IFormExampleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FormExampleCssModule.IFormExampleCss;
};

export = FormExampleCssModule;
