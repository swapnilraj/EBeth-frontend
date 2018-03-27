interface IWebpackModule extends NodeModule {
  hot?: {
    accept: (val?: string, cb?: () => void) => void;
  };
}

interface IReduxDevToolsEnabledWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare module '*.json' {
  const value: any;
  export default value;
}
