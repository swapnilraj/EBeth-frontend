/**
 * Actions for handling async calls to ethereum contract
 */
import { Epic } from 'redux-observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { getAvailableBets, getUserAccount, placeBet as ethPlaceBet } from '../ethereum/contract-interaction';
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

/**
 * Action to fetch userAccount
 */
interface IFetchUserAccount {
  type: 'FETCH_USER_ACCOUNT';
}
export const FETCH_USER_ACCOUNT: IFetchUserAccount['type'] = 'FETCH_USER_ACCOUNT';
export const fetchUserAccount = () => ({
  type: FETCH_AVAILABLE_BETS,
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

export const fetchAvailableEpic: Epic<Actions, IState> = action$ =>
  action$.ofType(FETCH_AVAILABLE_BETS).mergeMap(() => fromPromise(getAvailableBets()).map(sucessAvailableBets));

export const placeBetEpic: Epic<Actions, IState> = action$ =>
  action$.ofType(PLACE_BET).do((action: IPlaceBet) => ethPlaceBet(action.betEvent, action.outcomeIndex, action.value));

export const fetchUserAccountEpic: Epic<Actions, IState> = action$ =>
  action$.ofType(FETCH_USER_ACCOUNT).mergeMap(() => fromPromise(getUserAccount()).map(sucessUserAccount));

export type ContractActions =
  | IFetchAvailableBets
  | ISuccessAvailableBets
  | IPlaceBet
  | ISucessUserAccount
  | IFetchUserAccount;

export interface IContractsState {
  availableBets: string[];
  placedBets: string[];
  userAccount: string;
}

export const defaultContractsState: IContractsState = {
  availableBets: [],
  placedBets: [],
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
    default:
      return state;
  }
};
