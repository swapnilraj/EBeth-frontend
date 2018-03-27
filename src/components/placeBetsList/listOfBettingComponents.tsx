import * as React from 'react';
import { PlaceBetComponent } from './placeBetComponent';

interface IFixture {
  homeTeamName: string;
  awayTeamName: string;
  date: string;
  time: string;
  homeBets: number;
  awayBets: number;
  drawBets: number;
  potValue: number;
}

// interface IFixtureArray {
//     [index: number]: IFixture;
// }

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
  public renderBettingComponents(fixtures) {
    if (this.props.componentStatus[0] !== undefined) {
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

  public componentWillReceiveProps(nextProps) {
    if (nextProps.fixtures && nextProps.fixtures[0] !== this.props.fixtures[0]) {
      // var newIFixtures = nextProps.fixtures;
      // 	for(var i = nextProps.fixtures-1;i>0;i--)
      // 	{
      // 		if(nextProps.fixtures[i].date == newIFixtures[i-1].date )
      // 		{
      // 			newIFixtures[i].date = "";
      // 		}
      // 	}

      if (nextProps.fixtures) {
        for (let i = 0; i < nextProps.fixtures.length; i++) {
          const newComponent = {
            fixture: nextProps.fixtures[i],
            id: i,
            status: 'contracted',
            potValue: 0.0,
            message: 'Show More',
          };

          this.props.addBetComponentToState(newComponent);
        }
      }
    }
  }

  public render() {
    const bettingComponents = this.renderBettingComponents(this.props.fixtures);

    return <div>{bettingComponents}</div>;
  }
}
