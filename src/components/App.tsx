/**
 * App component
 */

import { fillParent } from 'csstips';
import * as React from 'react';
import { classes, style } from 'typestyle';

import { normalizeEl } from '../utils/styles';

import Main from './Main';
import Sidebar from './Sidebar';

const mainContainer = style(
  {
    display: 'flex',
  },
  fillParent,
);

const App = () => (
  <div className={classes(normalizeEl, mainContainer)}>
    <Sidebar isCollapsed={true} />
    <Main />
  </div>
);

export default App;
