/**
 * Tab component
 */

import * as React from 'react';
import { style } from 'typestyle';

import { Colors, Dimens } from '../utils/constants';
import MediumText from './MediumText';

const container = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  paddingLeft: Dimens.tabLeadingPadding,
  marginBottom: Dimens.tabTrailingMargin,
  $nest: {
    '&[data-is-active="true"]': {
      background: Colors.activeTab,
      borderLeftStyle: 'solid',
      borderLeftColor: Colors.primary,
    },
    '& [data-image-container]': {
      marginRight: Dimens.tabImageTrailingMargin,
    },
    '& [data-image-container]>*': {
      height: Dimens.tabImageSize,
      width: Dimens.tabImageSize,
    },
  },
});

const iconContainer = style({
  paddingTop: Dimens.tabImageVeticalPadding,
  paddingBottom: Dimens.tabImageVeticalPadding,
});

const titleStyle = style({
  color: Colors.textLight,
  marginTop: 20,
  marginBottom: 15,
  marginRight: 35,
});

interface IProps {
  icon?: JSX.Element;
  isActive: boolean;
  title: string;
  route: string;
  isCollapsed: boolean;
}

const Tab = ({ icon, isActive, title, route, isCollapsed }: IProps) => (
  <div className={container} data-route={route} data-is-active={isActive}>
    {icon ? (
      <div data-image-container className={iconContainer}>
        {icon}
      </div>
    ) : null}
    {isCollapsed ? null : <MediumText className={titleStyle} text={title} />}
  </div>
);

export default Tab;
