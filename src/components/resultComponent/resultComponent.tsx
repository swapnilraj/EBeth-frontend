import * as React from 'react';
import { types } from 'typestyle';
import { style } from 'typestyle';
import * as crests from '../../Crests.json';
import { defaultMyBet } from '../../reducers/myBetsReducer';
import { BetButtonSegment } from '../bettingFixtureComponent/betButtonSegment';
import { PotValue } from '../bettingFixtureComponent/potValue';
import { StatsBar } from '../bettingFixtureComponent/statsBar';
import { TeamSegment } from '../bettingFixtureComponent/teamSegment';
import { TimeSegment } from '../bettingFixtureComponent/timeSegment';
import { IFixture, IResult, IResultComponent } from '../Results';

interface IProps {
  marginLeft: string;
  fixture: IFixture;
  status: IResultComponent;
  width: string;
  result: IResult;
  toggleStatsBar(id: number);
  expandBetMenu(currentState: string, currentFixture: IFixture);
}

export class ResultComponent extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }

  public handler() {
    this.props.toggleStatsBar(this.props.status.id);
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

    return (
      <div>
        <div className={bettingFixtureComponent()}>
          <TeamSegment
            teamName={this.props.result.homeTeamName}
            crest={'./images' + crests[this.props.result.homeTeamName]}
            team="Home"
            status={this.props.status.status}
            screen="RESULTS"
            result={this.props.result}
            liveMatch={false}
            bet={defaultMyBet}
          />
          <TimeSegment
            startTime={this.props.fixture.time}
            screen="RESULTS"
            result={this.props.result}
            liveMatch={false}
            bet={defaultMyBet}
          />
          <TeamSegment
            teamName={this.props.result.awayTeamName}
            crest={'./images' + crests[this.props.result.awayTeamName]}
            team="Away"
            status={this.props.status.status}
            screen="RESULTS"
            result={this.props.result}
            liveMatch={false}
            bet={defaultMyBet}
          />
          <BetButtonSegment
            message={this.props.status !== undefined ? this.props.status.message : 'none'}
            showMore={this.handler}
            fixture={this.props.fixture}
            expandBetMenu={this.props.expandBetMenu}
            screen="RESULTS"
            result={this.props.result}
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
