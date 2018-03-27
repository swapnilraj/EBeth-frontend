/**
 * Redux store root entities
 */

import { combineEpics, Epic } from 'redux-observable';
import { BetMenuActions, betMenuReducer, IBetMenuState } from '../reducers/betMenuReducer';

import { combineReducers } from 'redux';
import {
  BettingComponentActions,
  IListOfBettingComponentState,
  ListOfBettingComponentReducer,
} from '../reducers/listOfBettingComponentsReducer';

import {
  contract,
  ContractActions,
  fetchAvailableEpic,
  fetchUserAccountEpic,
  IContractsState,
  placeBetEpic,
} from './contract';
import { ISidebarState, sidebar, SidebarActions } from './sidebar';
/**
 * Combined application actions interface
 */
export type Actions = SidebarActions | ContractActions | BetMenuActions | BettingComponentActions;

/**
 * Combined application state interface
 */
export interface IState {
  listBettingComponent: IListOfBettingComponentState;
  sidebar: ISidebarState;
  contract: IContractsState;
  betMenu: IBetMenuState;
}

const epics: Array<Epic<Actions, IState, any>> = [fetchAvailableEpic, placeBetEpic, fetchUserAccountEpic].filter(
  epic => epic !== null,
) as Array<Epic<Actions, IState, any>>;

export const rootEpic = combineEpics<Actions, IState>(...epics);

export const rootReducer = combineReducers<IState>({
  sidebar,
  contract,
  betMenuReducer,
  ListOfBettingComponentReducer,
});
