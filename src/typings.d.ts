interface IWebpackModule extends NodeModule {
  hot?: {
    accept: (val?: string, cb?: () => void) => void;
  };
}

interface IReduxDevToolsEnabledWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}
