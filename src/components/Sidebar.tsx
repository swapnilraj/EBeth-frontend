/**
 * Sidebar component
 */

import * as React from 'react';
import { style } from 'typestyle';

const container = style({
  background: 'blue',
  width: 100,
});

const Sidebar = () => <div className={container} />;

export default Sidebar;
