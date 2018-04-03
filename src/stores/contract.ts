/**
 * Actions for handling async calls to ethereum contract
 */
import { Epic } from 'redux-observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import {
  changeBet as ethChangeBet,
  getAvailableBets,
  getPastBets,
  getPlacedBets,
  getUserAccount,
  placeBet as ethPlaceBet,
} from '../ethereum/contract-interaction';
import { Actions, IState } from './root';

/**
 * Action noop
 */
interface INoopAction {
  type: 'NO_OP';
}
const NO_OP: INoopAction['type'] = 'NO_OP';
export const noop = () => ({
  type: NO_OP,
});

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

/**
 * Action to fetch userAccount
 */
interface IFetchUserAccount {
  type: 'FETCH_USER_ACCOUNT';
}
export const FETCH_USER_ACCOUNT: IFetchUserAccount['type'] = 'FETCH_USER_ACCOUNT';
export const fetchUserAccount = () => ({
  type: FETCH_USER_ACCOUNT,
});

/**
 * Sucess action for fetch userAccount action
 */
interface ISucessUserAccount {
  type: 'SUCCESS_USER_ACCOUNT';
  userAccount: string;
}
export const SUCESS_USER_ACCOUNT: ISucessUserAccount['type'] = 'SUCCESS_USER_ACCOUNT';
export const sucessUserAccount = (userAccount: ISucessUserAccount['userAccount']) => ({
  type: SUCESS_USER_ACCOUNT,
  userAccount,
});

/**
 * Fetch action for placed bets by a user
 */
interface IFetchPlacedBets {
  type: 'FETCH_PLACED_BETS';
  userAccount: string;
}
export const FETCH_PLACED_BETS: IFetchPlacedBets['type'] = 'FETCH_PLACED_BETS';
export const fetchPlacedBets = (userAccount: IFetchPlacedBets['userAccount']): IFetchPlacedBets => ({
  type: FETCH_PLACED_BETS,
  userAccount,
});

/**
 * Sucess action for placedBets
 */
interface ISucessPlacedBets {
  type: 'SUCESS_PLACED_BETS';
  placedBets: string[];
}
export const SUCESS_PLACED_BETS: ISucessPlacedBets['type'] = 'SUCESS_PLACED_BETS';
export const sucessPlacedBets = (placedBets: ISucessPlacedBets['placedBets']) => ({
  type: SUCESS_PLACED_BETS,
  placedBets,
});

/**
 * Action to change bet for an already placed bet
 */
interface IChangeBet {
  type: 'CHANGE_BET';
  betEvent: string;
  outcomeIndex: number;
}
export const CHANGE_BET: IChangeBet['type'] = 'CHANGE_BET';
export const changeBet = (betEvent: IChangeBet['betEvent'], outcomeIndex: IChangeBet['outcomeIndex']) => ({
  type: CHANGE_BET,
  betEvent,
  outcomeIndex,
});

/**
 * Action to fetch bets which have already ended
 */
interface IFetchResultsBet {
  type: 'FETCH_RESULTS_BET';
}
export const FETCH_RESULTS_BET: IFetchResultsBet['type'] = 'FETCH_RESULTS_BET';
export const fetchResultsBet = () => ({
  type: FETCH_RESULTS_BET,
});

/**
 * Sucess action to for fetch results bet
 */
interface ISucessResultsBet {
  type: 'SUCESS_RESULTS_BET';
  results: string[];
}
export const SUCESS_RESULTS_BET: ISucessResultsBet['type'] = 'SUCESS_RESULTS_BET';
export const sucessResultsBet = (results: ISucessResultsBet['results']) => ({
  type: SUCESS_RESULTS_BET,
  results,
});

export const fetchAvailableEpic: Epic<Actions, IState> = action$ =>
  action$.ofType(FETCH_AVAILABLE_BETS).mergeMap(() => fromPromise(getAvailableBets()).map(sucessAvailableBets));

export const placeBetEpic: Epic<Actions, IState> = action$ =>
  action$
    .ofType(PLACE_BET)
    .do((action: IPlaceBet) => ethPlaceBet(action.betEvent, action.outcomeIndex, action.value))
    .map(noop);

export const changeBetEpic: Epic<Actions, IState> = action$ =>
  action$
    .ofType(CHANGE_BET)
    .do((action: IChangeBet) => ethChangeBet(action.betEvent, action.outcomeIndex))
    .map(noop);

export const fetchUserAccountEpic: Epic<Actions, IState> = action$ =>
  action$.ofType(FETCH_USER_ACCOUNT).mergeMap(() => fromPromise(getUserAccount()).map(sucessUserAccount));

export const fetchPlacedBetsEpic: Epic<Actions, IState> = action$ =>
  action$.ofType(FETCH_PLACED_BETS).mergeMap(() => fromPromise(getPlacedBets()).map(sucessPlacedBets));

export const fetchResultBetsEpic: Epic<Actions, IState> = action$ =>
  action$.ofType(FETCH_RESULTS_BET).mergeMap(() => fromPromise(getPastBets()).map(sucessResultsBet));

export type ContractActions =
  | IFetchAvailableBets
  | ISuccessAvailableBets
  | IPlaceBet
  | ISucessUserAccount
  | IFetchUserAccount
  | IFetchPlacedBets
  | ISucessPlacedBets
  | IChangeBet
  | IFetchResultsBet
  | ISucessResultsBet
  | INoopAction;

export interface IContractsState {
  availableBets: string[];
  placedBets: string[];
  resultBets: string[];
  userAccount: string;
}

export const defaultContractsState: IContractsState = {
  availableBets: [],
  placedBets: [],
  resultBets: [],
  userAccount: '',
};

export const contract = (state: IContractsState = defaultContractsState, action: ContractActions): IContractsState => {
  switch (action.type) {
    case SUCESS_AVAILABLE_BETS:
      return { ...state, availableBets: action.availableBets };
    case PLACE_BET:
      return { ...state, placedBets: state.placedBets.concat(action.betEvent) };
    case SUCESS_USER_ACCOUNT:
      return { ...state, userAccount: action.userAccount };
    case SUCESS_PLACED_BETS:
      return { ...state, placedBets: state.placedBets.concat(action.placedBets) };
    case SUCESS_RESULTS_BET:
      return { ...state, resultBets: action.results };
    default:
      return state;
  }
};
