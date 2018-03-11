/**
 * Sidebar component
 */

import * as React from 'react';
import { style } from 'typestyle';

import { Colors, Dimens } from '../utils/constants';
import LargeText from './LargeText';

const container = style({
  background: Colors.accent,
  boxShadow: Colors.shadow,
  width: Dimens.sidebarCollapsedWidth,
});

const banner = style({
  width: '100%',
  marginTop: 64,
  display: 'flex',
  justifyContent: 'center',
});

const bannerText = style({
  color: Colors.textLight,
  fontWeight: 'normal',
});

const Sidebar = () => (
  <div className={container}>
    <div className={banner}>
      <LargeText text="E" className={bannerText} />
    </div>
  </div>
);

export default Sidebar;
