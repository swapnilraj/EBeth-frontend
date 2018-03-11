/**
 * LargeText component
 */

import * as React from 'react';
import { classes, style } from 'typestyle';

const container = style({
  fontSize: 48,
  fontWeight: 'bold',
});

interface IProps {
  text: string;
  className?: string;
}

const LargeText = ({ text, className }: IProps) => <span className={classes(container, className)}>{text}</span>;

export default LargeText;
