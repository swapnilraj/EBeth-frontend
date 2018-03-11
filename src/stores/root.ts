/**
 * Redux store root entities
 */

import { combineEpics, Epic } from 'redux-observable';

import { combineReducers } from 'redux';

import { IRouterState, router, RouterActions, routerEpic } from './router';

/**
 * Combined application actions interface
 */
export type Actions = RouterActions;

/**
 * Combined application state interface
 */
export interface IState {
  router: IRouterState;
}

const epics: Array<Epic<Actions, IState, any>> = [routerEpic].filter(epic => epic !== null) as Array<
  Epic<Actions, IState, any>
>;

export const rootEpic = combineEpics<Actions, IState>(...epics);

export const rootReducer = combineReducers<IState>({
  router,
});
