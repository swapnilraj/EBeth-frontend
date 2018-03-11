/**
 * Main component
 */

import { fillParent } from 'csstips';
import * as React from 'react';
import { style } from 'typestyle';

const container = style(fillParent);

const Main = () => <div className={container} />;

export default Main;
