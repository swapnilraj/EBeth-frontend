/**
 * Main component
 */

import { fillParent } from 'csstips';
import * as React from 'react';
import { style } from 'typestyle';

const container = style(
  {
    background: 'red',
  },
  fillParent,
);

const Main = () => <div className={container} />;

export default Main;
