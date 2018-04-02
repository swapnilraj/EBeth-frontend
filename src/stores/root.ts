/**
 * Redux store root entities
 */

import { combineReducers } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { BetMenuActions, betMenuReducer, IBetMenuState } from '../reducers/betMenuReducer';
import {
  BettingComponentActions,
  IListOfBettingComponentState,
  ListOfBettingComponentReducer,
} from '../reducers/listOfBettingComponentsReducer';
import { IMyBetsState, MyBetsReducer } from '../reducers/myBetsReducer';

import { IListOfResultsComponentState, ResultComponentActions, ResultsReducer } from '../reducers/resultsReducer';

import {
  changeBetEpic,
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
  MyBetsReducer: IMyBetsState;
}

const epics: Array<Epic<Actions, IState, any>> = [
  fetchAvailableEpic,
  placeBetEpic,
  fetchUserAccountEpic,
  fetchPlacedBetsEpic,
  changeBetEpic,
].filter(epic => epic !== null) as Array<Epic<Actions, IState, any>>;

export const rootEpic = combineEpics<Actions, IState>(...epics);

export const rootReducer = combineReducers<IState>({
  sidebar,
  contract,
  betMenuReducer,
  ListOfBettingComponentReducer,
  ResultsReducer,
  MyBetsReducer,
});
