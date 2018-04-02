import * as React from 'react';
import { style } from 'typestyle';
import { IFixture } from '../Results';

interface IProps {
  fixture: IFixture;
}

export class PotValue extends React.Component<IProps, {}> {
  public render() {
    const centerText = style({
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    });

    const wrapper = style({
      height: '50%',
      width: '100%',
      position: 'relative',
    });

    return (
      <div className={wrapper}>
        <div className={centerText}>{'Pot : ' + this.props.fixture.potValue + ' ETH'}</div>
      </div>
    );
  }
}
