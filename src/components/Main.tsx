/**
 * Main component
 */

import { fillParent } from 'csstips';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { style } from 'typestyle';

import { Dimens } from '../utils/constants';
import About from './About';

const container = style(
  {
    marginLeft: Dimens.sidebarCollapsedWidth,
    paddingLeft: Dimens.contentHorizontalPadding,
    paddingRight: Dimens.contentHorizontalPadding,
    paddingTop: Dimens.contentVerticalPadding,
    paddingBottom: Dimens.contentVerticalPadding,
  },
  fillParent,
);

const NoMatch = () => <div>Page under construction</div>;

const Main = () => (
  <div className={container}>
    <Switch>
      <Route exact path="/about" component={About} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default Main;
