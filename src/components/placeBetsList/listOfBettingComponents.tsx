import * as React from 'react';
import { IFixture } from '../Results';
import { PlaceBetComponent } from './placeBetComponent';

interface IComponent {
  fixture: IFixture;
  id: number;
  status: string;
  potValue: number;
  message: string;
}

interface IStatus {
  id: number;
  fixture: IFixture;
  message: string;
  potValue: number;
  status: string;
}

interface IProps {
  width: string;
  marginLeft: string;
  fixtures: IFixture[];
  componentStatus: IStatus[];
  addBetComponentToState(newComponent: IComponent);
  toggleStatsBar(currentState: string, id: number);
  expandBetMenu(teamname: string, currentIFixture: IFixture);
  updateFixtures(array: IFixture[]);
}

export class ListOfBettingComponents extends React.Component<IProps, {}> {


  public componentWillMount() {
    
  
        for (let i = 0; i < this.props.fixtures.length; i++) {
          const newComponent = {
            fixture: this.props.fixtures[i],
            id: i,
            status: 'contracted',
            potValue: 0.0,
            message: 'Show More',
          };

          this.props.addBetComponentToState(newComponent);
        }
      
    
  }


  public renderBettingComponents(fixtures) {

    if (this.props.componentStatus.length!==0) {
      
    

      if (fixtures.length > 0) {


        return fixtures.map((fixture, index) => (
          <PlaceBetComponent
            marginLeft={this.props.marginLeft}
            width={this.props.width}
            fixture={fixture}
            status={this.props.componentStatus[index]}
            toggleStatsBar={this.props.toggleStatsBar}
            expandBetMenu={this.props.expandBetMenu}
          />
        ));
      } else {
        return [];
      }
    } else {
      if (fixtures.length > 0) {
        const emptyIFixture = {
          homeTeamName: '',
          awayTeamName: '',
          date: '',
          time: '',
          homeBets: 0,
          awayBets: 0,
          drawBets: 0,
          potValue: 0,
          betEvent: '',
        };
        const defaultStatus = { fixture: emptyIFixture, id: 0, message: '', potValue: 0, status: 'contracted' };
        return fixtures.map(fixture => (
          <PlaceBetComponent
            marginLeft={this.props.marginLeft}
            width={this.props.width}
            fixture={fixture}
            status={defaultStatus}
            toggleStatsBar={this.props.toggleStatsBar}
            expandBetMenu={this.props.expandBetMenu}
          />
        ));
      } else {
        return [];
      }
    }
  }

 

  public render() {
    const bettingComponents = this.renderBettingComponents(this.props.fixtures);

    return <div>{bettingComponents}</div>;
  }
}
