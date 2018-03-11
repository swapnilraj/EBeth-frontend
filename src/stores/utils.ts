/**
 * Utils for store
 */

import { IState } from './root';

/**
 * App default state
 */
export const getDefaultState = (): IState => ({
  router: {
    path: '/',
  },
  sidebar: {
    isCollapsed: true,
  },
});
