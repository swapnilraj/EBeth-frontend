import * as React from 'react';
import { types } from 'typestyle';
import { style } from 'typestyle';
import * as crests from '../../Crests.json';
import { defaultMyBet } from '../../reducers/myBetsReducer';
import { IFixture } from '../Results';
import { BetButtonSegment } from './betButtonSegment';
import { PotValue } from './potValue';
import { StatsBar } from './statsBar';
import { TeamSegment } from './teamSegment';
import { TimeSegment } from './timeSegment';

interface IProps {
  marginLeft: string;
  fixture: IFixture;
  status: IStatus;
  width: string;
  toggleStatsBar(currentStatus: string, id: number);
  expandBetMenu(currentState: string, currentFixture: IFixture);
}

interface IStatus {
  id: number;
  fixture: IFixture;
  message: string;
  potValue: number;
  status: string;
}

export class BettingFixtureComponent extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }

  public handler() {
    this.props.toggleStatsBar(this.props.status.status, this.props.status.id);
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
        display: dynamicStats[this.props.status.status].display,
      });

    const expandedSection = style({
      height: '100%',
      width: '75%',
      position: 'relative',
    });

    const defaultResult = {
      homeTeamName: '',
      awayTeamName: '',
      winningTeamStatus: '',
      date: '',
      score: '',
      resultForUser: '',
      teamOfUser: '',
      amountWon: 0,
      potValue: 0,
      homeTeamBets: 0,
      awayTeamBets: 0,
      drawBets: 0,
      yourBetValue: 0,
    };

    return (
      <div>
        <div className={bettingFixtureComponent()}>
          <TeamSegment
            teamName={this.props.fixture.homeTeamName}
            crest={'./images' + crests[this.props.fixture.homeTeamName]}
            team="Home"
            status={this.props.status.status}
            screen="PLACE_BETS"
            result={defaultResult}
            liveMatch={false}
            bet={defaultMyBet}
          />
          <TimeSegment
            startTime={this.props.fixture.time}
            screen="PLACE_BETS"
            result={defaultResult}
            liveMatch={false}
            bet={defaultMyBet}
          />
          <TeamSegment
            teamName={this.props.fixture.awayTeamName}
            crest={'./images' + crests[this.props.fixture.awayTeamName]}
            team="Away"
            status={this.props.status.status}
            screen="PLACE_BETS"
            result={defaultResult}
            liveMatch={false}
            bet={defaultMyBet}
          />
          <BetButtonSegment
            message={this.props.status.message}
            showMore={this.handler}
            fixture={this.props.fixture}
            expandBetMenu={this.props.expandBetMenu}
            screen="PLACE_BETS"
            result={defaultResult}
            live={false}
          />
        </div>
        <div className={stats()}>
          <div className={expandedSection}>
            <PotValue fixture={this.props.fixture} />
            <StatsBar fixture={this.props.fixture} />
          </div>
        </div>
      </div>
    );
  }
}
