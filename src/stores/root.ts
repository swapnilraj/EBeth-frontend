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

import { IListOfResultsComponentState, ResultComponentActions, ResultsReducer } from '../reducers/resultsReducer';

import {
  contract,
  ContractActions,
  fetchAvailableEpic,
  fetchPlacedBetsEpic,
  fetchUserAccountEpic,
  IContractsState,
  placeBetEpic,
} from './contract';
import { ISidebarState, sidebar, SidebarActions } from './sidebar';
/**
 * Combined application actions interface
 */
export type Actions =
  | SidebarActions
  | ContractActions
  | BetMenuActions
  | BettingComponentActions
  | ResultComponentActions;

/**
 * Combined application state interface
 */
export interface IState {
  ListOfBettingComponentReducer: IListOfBettingComponentState;
  sidebar: ISidebarState;
  contract: IContractsState;
  betMenuReducer: IBetMenuState;
  resultState: IListOfResultsComponentState;
}

const epics: Array<Epic<Actions, IState, any>> = [
  fetchAvailableEpic,
  placeBetEpic,
  fetchUserAccountEpic,
  fetchPlacedBetsEpic,
].filter(epic => epic !== null) as Array<Epic<Actions, IState, any>>;

export const rootEpic = combineEpics<Actions, IState>(...epics);

export const rootReducer = combineReducers<IState>({
  sidebar,
  contract,
  betMenuReducer,
  ListOfBettingComponentReducer,
  ResultsReducer,
});
