/**
 * Actions for handling async calls to ethereum contract
 */
import { Epic } from 'redux-observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { getAvailableBets, placeBet as ethPlaceBet } from '../ethereum/contract-interaction';
import { Actions, IState } from './root';

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
export const sucessAvailableBets = (availableBets: ISuccessAvailableBets['availableBets']): ISuccessAvailableBets => ({
  type: SUCESS_AVAILABLE_BETS,
  availableBets,
});

/**
 * Action to placeBet
 */
interface IPlaceBet {
  type: 'PLACE_BET';
  betEvent: string;
  outcomeIndex: number;
  value: string;
}
const PLACE_BET: IPlaceBet['type'] = 'PLACE_BET';
export const placeBet = (
  betEvent: IPlaceBet['betEvent'],
  outcomeIndex: IPlaceBet['outcomeIndex'],
  value: IPlaceBet['value'],
) => ({
  type: PLACE_BET,
  betEvent,
  outcomeIndex,
  value,
});

export const fetchAvailableEpic: Epic<Actions, IState> = action$ =>
  action$.ofType(FETCH_AVAILABLE_BETS).mergeMap(() => fromPromise(getAvailableBets()).map(sucessAvailableBets));

export const placeBetEpic: Epic<Actions, IState> = action$ =>
  action$.ofType(PLACE_BET).do((action: IPlaceBet) => ethPlaceBet(action.betEvent, action.outcomeIndex, action.value));

export type ContractActions = IFetchAvailableBets | ISuccessAvailableBets | IPlaceBet;

export interface IContractsState {
  availableBets: string[];
  placedBets: string[];
}

export const defaultContractsState: IContractsState = {
  availableBets: [],
  placedBets: [],
};

export const contract = (state: IContractsState = defaultContractsState, action: ContractActions): IContractsState => {
  switch (action.type) {
    case SUCESS_AVAILABLE_BETS:
      return { ...state, availableBets: action.availableBets };
    case PLACE_BET:
      return { ...state, placedBets: state.placedBets.concat(action.betEvent) };
    default:
      return state;
  }
};
