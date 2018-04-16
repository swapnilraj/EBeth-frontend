import * as React from 'react';
import { classes, style, types } from 'typestyle';
import { IMyBets } from '../../reducers/myBetsReducer';
import { Colors, Dimens } from '../../utils/constants';
import { IResult } from '../Results';



interface IProps {
  startTime: string;
  screen: string;
  result: IResult;
  liveMatch: boolean;
  bet: IMyBets;
}

export class TimeSegment extends React.Component<IProps, {}> {
  public render() {
    const draw = this.props.result.teamOfUser === 'Draw' || this.props.bet.betPlacedOn === 'Draw';
    const loadScreenSpecificComponents = () => {
      if (this.props.screen === 'PLACE_BETS' || this.props.screen === 'MY_BETS') {
        return (
          <div className={flexWrapper}>
            <div>{this.props.startTime}</div>
            <div className={classes(myBetBox(draw), myBetBoxColor('pending'))}>your bet: 0.05 ETH</div>
          </div>
        );
      } else if (this.props.screen === 'RESULTS') {
        return (
          <div className={flexWrapper}>
            <div className={scoreWrapper}>{this.props.result.score}</div>
            <div className={classes(myBetBox(draw), myBetBoxColor(this.props.result.resultForUser))}>
              your bet: 0.05 ETH
            </div>
          </div>
        );
      }
    };

    const myBetBoxStyle = style({
      fontSize: Dimens.myBetBoxFontSize,
      letterSpacing: Dimens.myBetBoxLetterSpacing,
      fontWeight: 'bold' as types.CSSFontWeight,
      padding: Dimens.myBetBoxPadding,
      paddingRight: Dimens.myBetBoxPaddingSides,
      paddingLeft: Dimens.myBetBoxPaddingSides,
      margin: Dimens.myBetBoxMarginTop,
      color: Colors.myBetBoxText,
      flexGrow: 0,
    });

    const myBetBoxColor = color => {
      return style({ backgroundColor: Colors[color] });
    };

    const myBetBox = display => {
      if (display) {
        return myBetBoxStyle;
      }
      return style({ display: 'none' as types.CSSDisplay });
    };

    const timeWrapper = style({
      height: '100%',
      float: 'left',
      width: '15%',
    });

    const flexWrapper = style({
      display: 'flex' as types.CSSDisplay,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    });

    const scoreWrapper = style({
      fontSize: '2em',
    });

    const dynamicComponents = loadScreenSpecificComponents();

    return <div className={timeWrapper}>{dynamicComponents}</div>;
  }
}
