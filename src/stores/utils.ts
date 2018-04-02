/**
 * Utils for store
 */

import { IState } from './root';

import { defaultBetMenuState as betMenuReducer } from '../reducers/betMenuReducer';
import { defaultListOfBettingComponentState as ListOfBettingComponentReducer } from '../reducers/listOfBettingComponentsReducer';
import { defaultMyBetState as MyBetsReducer } from '../reducers/myBetsReducer';
import { defaultListOfResultComponentState as resultState } from '../reducers/resultsReducer';
import { defaultContractsState as contract } from './contract';
import { defaultSidebarState as sidebar } from './sidebar';

/**
 * App default state
 */
export const getDefaultState = (): IState => ({
  sidebar,
  contract,
  betMenuReducer,
  ListOfBettingComponentReducer,
  resultState,
  MyBetsReducer,
});
