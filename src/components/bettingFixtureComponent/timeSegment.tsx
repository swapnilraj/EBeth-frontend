import * as React from 'react';
import { style } from 'typestyle';

export interface IResult {
  homeTeamName: string;
  awayTeamName: string;
  winningTeamStatus: string; // should be Home Away Draw
  date: string;
  score: string;
  resultForUser: string;
  teamOfUser: string; //Home|Away|Draw
  amountWon: number;
  potValue: number;
  homeTeamBets: number;
  awayTeamBets: number;
  drawBets: number;
  yourBetValue: number;
}

interface IProps {
  startTime: string;
  screen: string;
  result: IResult;
}

export class TimeSegment extends React.Component<IProps, {}> {
  public render() {
    const loadScreenSpecificComponents = () => {
      if (this.props.screen === 'PLACE_BETS') {
        return <div className={centerText}>{this.props.startTime}</div>;
      } else if (this.props.screen === 'RESULTS') {
        return (
          <div className={scoreWrapper}>
            <div className={centerText}>{this.props.result.score}</div>
          </div>
        );
      }
    };

    const timeWrapper = style({
      height: '100%',
      width: '15%',
      float: 'left',
      position: 'relative',
    });

    const scoreWrapper = style({
      height: '100%',
      width: '100%',
      float: 'left',
      position: 'relative',
      fontSize: '2em',
    });

    const centerText = style({
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    });

    const dynamicComponents = loadScreenSpecificComponents();

    return <div className={timeWrapper}>{dynamicComponents}</div>;
  }
}
