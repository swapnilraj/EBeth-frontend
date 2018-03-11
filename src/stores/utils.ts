/**
 * Utils for store
 */

import { IState } from './root';

import { defaultRouterState as router } from './router';
import { defaultSidebarState as sidebar } from './sidebar';

/**
 * App default state
 */
export const getDefaultState = (): IState => ({
  router,
  sidebar,
});
