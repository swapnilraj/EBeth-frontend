/**
 * Time component
 */

import * as React from 'react';

import { style } from 'typestyle';

interface ITimeProps {
  time: number;
}

const container = style({
  color: 'white',
  fontSize: 72,
  fontWeight: 'normal',
});

const pad = (num: number): string => (num < 10 ? '0' : '') + num;

const formatTime = (time: Date): string =>
  `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;

const Time = ({
  time,
}: ITimeProps) => (
  <h1 className={container}>{formatTime(new Date(time))}</h1>
);

export default Time;
