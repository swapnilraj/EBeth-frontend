import * as React from 'react';
import { connect } from 'react-redux';
import { style } from 'typestyle';
import { types } from 'typestyle';
import { PlaceBetMenu } from '../components/placeBetMenu/placeBetMenu';
import { ListOfBettingComponents } from '../components/placeBetsList/listOfBettingComponents';
import {
  onSelectTeam,
  onToggleBetMenuDisplay,
  onToggleValidInput,
  onUpdateBetValueInput,
} from '../reducers/betMenuReducer';
import {
  addBetComponentToState,
  toggleStatsBarFunc,
  updateBetFixtureList,
} from '../reducers/listOfBettingComponentsReducer';

export interface IFixture {
  homeTeamName: string;
  awayTeamName: string;
  date: string;
  time: string;
  homeBets: number;
  awayBets: number;
  drawBets: number;
  potValue: number;
}

interface ISelected {
  selectTeam: string;
  selectedTab: string;
  validBetAmount: boolean;
  betInputValue: string;
}

interface IMenu {
  display: string;
  selected: ISelected;
  fixture: IFixture;
}

interface IComponent {
  fixture: IFixture;
  id: number;
  status: string;
  potValue: number;
  message: string;
}

interface IBetComponent {
  fixture: IFixture[];
  components: IComponent[];
}

interface IProps {
  fixtureList: IFixture[];
  width: string;
  marginLeft: string;
  menu: IMenu;
  betComponent: IBetComponent;
  betComponentStatus: IComponent[];
  onUpdateList(array: IFixture[]);
  onNewBetComponentMade(betComponent: IComponent);
  onStatsBarToggle(currentState: string, id: number);
  onToggleBetMenuDisplay(currentState: string, fixture: IFixture);
  onSelectTeam(homeTeamName: string, panelType: string);
  onToggleValidInput();
  onUpdateBetValueInput(newInput: string);
}
class PlaceBetsComponent extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);

    this.state = {
      display: 'hide',
      fixture: {},
    };

    this.updateComponentsInList = this.updateComponentsInList.bind(this);
    this.addBetComponentToState = this.addBetComponentToState.bind(this);
    this.toggleStatsBar = this.toggleStatsBar.bind(this);
    this.expandBetMenu = this.expandBetMenu.bind(this);
    this.selectTeamToBetOn = this.selectTeamToBetOn.bind(this);
    this.toggleValidUserInput = this.toggleValidUserInput.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  public updateComponentsInList(array: IFixture[]) {
    if (this.props.betComponent.fixture[0] !== array[0]) {
      this.props.onUpdateList(array);
    }
  }

  public addBetComponentToState(betComponent: IComponent) {
    this.props.onNewBetComponentMade(betComponent);
  }

  public toggleStatsBar(currentState: string, id: number) {
    this.props.onStatsBarToggle(currentState, id);
  }

  public expandBetMenu(currentState: string, fixture: IFixture) {
    this.props.onToggleBetMenuDisplay(currentState, fixture);
  }

  public selectTeamToBetOn(homeTeamName: string, panelType: string) {
    this.props.onSelectTeam(homeTeamName, panelType);
  }

  public toggleValidUserInput() {
    this.props.onToggleValidInput();
  }

  public updateInputValue(newInput: string) {
    this.props.onUpdateBetValueInput(newInput);
  }

  public componentWillReceiveProps(nextProps) {
    if (nextProps.fixtureList) {
      this.updateComponentsInList(this.props.fixtureList);
    }
  }

  public render() {
    const dynamicHeader = {
      true: {
        width: this.props.width,
      },
      false: {
        width: '80%',
      },
    };

    const header = () =>
      style({
        height: '3.5em',
        width: dynamicHeader[this.props.width !== undefined ? 'true' : 'false'].width,
        position: 'relative',
        margin: '1.5em auto',
        left: this.props.marginLeft,
      });

    const heading = style({
      fontSize: '2.5em',
      position: 'absolute',
      color: 'rgb(251, 98, 53)',
      fontWeight: 'bold',
    });

    const makeBetMenuClicked = {
      true: {
        overflow: 'auto',
      },
      false: {
        overflow: 'hidden',
      },
    };

    const placeBetsWrapper = () =>
      style({
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        overflow: makeBetMenuClicked[this.props.menu.display === 'hide' ? 'true' : 'false']
          .overflow as types.CSSOverflow,
        width: '100%',
      });

    if (this.props.fixtureList) {
      this.updateComponentsInList(this.props.fixtureList);
    }

    return (
      <div className={placeBetsWrapper()}>
        <div>
          <div className={header()} onClick={() => this.toggleValidUserInput()}>
            <div className={heading}>Place Bets</div>
          </div>
          <ListOfBettingComponents
            width={this.props.width}
            fixtures={this.props.betComponent.fixture}
            addBetComponentToState={this.addBetComponentToState}
            componentStatus={this.props.betComponentStatus}
            toggleStatsBar={this.toggleStatsBar}
            expandBetMenu={this.expandBetMenu}
            updateFixtures={this.updateComponentsInList}
            marginLeft={this.props.marginLeft}
          />
          <PlaceBetMenu
            display={this.props.menu.display}
            fixture={this.props.menu.fixture}
            toggleMenuDisplay={this.expandBetMenu}
            menuState={this.props.menu}
            selectPanel={this.selectTeamToBetOn}
            toggleValidUserInput={this.toggleValidUserInput}
            updateInputValue={this.updateInputValue}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onUpdateList: updateBetFixtureList,
  onNewBetComponentMade: addBetComponentToState,
  onStatsBarToggle: toggleStatsBarFunc,
  onToggleBetMenuDisplay,
  onSelectTeam,
  onToggleValidInput,
  onUpdateBetValueInput,
};

const mapStateToProps = state => {
  return {
    betComponent: state.ListOfBettingComponentReducer,
    betComponentStatus: state.ListOfBettingComponentReducer.components,
    menu: state.betMenuReducer,
  };
};

export const PlaceBetsContainer = connect(mapStateToProps, mapDispatchToProps)(PlaceBetsComponent);
