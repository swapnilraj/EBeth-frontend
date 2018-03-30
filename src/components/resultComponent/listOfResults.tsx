import * as React from 'react';
import { IFixture } from '../PlaceBets';
import { defaultResult, IResult, IResultComponent } from '../Results';
import { ResultWithDate } from './resultWithDate';

interface IProps {
  width: string;
  marginLeft: string;
  componentStatus: IResultComponent[];
  results: IResult[];
  addResultComponentToState(component: IResultComponent);
  toggleStatsBar(id: number);
  expandBetMenu(teamname: string, currentIFixture: IFixture);
  updateResults();
}

const defaultFixture = {
  homeTeamName: '',
  awayTeamName: '',
  date: '',
  time: '',
  homeBets: 0,
  awayBets: 0,
  drawBets: 0,
  potValue: 0,
};

export class ListOfResults extends React.Component<IProps, {}> {
  public renderBettingComponents(results: IResult[]) {
    for (let i = 0; i < results.length; i++) {
      const newComponent = { result: defaultResult, id: 0, message: 'Show More', potValue: 0, status: 'expanded' };
      newComponent.result = results[i];
      newComponent.id = i;
      newComponent.message = 'Show Details';
      newComponent.potValue = results[i].potValue;
      newComponent.status = 'contracted';
      this.props.addResultComponentToState(newComponent);
    }

    // if (this.props.componentStatus[0] !== undefined) {
    if (results.length > 0) {
      return results.map((result, index) => (
        <ResultWithDate
          marginLeft={this.props.marginLeft}
          width={this.props.width}
          fixture={defaultFixture}
          status={this.props.componentStatus[index]}
          toggleStatsBar={this.props.toggleStatsBar}
          expandBetMenu={this.props.expandBetMenu}
          result={result}
        />
      ));
    } else {
      return [];
    }
  }
  //   }
  // } else {
  //   if (results.length === 0) {
  //     const emptyIRecord = {
  //         homeTeamName:'',
  //         awayTeamName:'',
  //         winningTeamStatus: '',
  //         date:'',
  //         score:'',
  //         resultForUser:'',
  //         amountWon:0,
  //         potValue:0,
  //         homeTeamBets:0,
  //         awayTeamBets:0,
  //         drawBets:0,
  //         yourBetValue:0,

  //     };

  //         const defaultStatus = { fixture: defaultFixture, id: 0, message: '', potValue: 0, status: 'contracted' };
  //         return (
  //           <ResultWithDate
  //             marginLeft={this.props.marginLeft}
  //             width={this.props.width}
  //             fixture={defaultFixture}
  //             status={defaultStatus}
  //             toggleStatsBar={this.props.toggleStatsBar}
  //             expandBetMenu={this.props.expandBetMenu}
  //             result = {emptyIRecord}
  //           />
  //         );
  //       } else {
  //         return [];
  //       }
  //     }
  //   }

  //  public componentWillReceiveProps(nextProps) {
  // if (nextProps.fixtures && nextProps.fixtures[0] !== this.props.fixtures[0]) {

  // *****   mustRevisit!! make store for results components
  //   if (nextProps.results) {
  //     for (let i = 0; i < nextProps.fixtures.length; i++) {
  //       const newComponent = {
  //         fixture: nextProps.fixtures[i],
  //         id: i,
  //         status: 'contracted',
  //         potValue: 0.0,
  //         message: 'Show More',
  //       };

  //       this.props.addBetComponentToState(newComponent);
  //     }
  //   }
  // }
  // }

  public componentWillMount() {
    if (this.props.results !== undefined) {
      for (let i = this.props.results.length - 1; i > 0; i--) {
        if (this.props.results[i].date === this.props.results[i - 1].date) {
          this.props.results[i].date = '';
        }
      }
    }
  }

  public render() {
    const resultsComponents = this.renderBettingComponents(this.props.results);

    return <div>{resultsComponents}</div>;
  }
}
