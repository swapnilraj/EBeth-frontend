import * as React from 'react';
import { style } from 'typestyle';
import { types } from 'typestyle';
import * as crests from '../../Crests.json';
import { IMyBets } from '../../reducers/myBetsReducer';
import { BetButtonSegment } from '../bettingFixtureComponent/betButtonSegment';
import { PotValue } from '../bettingFixtureComponent/potValue';
import { StatsBar } from '../bettingFixtureComponent/statsBar';
import { TeamSegment } from '../bettingFixtureComponent/teamSegment';
import { TimeSegment } from '../bettingFixtureComponent/timeSegment';

import { defaultResult } from '../resultComponent/listOfResults';
import { IFixture, IResult, IResultComponent } from '../Results';

interface IProps {
  marginLeft: string;
  fixture: IFixture;
  status: IResultComponent;
  width: string;
  result: IResult;
  bet: IMyBets;
  id: number;
  toggleStatsBar(id: number);
  expandBetMenu(currentState: string, currentFixture: IFixture);
}

export class MyBetsComponent extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
    this.toggleStatsBar = this.toggleStatsBar.bind(this);
  }

  public toggleStatsBar() {
    this.props.toggleStatsBar(this.props.id);
  }

  public render() {
    let newWidth = 0;
    let offsetDueToMargin = 0;

    if (this.props.width) {
      const widthAsNumber = parseInt(this.props.width.substring(0, this.props.width.length - 1), 10);
      newWidth = (100 - widthAsNumber) / 2;
    }

    if (this.props.marginLeft) {
      offsetDueToMargin = parseInt(this.props.marginLeft.substring(0, this.props.marginLeft.length - 1), 10);
    }

    const bettingFixtureComponent = () =>
      style({
        height: '5em',
        marginLeft: setWidth[newWidth !== 0 ? 'true' : 'false'].marginLeft as any,
        marginRight: setWidth[newWidth !== 0 ? 'true' : 'false'].marginRight as any,
        backgroundColor: 'white',
        margin: '0 auto',
        position: 'relative',
        fontFamily: 'lato',
        boxShadow: '1px 2px 9px -5px rgba(0, 0, 0, 0.1)',
      });

    const dynamicStats = {
      expanded: {
        display: 'inherit',
      },
      contracted: {
        display: 'none',
      },
    };

    const setWidth = {
      true: {
        marginLeft: (newWidth + offsetDueToMargin + '%') as types.CSSGlobalValues,
        marginRight: (newWidth - offsetDueToMargin + '%') as types.CSSGlobalValues,
      },
      false: {
        marginLeft: (newWidth + offsetDueToMargin + '%') as types.CSSGlobalValues,
        marginRight: (newWidth - offsetDueToMargin + '%') as types.CSSGlobalValues,
        width: '10%',
      },
    };

    const stats = () =>
      style({
        height: '6em',
        marginLeft: setWidth[newWidth !== 0 ? 'true' : 'false'].marginLeft as any,
        marginRight: setWidth[newWidth !== 0 ? 'true' : 'false'].marginRight as any,
        backgroundColor: 'white',
        margin: '0 auto',
        position: 'relative',
        fontFamily: 'lato',
        boxShadow: '1px 2px 9px -5px rgba(0, 0, 0, 0.1)',
        display: dynamicStats[this.props.bet.expanded ? 'expanded' : 'contracted'].display as types.CSSDisplay,
      });

    const expandedSection = style({
      height: '100%',
      width: '75%',
      position: 'relative',
    });

    const liveImageWrapper = () => style(liveFixtureStyles[this.props.bet.live ? 'true' : 'false']);

    const liveFixtureStyles = {
      true: {
        height: '100%' as types.CSSGlobalValues,
        width: '5%' as types.CSSGlobalValues,
        position: 'relative' as types.CSSGlobalValues,
        display: 'initial' as types.CSSDisplay,
        float: 'left' as types.CSSGlobalValues,
      },
      false: {
        display: 'none' as types.CSSDisplay,
      },
    };

    const liveImageStyle = style({
      height: '100%',
    });

    const blueLineDecoration = style({
      position: 'absolute',
      height: '3%',
      width: '99.8%',
      backgroundColor: this.props.bet.live ? '#273141' : 'none',
      left: '.2%',
      top: '0%',
    });

    return (
      <div>
        <div className={bettingFixtureComponent()}>
          <div className={blueLineDecoration} />
          <div className={liveImageWrapper()}>
            <img src="./images/live@2x.png" className={liveImageStyle} />
          </div>
          <TeamSegment
            teamName={this.props.bet.fixture.homeTeamName}
            crest={'./images' + crests[this.props.bet.fixture.homeTeamName]}
            team="Home"
            status={this.props.bet.expanded ? 'expanded' : 'contracted'}
            screen="MY_BETS"
            result={defaultResult}
            liveMatch={this.props.bet.live}
            bet={this.props.bet}
          />
          <TimeSegment
            startTime={this.props.fixture.time}
            screen="MY_BETS"
            result={defaultResult}
            liveMatch={this.props.bet.live}
            bet={this.props.bet}
          />
          <TeamSegment
            teamName={this.props.bet.fixture.awayTeamName}
            crest={'./images' + crests[this.props.bet.fixture.awayTeamName]}
            team="Away"
            status={this.props.bet.expanded ? 'expanded' : 'contracted'}
            screen="MY_BETS"
            result={defaultResult}
            liveMatch={this.props.bet.live}
            bet={this.props.bet}
          />
          <BetButtonSegment
            message={this.props.bet.expanded ? 'Show Less' : 'Show More'}
            showMore={this.toggleStatsBar}
            fixture={this.props.bet.fixture}
            expandBetMenu={this.props.expandBetMenu}
            screen="MY_BETS"
            result={defaultResult}
            live={this.props.bet.live}
          />
        </div>
        <div className={stats()}>
          <div className={expandedSection}>
            <PotValue fixture={this.props.bet.fixture} />
            <StatsBar fixture={this.props.bet.fixture} />
          </div>
        </div>
      </div>
    );
  }
}
