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
  timer: {
    isRunning: false,
    time: Date.now(),
  },
});
