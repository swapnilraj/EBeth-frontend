import { normalize, setupPage } from 'csstips';

import { cssRule, style } from 'typestyle';

/**
 * Font family for application
 */
const fontFamily = [
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
    backgroundColor: '#CBC0D3',
    fontFamily,
    fontSize: 20,
    padding: 16,
  });
  cssRule('button', {
    backgroundColor: '#8E9AAF',
    color: 'white',
    padding: 8,
    fontSize: 36,
    borderRadius: 8,
    outline: 0,
    minWidth: 120,
  });
  cssRule('input, button', { fontFamily });
};

/**
 * Normalize element to take entire viewport
 */
export const normalizeEl = style({
  minHeight: '100%',
  width: '100%',
});
