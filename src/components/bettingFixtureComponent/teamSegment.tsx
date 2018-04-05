import * as React from 'react';
import { classes, style, types } from 'typestyle';
import { IMyBets } from '../../reducers/myBetsReducer';
import { Colors, Dimens } from '../../utils/constants';

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
  bet: IMyBets;
  team: string; // specifies whether team is home or away
  liveMatch: boolean;
}

export class TeamSegment extends React.Component<IProps, {}> {
  public render() {
    const loadScreenSpecificComponents = () => {
      const isContracted = this.props.status === 'contracted';
      const displayUserBet =
        this.props.team === this.props.result.teamOfUser || this.props.bet.betPlacedOn === this.props.team;
      if (this.props.screen === 'PLACE_BETS') {
        return (
          <div className={textWrapper()}>
            <div className={centerText(false)}>{this.props.teamName}</div>
            <div className={homeOrAwayText(isContracted)}>{this.props.team}</div>
          </div>
        );
      } else if (this.props.screen === 'RESULTS') {
        return (
          <div className={textWrapper()}>
            <div className={centerText(displayUserBet)}>{this.props.teamName}</div>
            <div className={classes(myBetBox(displayUserBet), myBetBoxColor(this.props.result.resultForUser))}>
              your bet: {this.props.result.yourBetValue} ETH
            </div>
            <div className={homeOrAwayText(isContracted)}>{this.props.team}</div>
          </div>
        );
      }

      if (this.props.screen === 'MY_BETS') {
        return (
          <div className={textWrapper()}>
            <div className={centerText(displayUserBet)}>{this.props.teamName}</div>
            <div className={classes(myBetBox(displayUserBet), myBetBoxColor('pending'))}>
              your bet: {this.props.bet.betValue} ETH
            </div>
            <div className={homeOrAwayText(isContracted)}>{this.props.team}</div>
          </div>
        );
      }
    };

    const liveTeamWrapper = style({
      height: '100%' as types.CSSGlobalValues,
      width: '27.5%' as types.CSSGlobalValues,
      float: 'left' as types.CSSGlobalValues,
      display: 'inline-block' as types.CSSDisplay,
      verticalAlign: 'middle' as types.CSSGlobalValues,
      position: 'relative' as types.CSSGlobalValues,
    });

    const teamWrapper = style({
      height: '100%' as types.CSSGlobalValues,
      width: '30%' as types.CSSGlobalValues,
      float: 'left' as types.CSSGlobalValues,
      display: 'inline-block' as types.CSSDisplay,
      verticalAlign: 'middle' as types.CSSGlobalValues,
      position: 'relative' as types.CSSGlobalValues,
    });

    const crestStyle = style({
      height: '100%',
      width: 'auto',
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'middle',
      textAlign: 'center',
    });

    // bold teamText if user betted on it
    const centerText = displayUserBet => {
      if (displayUserBet) {
        return style({ fontWeight: 'bold' as types.CSSFontWeight });
      }
    };

    const contracted = style({
      display: 'none' as types.CSSDisplay,
    });

    const homeAwayText = style({
      color: Colors.homeAwayText,
      fontSize: Dimens.homeAwayFontSize,
      marginTop: Dimens.myBetBoxMarginTop,
    });

    const homeOrAwayText = isContracted => {
      return classes(homeAwayText, isContracted ? contracted : null);
    };

    const myBetBoxColor = color => {
      return style({ backgroundColor: Colors[color] });
    };

    const myBetBoxStyle = style({
      padding: Dimens.myBetBoxPadding,
      paddingRight: Dimens.myBetBoxPaddingSides,
      paddingLeft: Dimens.myBetBoxPaddingSides,
      color: Colors.myBetBoxText,
      fontSize: Dimens.myBetBoxFontSize,
      letterSpacing: Dimens.myBetBoxLetterSpacing,
      fontWeight: 'bold' as types.CSSFontWeight,
      marginTop: Dimens.myBetBoxMarginTop,
      display: 'inline-table' as types.CSSDisplay,
      marginLeft: Dimens.myBetBoxMarginLeft[this.props.team],
    });

    const myBetBox = display => {
      if (display) {
        return myBetBoxStyle;
      }
      return contracted;
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
      <div className={this.props.liveMatch ? liveTeamWrapper : teamWrapper}>
        <div className={crestWrapper()}>
          <img alt="Crest" className={crestStyle} src={this.props.crest} />
        </div>
        {dynamicComponents}
      </div>
    );
  }
}
