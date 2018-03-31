import * as React from 'react';
import { IFixture } from '../PlaceBets';
import { IResult, IResultComponent } from '../Results';
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

export const defaultResult = {
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
export const defaultIResultComponent: IResultComponent = {
  result: defaultResult,
  id: 0,
  status: 'contracted',
  potValue: 0,
  message: '',
};
export class ListOfResults extends React.Component<IProps, {}> {
  public renderBettingComponents(results: IResult[]) {
    if (this.props.componentStatus[0] === undefined || this.props.results[0] !== this.props.componentStatus[0].result) {
      for (let i = 0; i < results.length; i++) {
        const newComponent = { result: defaultResult, id: 0, message: 'Show More', potValue: 0, status: 'expanded' };
        newComponent.result = results[i];
        newComponent.id = i;
        newComponent.message = 'Show Details';
        newComponent.potValue = results[i].potValue;
        newComponent.status = 'contracted';
        this.props.addResultComponentToState(newComponent);
      }
    }
    if (this.props.componentStatus[0] === undefined) {
      if (results.length > 0) {
        return results.map(result => (
          <ResultWithDate
            marginLeft={this.props.marginLeft}
            width={this.props.width}
            fixture={defaultFixture}
            status={defaultIResultComponent}
            toggleStatsBar={this.props.toggleStatsBar}
            expandBetMenu={this.props.expandBetMenu}
            result={result}
          />
        ));
      } else {
        return [];
      }
    } else {
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
    }
  }

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
