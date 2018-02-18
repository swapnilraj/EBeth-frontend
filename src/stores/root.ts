/**
 * Redux store root entities
 */

import { combineEpics, Epic } from 'redux-observable';

import { combineReducers } from 'redux';

import { IRouterState, router, RouterActions, routerEpic } from './router';

import { ITimerState, timer, TimerActions, updateTimeEpic } from './timer';

/**
 * Combined application actions interface
 */
export type Actions =
  | RouterActions
  | TimerActions;

/**
 * Combined application state interface
 */
export interface IState {
  router: IRouterState;
  timer: ITimerState;
}

const epics: Array<Epic<Actions, IState, any>> = [
  routerEpic,
  updateTimeEpic,
].filter(epic => epic !== null) as Array<Epic<Actions, IState, any>>;

export const rootEpic = combineEpics<Actions, IState>(...epics);

export const rootReducer = combineReducers<IState>({
  router,
  timer,
});
