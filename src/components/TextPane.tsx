/**
 * TextPane component
 */

import { fillParent } from 'csstips';
import * as React from 'react';
import { style } from 'typestyle';

import { Colors, Dimens } from '../utils/constants';

const textPane = style(
  {
    background: Colors.white,
    paddingLeft: Dimens.textPaneHorizontalPadding,
    paddingRight: Dimens.textPaneHorizontalPadding,
    paddingTop: Dimens.textPaneTopPadding,
    paddingBottom: Dimens.textPaneBottomPadding,
    marginBottom: Dimens.textPaneBottomMargin,
  },
  fillParent,
);

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const TextPane = ({ children }: IProps) => <div className={textPane}>{children}</div>;

export default TextPane;
