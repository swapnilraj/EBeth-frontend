/**
 * Main component
 */

import { fillParent } from 'csstips';
import * as React from 'react';
import { style } from 'typestyle';

import { Dimens } from '../utils/constants';
import About from './About';

const container = style(
  {
    marginLeft: Dimens.sidebarCollapsedWidth,
  },
  fillParent,
);

const Main = () => (
  <div className={container}>
    <About />
  </div>
);

export default Main;
