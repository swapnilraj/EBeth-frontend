/**
 * App component
 */

import * as React from 'react';

import { classes, style } from 'typestyle';

import { normalizeEl } from '../utils/styles';

const mainContainer = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const App = () => (
  <div className={classes(normalizeEl, mainContainer)}>
    <main className={mainContainer}>Hii</main>
  </div>
);

export default App;
