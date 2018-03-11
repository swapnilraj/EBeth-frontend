import { normalize, setupPage } from 'csstips';
import { cssRule, style } from 'typestyle';

import { Colors } from './constants';

/**
 * Font family for application
 */
const fontFamily = [
  'Lato',
  '-apple-system',
  `BlinkMacSystemFont`,
  `"Segoe UI"`,
  `Helvetica`,
  `Arial`,
  `sans-serif`,
  `"Apple Color Emoji"`,
  `"Segoe UI Emoji"`,
  `"Segoe UI Symbol"`,
].join(', ');

/**
 * Global styles
 */
export const fixGlobalStyles = () => {
  normalize();
  setupPage('#root');
  cssRule('body', {
    backgroundColor: Colors.background,
    fontFamily,
    fontSize: 16,
  });
};

/**
 * Normalize element to take entire viewport
 */
export const normalizeEl = style({
  minHeight: '100%',
  width: '100%',
});
