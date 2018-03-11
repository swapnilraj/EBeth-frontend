/**
 * MiniTextPane component
 */

import { fillParent } from 'csstips';
import * as React from 'react';
import { style } from 'typestyle';

import { Colors, Dimens } from '../utils/constants';

const miniTextPane = style(
  {
    background: Colors.white,
    paddingLeft: Dimens.miniTextPaneHorizontalPadding,
    paddingRight: Dimens.miniTextPaneHorizontalPadding,
    paddingTop: Dimens.miniTextPaneTopPadding,
    paddingBottom: Dimens.miniTextPaneBottomPadding,
  },
  fillParent,
);

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const MiniTextPane = ({ children }: IProps) => <div className={miniTextPane}>{children}</div>;

export default MiniTextPane;
