/**
 * Utils for store
 */

import { IState } from './root';

import { defaultBetMenuState as betMenu } from '../reducers/betMenuReducer';
import { defaultListOfBettingComponentState as listBettingComponent } from '../reducers/listOfBettingComponentsReducer';
import { defaultListOfResultComponentState as resultState } from '../reducers/resultsReducer';
import { defaultContractsState as contract } from './contract';
import { defaultSidebarState as sidebar } from './sidebar';

/**
 * App default state
 */
export const getDefaultState = (): IState => ({
  sidebar,
  contract,
  betMenu,
  listBettingComponent,
  resultState,
});
