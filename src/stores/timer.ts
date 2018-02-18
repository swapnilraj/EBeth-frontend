/**
 * Timer actions / reducer
 */

import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';

import { Epic } from 'redux-observable';

import { Actions, IState } from './root';

interface IStartTimerAction {
  type: 'START_TIMER';
}

const START_TIMER: IStartTimerAction['type'] = 'START_TIMER';

export const startTimer = (): IStartTimerAction => ({
  type: START_TIMER,
});

interface IStopTimerAction {
  type: 'STOP_TIMER';
}

const STOP_TIMER: IStopTimerAction['type'] = 'STOP_TIMER';

export const stopTimer = (): IStopTimerAction => ({
  type: STOP_TIMER,
});

interface IUpdateTimeAction {
  type: 'UPDATE_TIME';
  time: number;
}

const UPDATE_TIME: IUpdateTimeAction['type'] = 'UPDATE_TIME';

const updateTime = (time: number): IUpdateTimeAction => ({
  type: UPDATE_TIME,
  time,
});

export type TimerActions = IStartTimerAction | IStopTimerAction | IUpdateTimeAction;

export interface ITimerState {
  isRunning: boolean;
  time: number;
}

const clock$ = (): Observable<IUpdateTimeAction> => interval(1000).map(() => updateTime(Date.now()));

// Update time epic
export const updateTimeEpic: Epic<Actions, IState> = action$ =>
  action$
    .ofType(START_TIMER)
    .switchMap(() => clock$().takeUntil(action$.ofType(STOP_TIMER)));

// Timer reducer
export const timer = (state: ITimerState = {
  isRunning: false,
  time: Date.now(),
}, action: TimerActions): ITimerState => {
  switch (action.type) {
    case START_TIMER:
      return {...state, isRunning: true };
    case STOP_TIMER:
      return {...state, isRunning: false };
    case UPDATE_TIME:
      return {...state, time: action.time };
    default:
      return state;
  }
}
