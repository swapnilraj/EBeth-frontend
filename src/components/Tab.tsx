/**
 * Tab component
 */

import * as React from 'react';
import { style } from 'typestyle';

import { Colors } from '../utils/constants';
import MediumText from './MediumText';

const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  $nest: {
    '&[data-is-active="true"]': {
      background: Colors.activeTab,
      borderLeftStyle: 'solid',
      borderLeftColor: Colors.primary,
    },
  },
});

const iconContainer = style({
  padding: 12,
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
    {icon ? <div className={iconContainer}>{icon}</div> : null}
    {isCollapsed ? null : <MediumText className={titleStyle} text={title} />}
  </div>
);

export default Tab;
