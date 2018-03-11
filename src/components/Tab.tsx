/**
 * Tab component
 */

import * as React from 'react';
import { NavLink } from 'react-router-dom';
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
    '&.is-active': {
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
  textDecoration: 'none',
});

interface IProps {
  icon?: JSX.Element;
  title: string;
  route: string;
  isCollapsed: boolean;
}

const Tab = ({ icon, title, route, isCollapsed }: IProps) => (
  <NavLink className={container} to={route} activeClassName="is-active">
    {icon ? (
      <div data-image-container className={iconContainer}>
        {icon}
      </div>
    ) : null}
    {isCollapsed ? null : <MediumText className={titleStyle} text={title} />}
  </NavLink>
);

export default Tab;
