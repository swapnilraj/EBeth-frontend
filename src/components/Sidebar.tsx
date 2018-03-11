/**
 * Sidebar component
 */

import * as React from 'react';
import { style } from 'typestyle';

import { Colors } from '../utils/constants';

const container = style({
  background: Colors.accent,
  width: 100,
});

const Sidebar = () => <div className={container} />;

export default Sidebar;
