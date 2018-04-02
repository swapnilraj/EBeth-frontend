import * as React from 'react';
import { IComponent } from '../../containers/myBetsContainer';
import { IMyBets, IMyBetsState } from '../../reducers/myBetsReducer';

import { /*IResult,*/ IFixture, IResultComponent } from '../Results';
import { MyBetWithDate } from './myBetWithDate';

interface IProps {
  width: string;
  marginLeft: string;
  componentStatus: IMyBetsState[];
  myBets: IMyBets[];
  addBetComponentToState(betComponent: IComponent);
  toggleStatsBar(id: number);
  expandBetMenu(teamname: string, currentIFixture: IFixture);
  updateFixtures(array: IFixture[]);
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
export class ListOfMyBets extends React.Component<IProps, {}> {
  public renderMyBetComponents(myBets: IMyBets[]) {
    // if (this.props.componentStatus[0] === undefined || this.props.myBets[0] !== this.props.componentStatus[0].result) {
    // for (let i = 0; i < results.length; i++) {
    //   const newComponent = { result: defaultResult, id: 0, message: 'Show More', potValue: 0, status: 'expanded' };
    //   newComponent.fixture = results[i];
    //   newComponent.id = i;
    //   newComponent.message = 'Show Details';
    //   newComponent.potValue = results[i].potValue;
    //   newComponent.status = 'contracted';
    //   // this.props.addResultComponentToState(newComponent);
    // }
    // }
    if (this.props.componentStatus[0] === undefined) {
      if (myBets.length > 0) {
        return myBets.map((myBet, index) => (
          <MyBetWithDate
            marginLeft={this.props.marginLeft}
            width={this.props.width}
            fixture={myBet.fixture}
            status={defaultIResultComponent}
            toggleStatsBar={this.props.toggleStatsBar}
            expandBetMenu={this.props.expandBetMenu}
            bet={myBet}
            id={index}
          />
        ));
      } else {
        return [];
      }
    } else {
      return myBets.map((myBet, index /*fixture, index*/) => (
        <MyBetWithDate
          marginLeft={this.props.marginLeft}
          width={this.props.width}
          fixture={defaultFixture}
          status={defaultIResultComponent}
          toggleStatsBar={this.props.toggleStatsBar}
          expandBetMenu={this.props.expandBetMenu}
          bet={myBet}
          id={index}
        />
      ));
    }
  }

  public componentWillMount() {
    if (this.props.myBets !== undefined) {
      for (let i = this.props.myBets.length - 1; i > 0; i--) {
        if (this.props.myBets[i].fixture.date === this.props.myBets[i - 1].fixture.date) {
          this.props.myBets[i].fixture.date = '';
        }
      }
    }
  }

  public render() {
    const resultsComponents = this.renderMyBetComponents(this.props.myBets);

    return <div>{resultsComponents}</div>;
  }
}
