/**
 * App component
 */

import * as React from 'react';

import { classes, style } from 'typestyle';

import { ITimerState } from '../stores/timer';

import { normalizeEl } from '../utils/styles';

import { renderIf } from '../utils/render-if-else';

import Time from './Time';

const mainContainer = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

interface IAppProps extends ITimerState {
  startTimer();
  stopTimer();
}

const App = ({
  isRunning,
  startTimer,
  stopTimer,
  time,
}: IAppProps) => (
  <div className={classes(normalizeEl, mainContainer)}>
    <main className={mainContainer}>
      <Time time={time} />
      {renderIf(
        isRunning,
        <button onClick={stopTimer}>Stop</button>,
        <button onClick={startTimer}>Start</button>,
      )}
    </main>
  </div>
);

export default App;
