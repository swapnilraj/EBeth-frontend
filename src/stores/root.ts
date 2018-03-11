/**
 * Redux store root entities
 */

import { combineEpics, Epic } from 'redux-observable';

import { combineReducers } from 'redux';

import { IRouterState, router, RouterActions, routerEpic } from './router';

import { ISidebarState, sidebar, SidebarActions } from './sidebar';

/**
 * Combined application actions interface
 */
export type Actions = RouterActions | SidebarActions;

/**
 * Combined application state interface
 */
export interface IState {
  router: IRouterState;
  sidebar: ISidebarState;
}

const epics: Array<Epic<Actions, IState, any>> = [routerEpic].filter(epic => epic !== null) as Array<
  Epic<Actions, IState, any>
>;

export const rootEpic = combineEpics<Actions, IState>(...epics);

export const rootReducer = combineReducers<IState>({
  router,
  sidebar,
});
