declare namespace ModalCssModule {
  export interface IModalCss {
    closeModalBtn: string;
    modalAnimation: string;
    modalContent: string;
    modalControls: string;
    modalWrapper: string;
  }
}

declare const ModalCssModule: ModalCssModule.IModalCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ModalCssModule.IModalCss;
};

export = ModalCssModule;
