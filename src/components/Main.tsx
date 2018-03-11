/**
 * Main component
 */

import { fillParent } from 'csstips';
import * as React from 'react';
import { style } from 'typestyle';

import About from './About';

const container = style(fillParent);

const Main = () => (
  <div className={container}>
    <About />
  </div>
);

export default Main;
