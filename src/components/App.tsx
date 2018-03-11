/**
 * App component
 */

import { fillParent } from 'csstips';
import * as React from 'react';
import { classes, style } from 'typestyle';

import { normalizeEl } from '../utils/styles';

import ConnectedSidebar from '../containers/ConnectedSidebar';
import Main from './Main';

const mainContainer = style(
  {
    display: 'flex',
  },
  fillParent,
);

const App = () => (
  <div className={classes(normalizeEl, mainContainer)}>
    <ConnectedSidebar />
    <Main />
  </div>
);

export default App;
