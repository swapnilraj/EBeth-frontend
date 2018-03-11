/**
 * Sidebar component
 */

import * as React from 'react';
import { classes, style } from 'typestyle';

import { Colors, Dimens, Text } from '../utils/constants';
import Icon from './Icon';
import LargeText from './LargeText';
import Tab from './Tab';

const container = style({
  background: Colors.accent,
  boxShadow: Colors.shadow,
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
}

const Sidebar = ({ isCollapsed }: IProps) => (
  <div className={container} data-is-collapsed={isCollapsed}>
    <div className={classes(banner, isCollapsed ? collapsedBanner : null)}>
      <LargeText text={isCollapsed ? Text.bannerShortTitle : Text.bannerTitle} className={bannerText} />
    </div>
    <div className={tabsContainer}>
      <Tab
        icon={<Icon type="my-bets" />}
        isCollapsed={isCollapsed}
        route="/profile"
        isActive={false}
        title={Text.profilePlaceholder}
      />
      <Tab
        icon={<Icon type="place-bets" />}
        isCollapsed={isCollapsed}
        route="/place_bets"
        isActive={true}
        title={Text.placeBetsTab}
      />
      <Tab
        icon={<Icon type="my-bets" />}
        isCollapsed={isCollapsed}
        route="/my_bets"
        isActive={false}
        title={Text.currentBetsTab}
      />
      <Tab
        icon={<Icon type="results" />}
        isCollapsed={isCollapsed}
        route="/results"
        isActive={false}
        title={Text.resultsTab}
      />
      <Tab isCollapsed={isCollapsed} route="/about" isActive={false} title={Text.aboutTab} />
    </div>
  </div>
);

export default Sidebar;
