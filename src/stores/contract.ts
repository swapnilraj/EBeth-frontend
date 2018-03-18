/**
 * Actions for handling async calls to ethereum contract
 */

import { Epic } from 'redux-observable';

import { Actions, IState } from './root';

import {getAvailableBets} from '../ethereum/contract-interaction';
import { fromPromise } from 'rxjs/observable/fromPromise';

/**
 * Action to issue a fetch request for all available bets
 */
interface IFetchAvailableBets {
  type: 'FETCH_AVAILABLE_BETS';
}
const FETCH_AVAILABLE_BETS: IFetchAvailableBets['type'] = 'FETCH_AVAILABLE_BETS';
export const fetchAvailableBets = (): IFetchAvailableBets => ({
  type: FETCH_AVAILABLE_BETS,
});

/**
 * Success action for getAvailableBets
 */
interface ISuccessAvailableBets {
  type: 'SUCCESS_AVAILABLE_BETS';
  availableBets: string[];
}
const SUCESS_AVAILABLE_BETS: ISuccessAvailableBets['type'] = 'SUCCESS_AVAILABLE_BETS';
export const sucessAvailableBets = (availableBets): ISuccessAvailableBets => ({
  type: SUCESS_AVAILABLE_BETS,
  availableBets,
});

export const fetchAvailableEpic: Epic<Actions, IState> = action$ =>
  action$.ofType(FETCH_AVAILABLE_BETS)
    .mergeMap(fromPromise(getAvailableBets)))

export type ContractActions =
  IFetchAvailableBets |
  ISuccessAvailableBets;

export interface IContractsState {
  availableBets: string[];
}

export const defaultContractsState: IContractsState = {
  availableBets: [],
}

export const contract = (state: IContractsState = defaultContractsState, action: ContractActions): IContractsState => {
  switch(action.type) {
    case SUCESS_AVAILABLE_BETS:
      return { ...state, availableBets: action.availableBets };
    default:
      return state;
  }
};
