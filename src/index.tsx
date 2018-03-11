/**
 * Root app file
 */

import 'babel-polyfill';

import * as React from 'react';

import { render } from 'react-dom';

import { Provider } from 'react-redux';

import { forceRenderStyles } from 'typestyle';

// Patch Rx operators
import './utils/patch-operators';

import { fixGlobalStyles } from './utils/styles';

import ConnectedApp from './containers/ConnectedApp';

import configureStore from './stores';

interface IAppProps {
  version: string;
}

const boot = async () => {
  const store = configureStore();
  const appVersion = process.env.APP_VERSION as string;

  fixGlobalStyles();

  const App = ({ version }: IAppProps) => (
    <Provider store={store}>
      <ConnectedApp version={version} />
    </Provider>
  );

  const mount = document.getElementById('root')!;
  render(<App version={appVersion} />, mount);
  forceRenderStyles();
};

if ((module as IWebpackModule).hot) {
  (module as IWebpackModule).hot!.accept();
}

boot();
