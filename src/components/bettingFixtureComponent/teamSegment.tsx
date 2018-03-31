import * as React from 'react';
import { style } from 'typestyle';

export interface IResult {
  homeTeamName: string;
  awayTeamName: string;
  winningTeamStatus: string; // should be Home Away Draw
  date: string;
  score: string;
  resultForUser: string;
  teamOfUser: string; // Home|Away|Draw
  amountWon: number;
  potValue: number;
  homeTeamBets: number;
  awayTeamBets: number;
  drawBets: number;
  yourBetValue: number;
}

interface IProps {
  crest: string;
  teamName: string;
  status: string;
  screen: string;
  result: IResult;
  team: string; // specifies whether team is home or away
}

export class TeamSegment extends React.Component<IProps, {}> {
  public render() {
    const loadScreenSpecificComponents = () => {
      if (this.props.screen === 'PLACE_BETS') {
        return (
          <div className={textWrapper()}>
            <div className={centerText()}>{this.props.teamName}</div>
            <div className={homeOrAwayText()}>{this.props.team}</div>
          </div>
        );
      } else if (this.props.screen === 'RESULTS') {
        return (
          <div className={textWrapper()}>
            <div className={centerText()}>{this.props.teamName}</div>
            <div className={myBetBox}>your bet: {this.props.result.yourBetValue} ETH</div>
            <div className={homeOrAwayText()}>{this.props.team}</div>
          </div>
        );
      }
    };

    const teamWrapper = style({
      height: '100%',
      width: '30%',
      float: 'left',
      display: 'inline-block',
      verticalAlign: 'middle',
      position: 'relative',
    });

    const crestStyle = style({
      height: '100%',
      width: 'auto',
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'middle',
      textAlign: 'center',
    });

    const displayUserBet = this.props.team === this.props.result.teamOfUser ? 'true' : 'false';

    const centerText = () => {
      if (displayUserBet === 'true') {
        // bold teamText if user betted on it
        return style({ fontWeight: 'bold' as 'bold' });
      }
    };

    const homeOrAway = {
      Home: {
        float: 'left',
        marginLeft: '5%',
        marginRight: '0%',
      },
      Away: {
        float: 'right',
        marginLeft: '0%',
        marginRight: '5%',
        backgroundColor: 'white',
      },
      none: {},
    };
    const expandedOrContracted = {
      expanded: {
        display: 'inline',
      },
      contracted: {
        display: 'none',
      },
      none: {
        display: 'none',
      },
    };

    const dynamicHomeAwayText = {
      Home: {
        color: 'rgb(140, 140, 140)',
        fontSize: '.8em',
        marginTop: '3%',
      },
      Away: {
        color: 'rgb(140, 140, 140)',
        fontSize: '.8em',
        marginTop: '3%',
      },
      none: {},
    };

    const homeOrAwayText = () => style(dynamicHomeAwayText[this.props.team], expandedOrContracted[this.props.status]);

    const dynamicMyBetBoxColor = {
      win: {
        backgroundColor: '#00c000',
      },
      lose: {
        backgroundColor: '#ff0000',
      },
      pending: {
        backgroundColor: '#fb6235',
      },
    };

    const myBetBoxStyle = {
      Default: {
        padding: '0.25em',
        paddingRight: '0.4em',
        paddingLeft: '0.4em',
        color: 'white',
        fontSize: '.6em',
        letterSpacing: '0.08em',
        fontWeight: 'bold' as 'bold',
        marginTop: '3%',
      },
      Away: {
        marginLeft: 'auto',
      },
      Home: {},
    };
    const dynamicUserBetDisplay = {
      false: { display: 'none' as 'none' },
      true: { display: 'inline-table' as 'inline-table' },
    };

    const myBetBox = style(
      dynamicUserBetDisplay[displayUserBet],
      myBetBoxStyle.Default,
      myBetBoxStyle[this.props.team],
      dynamicMyBetBoxColor[this.props.result.resultForUser],
    );

    const crestWrapper = () =>
      style({
        height: '60%',
        display: 'inline-block',
        verticalAlign: 'middle',
        textAlign: 'center',
        marginTop: '5%',
        position: 'relative',
        marginLeft: homeOrAway[this.props.team].marginLeft,
        marginRight: homeOrAway[this.props.team].marginRight,
        float: homeOrAway[this.props.team].float,
      });

    const textWrapper = () =>
      style({
        height: '100%',
        float: homeOrAway[this.props.team].float,
        textAlign: homeOrAway[this.props.team].float,
        marginLeft: '5%',
        marginRight: '5%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      });

    const dynamicComponents = loadScreenSpecificComponents();

    return (
      <div className={teamWrapper}>
        <div className={crestWrapper()}>
          <img alt="Crest" className={crestStyle} src={this.props.crest} />
        </div>
        {dynamicComponents}
      </div>
    );
  }
}
