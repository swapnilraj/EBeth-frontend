/**
 * Round image component
 */

import * as React from 'react';
import { style } from 'typestyle';

import { Text } from '../utils/constants';

interface IProps {
  src: string;
}

const container = style({
  borderRadius: '50%',
});

const RoungImg = ({ src }: IProps) => <img className={container} src={src} alt={Text.profileAltTitle} />;

export default RoungImg;
