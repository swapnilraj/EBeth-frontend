import * as React from 'react';
import { style } from 'typestyle';
import { IFixture } from '../Results';
import { BetPercentage } from './betPercentage';

interface IProps {
  fixture: IFixture;
}

export class StatsBar extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);

    this.calculateMargin = this.calculateMargin.bind(this);
  }

  public calculateMargin() {
    const total = +this.props.fixture.homeBets + +this.props.fixture.drawBets + +this.props.fixture.awayBets;
    const homeBets = +this.props.fixture.homeBets / total;
    const drawBets = +this.props.fixture.drawBets / total;

    if (isNaN(drawBets)) {
      return '50%';
    } else {
      return ((homeBets + drawBets / 2) * 100).toString() + '%';
    }
  }

  public render() {
    // tslint:disable-next-line:no-console
    console.log('WAY TOO GOOD AT GOODBYES');
    // tslint:disable-next-line:no-console
    console.log(this.props);
    const statsBar = style({
      height: '20%',
      width: '80%',
      borderRadius: '10px',
      backgroundColor: 'rgb(216, 216, 216)',
      float: 'left',
      position: 'relative',
      marginTop: '.5%',
      marginLeft: '1%',
      overflow: 'hidden',
    });

    const wrapper = style({
      height: '50%',
      width: '100%',
      position: 'relative',
    });

    const homeStats = style({
      float: 'left',
      margin: '0 auto',
      marginLeft: '8%',
      position: 'relative',
    });

    const awayStats = style({
      float: 'left',
      margin: '0 auto',
      marginLeft: '1%',
      position: 'relative',
    });

    const positionDrawText = () =>
      style({
        margin: 0,
        position: 'relative',
        marginLeft: this.calculateMargin(),
      });

    const drawStats = style({
      float: 'left',
      height: '5%',
      width: '80%',
      marginTop: '0%',
      marginLeft: '10%',
    });

    const total = +this.props.fixture.homeBets + +this.props.fixture.drawBets + +this.props.fixture.awayBets;

    const homeBets = +this.props.fixture.homeBets / total;
    const drawBets = +this.props.fixture.drawBets / total;
    const awayBets = +this.props.fixture.awayBets / total;

    return (
      <div className={wrapper}>
        <div className={homeStats}>{this.props.fixture.homeBets}</div>
        <div className={statsBar}>
          <BetPercentage width={homeBets} color="rgb(161, 229, 237)" />
          <BetPercentage width={drawBets} color="rgb(252, 239, 126)" />
          <BetPercentage width={awayBets} color="rgb(255, 129, 129)" />
        </div>
        <div className={awayStats}>{this.props.fixture.awayBets}</div>
        <div className={drawStats}>
          <div className={positionDrawText()}>{this.props.fixture.drawBets}</div>
        </div>
      </div>
    );
  }
}
