/**
 * Sidebar component
 */

import * as React from 'react';
import { classes, style } from 'typestyle';

import ConnectedRoundImg from '../containers/ConnectedRoundImg';
import { Colors, Dimens, Text } from '../utils/constants';
import Icon from './Icon';
import LargeText from './LargeText';
import Tab from './Tab';

const container = style({
  background: Colors.accent,
  boxShadow: Colors.shadow,
  position: 'fixed',
  zIndex: 1000,
  top: 0,
  left: 0,
  height: '100%',
  minWidth: Dimens.sidebarWidth,
  transition: 'all 0.3s ease',
  $nest: {
    '&[data-is-collapsed="true"]': {
      minWidth: Dimens.sidebarCollapsedWidth,
      width: Dimens.sidebarCollapsedWidth,
      maxWidth: Dimens.sidebarCollapsedWidth,
    },
  },
});

const banner = style({
  marginTop: Dimens.sidebarBannerLeadingMargin,
  display: 'flex',
  marginLeft: Dimens.sidebarBannerTextLeadingMargin,
});

const collapsedBanner = style({
  justifyContent: 'center',
  marginLeft: 'initial',
  width: '100%',
});

const bannerText = style({
  color: Colors.textLight,
  fontWeight: 'normal',
});

const tabsContainer = style({
  marginTop: Dimens.sidebarTabsLeadingMargin,
});

interface IProps {
  isCollapsed: boolean;
  toggleSidebar();
}

const Sidebar = ({ isCollapsed, toggleSidebar }: IProps) => (
  <div className={container} data-is-collapsed={isCollapsed} onMouseEnter={toggleSidebar} onMouseLeave={toggleSidebar}>
    <div className={classes(banner, isCollapsed ? collapsedBanner : null)}>
      <LargeText text={isCollapsed ? Text.bannerShortTitle : Text.bannerTitle} className={bannerText} />
    </div>
    <div className={tabsContainer}>
      <Tab icon={<ConnectedRoundImg />} isCollapsed={isCollapsed} route="/profile" title={Text.profilePlaceholder} />
      <Tab icon={<Icon type="place-bets" />} isCollapsed={isCollapsed} route="/place_bets" title={Text.placeBetsTab} />
      <Tab icon={<Icon type="my-bets" />} isCollapsed={isCollapsed} route="/my_bets" title={Text.currentBetsTab} />
      <Tab icon={<Icon type="results" />} isCollapsed={isCollapsed} route="/results" title={Text.resultsTab} />
      <Tab isCollapsed={isCollapsed} route="/about" title={Text.aboutTab} />
    </div>
  </div>
);

export default Sidebar;
