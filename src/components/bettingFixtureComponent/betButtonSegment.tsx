import * as React from 'react';
import { style } from 'typestyle';
import * as assets from '../../assets.json';

interface IFixture {
  homeTeamName: string;
  awayTeamName: string;
  date: string;
  time: string;
  homeBets: number;
  awayBets: number;
  drawBets: number;
  potValue: number;
}

export interface IResult {
  homeTeamName: string;
  awayTeamName: string;
  winningTeamStatus: string; // should be Home Away Draw
  date: string;
  score: string;
  resultForUser: string;
  amountWon: number;
  potValue: number;
  homeTeamBets: number;
  awayTeamBets: number;
  drawBets: number;
  yourBetValue: number;
}

interface IProps {
  message: string;
  fixture: IFixture;
  screen: string;
  result: IResult;
  showMore();
  expandBetMenu(currentState: string, currentFixture: IFixture);
}

export class BetButtonSegment extends React.Component<IProps, {}> {
  public render() {
    const loadScreenSpecificComponents = () => {
      if (this.props.screen === 'PLACE_BETS') {
        return (
          <div onClick={() => this.props.expandBetMenu('hide', this.props.fixture)} className={betButton}>
            <div className={centerText}>BET</div>
          </div>
        );
      } else if (this.props.screen === 'RESULTS') {
        return (
          <div className={outcomeSpace}>
            <div className={arrowSpace}>
              {
                // tslint:disable-next-line:no-string-literal
              }
              <img className={arrowStyle} src={assets[this.props.result.resultForUser]} />
            </div>
            <div className={winnings}>
              <div className={centerText}>ETH: {this.props.result.amountWon}</div>
            </div>
          </div>
        );
      }
    };

    const winnings = style({
      height: '100%',
      width: '65%',
      float: 'left',
      position: 'relative',
    });

    const betButtonWrapper = style({
      height: '100%',
      width: '25%',
      float: 'left',
    });

    const container = style({
      height: '100%',
      width: '50%',
      float: 'left',
      position: 'relative',
    });

    const arrowStyle = style({
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '15%',
    });

    const arrowSpace = style({
      height: '100%',
      width: '25%',
      float: 'left',
      position: 'relative',
    });

    const outcomeSpace = style({
      height: '100%',
      width: '100%',
      float: 'left',
      position: 'relative',
    });

    const centerText = style({
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    });

    const betButton = style({
      height: '40%',
      width: '70%',
      borderRadius: '15px',
      backgroundColor: 'rgb(251, 98, 53);',
      position: 'absolute',
      top: '50%',
      color: 'white',
      transform: 'translate(0%, -50%)',
      cursor: 'pointer',
    });

    const dynamicComponents = loadScreenSpecificComponents();

    return (
      <div className={betButtonWrapper}>
        <div className={container}>
          <div className={centerText} onClick={this.props.showMore}>
            {this.props.message}
          </div>
        </div>
        <div className={container}>{dynamicComponents}</div>
      </div>
    );
  }
}
