/**
 * MediumText component
 */

import * as React from 'react';
import { classes, style } from 'typestyle';

const container = style({
  fontSize: 18,
});

interface IProps {
  text: string;
  className?: string;
}

const MediumText = ({ text, className }: IProps) => <span className={classes(container, className)}>{text}</span>;

export default MediumText;
