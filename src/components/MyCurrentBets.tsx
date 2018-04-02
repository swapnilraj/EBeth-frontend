import * as React from 'react';

import { MyBetsContainer } from '../containers/myBetsContainer';

const array = [];

const PlaceBets = () => (
  <div>
    <MyBetsContainer fixtureList={array} width="80%" marginLeft="5%" />
  </div>
);

export default PlaceBets;
