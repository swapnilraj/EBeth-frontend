import * as React from 'react';
import { PlaceBetsContainer } from '../containers/placeBetsContainer';

const array = [];

const PlaceBets = () => (
  <div>
    <PlaceBetsContainer fixtureList={array} width="80%" marginLeft="5%" />
  </div>
);

export default PlaceBets;
