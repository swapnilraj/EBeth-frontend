/**
 * Sidebar component
 */

import * as React from 'react';
import { style } from 'typestyle';

import { Colors, Dimens, Text } from '../utils/constants';
import Icon from './Icon';
import LargeText from './LargeText';
import Tab from './Tab';

const container = style({
  background: Colors.accent,
  boxShadow: Colors.shadow,
  width: Dimens.sidebarCollapsedWidth,
});

const banner = style({
  width: '100%',
  marginTop: Dimens.sidebarBannerLeadingMargin,
  display: 'flex',
  justifyContent: 'center',
});

const bannerText = style({
  color: Colors.textLight,
  fontWeight: 'normal',
});

const tabsContainer = style({
  marginTop: Dimens.sidebarTabsLeadingMargin,
});

const Sidebar = () => (
  <div className={container}>
    <div className={banner}>
      <LargeText text={Text.bannerShotTitle} className={bannerText} />
    </div>
    <div className={tabsContainer}>
      <Tab
        icon={<Icon type="my-bets" />}
        collapsed={true}
        route="/profile"
        isActive={false}
        title={Text.profilePlaceholder}
      />
      <Tab
        icon={<Icon type="place-bets" />}
        collapsed={true}
        route="/place_bets"
        isActive={true}
        title={Text.placeBetsTab}
      />
      <Tab
        icon={<Icon type="my-bets" />}
        collapsed={true}
        route="/my_bets"
        isActive={false}
        title={Text.currentBetsTab}
      />
      <Tab icon={<Icon type="results" />} collapsed={true} route="/results" isActive={false} title={Text.resultsTab} />
      <Tab collapsed={true} route="/about" isActive={false} title={Text.aboutTab} />
    </div>
  </div>
);

export default Sidebar;
