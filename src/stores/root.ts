/**
 * Redux store root entities
 */

import { combineEpics, Epic } from 'redux-observable';

import { combineReducers } from 'redux';

import { ISidebarState, sidebar, SidebarActions } from './sidebar';

/**
 * Combined application actions interface
 */
export type Actions = SidebarActions;

/**
 * Combined application state interface
 */
export interface IState {
  sidebar: ISidebarState;
}

const epics: Array<Epic<Actions, IState, any>> = [].filter(epic => epic !== null) as Array<Epic<Actions, IState, any>>;

export const rootEpic = combineEpics<Actions, IState>(...epics);

export const rootReducer = combineReducers<IState>({
  sidebar,
});
