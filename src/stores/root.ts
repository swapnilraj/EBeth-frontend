/**
 * Redux store root entities
 */

import { combineEpics, Epic } from 'redux-observable';

import { combineReducers } from 'redux';

import { contract, ContractActions, fetchAvailableEpic, IContractsState, placeBetEpic, fetchUserAccountEpic } from './contract';
import { ISidebarState, sidebar, SidebarActions } from './sidebar';
/**
 * Combined application actions interface
 */
export type Actions = SidebarActions | ContractActions;

/**
 * Combined application state interface
 */
export interface IState {
  sidebar: ISidebarState;
  contract: IContractsState;
}

const epics: Array<Epic<Actions, IState, any>> = [fetchAvailableEpic, placeBetEpic, fetchUserAccountEpic].filter(epic => epic !== null) as Array<
  Epic<Actions, IState, any>
>;

export const rootEpic = combineEpics<Actions, IState>(...epics);

export const rootReducer = combineReducers<IState>({
  sidebar,
  contract,
});
