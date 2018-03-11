/**
 * Utils for store
 */

import { IState } from './root';

import { defaultSidebarState as sidebar } from './sidebar';

/**
 * App default state
 */
export const getDefaultState = (): IState => ({
  sidebar,
});
