declare namespace LayoutCssModule {
  export interface ILayoutCss {
    aside: string;
    layout: string;
    main: string;
  }
}

declare const LayoutCssModule: LayoutCssModule.ILayoutCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LayoutCssModule.ILayoutCss;
};

export = LayoutCssModule;
