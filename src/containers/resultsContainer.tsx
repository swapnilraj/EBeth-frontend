import * as React from 'react';
import { connect } from 'react-redux';
import { style } from 'typestyle';

import { ListOfResults } from '../components/resultComponent/listOfResults';
import { ResultToggleButton } from '../components/resultComponent/resultToggleButton';
import { IFixture, IResult, IResultComponent, ITabState } from '../components/Results';
import {
  onLoadResults,
  onReplaceResults,
  onSwitchTab,
  toggleStatsBar,
  updateResultsComponentList,
} from '../reducers/resultsReducer';

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
  results: IResult[];
  components: IResultComponent[];
  tabState: ITabState;
  onUpdateList(array: IFixture[]);
  onNewBetComponentMade(betComponent: IComponent);
  onStatsBarToggle(currentState: string, id: number);
  onToggleBetMenuDisplay(currentState: string, fixture: IFixture);
  onSelectTeam(homeTeamName: string, panelType: string);
  onToggleValidInput();
  onUpdateBetValueInput(newInput: string);
  onUpdateResultsComponentList(component: IResultComponent);
  onToggleStatsBar(id: number);
  onSwitchTab(tabState: ITabState);
  onLoadResults(currentState: string);
  replaceResults(newResults: IResult[]);
}
class ResultsComponent extends React.Component<IProps, {}> {
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
    this.updateResultsComponentList = this.updateResultsComponentList.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.loadNewResults = this.loadNewResults.bind(this);
  }

  public updateComponentsInList(array: IFixture[]) {
    if (this.props.betComponent.fixture[0] !== array[0]) {
      this.props.onUpdateList(array);
    }
  }

  // tslint:disable-next-line:no-empty
  public updateResults() {}

  public updateResultsComponentList(component: IResultComponent) {
    this.props.onUpdateResultsComponentList(component);
  }

  public addBetComponentToState(betComponent: IComponent) {
    this.props.onNewBetComponentMade(betComponent);
  }

  public toggleStatsBar(id: number) {
    this.props.onToggleStatsBar(id);
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

  public switchTab(tabState: ITabState) {
    this.props.onSwitchTab(tabState);
  }

  public changeResultScreen(currentState: string) {
    this.props.onLoadResults(currentState);
  }

  public loadNewResults(newResults: IResult[]) {
    // tslint:disable-next-line:no-console
    console.log('Spirit');
    // tslint:disable-next-line:no-console
    console.log(this.props);
    this.props.replaceResults(newResults);
  }

  public render() {
    const header = style({
      marginLeft: '0',
      marginRight: '0',
      height: '4em',
    });

    const heading = style({
      height: '100%',
      width: '20%',
      marginLeft: '2.5%',
      fontSize: '2.5em',
      color: 'rgb(251, 98, 53)',
      float: 'left',
      position: 'relative',
    });

    const centerText = style({
      margin: 0,
      position: 'absolute',
      top: '50%',
      marginRight: '-50%',
      transform: 'translate(0%, -50%)',
      fontSize: '.8em',
    });

    const headingWrapper = style({
      height: '100%',
      width: '100%',
      position: 'relative',
    });

    return (
      <div>
        <div className={header}>
          <div className={heading}>
            <div className={headingWrapper}>
              <div className={centerText}>Results</div>
            </div>
          </div>
          <ResultToggleButton
            tabState={this.props.tabState}
            currentDisplay=""
            switchTab={this.switchTab}
            loadNewResults={this.props.onLoadResults}
          />
        </div>
        <ListOfResults
          width="95%"
          marginLeft="0%"
          results={this.props.results}
          componentStatus={this.props.components}
          addResultComponentToState={this.updateResultsComponentList}
          toggleStatsBar={this.toggleStatsBar}
          expandBetMenu={this.expandBetMenu}
          updateResults={this.updateResults}
          replaceResults={this.loadNewResults}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  onUpdateResultsComponentList: updateResultsComponentList,
  onToggleStatsBar: toggleStatsBar,
  onSwitchTab,
  onLoadResults,
  replaceResults: onReplaceResults,
};

const mapStateToProps = state => {
  return {
    results: state.ResultsReducer.results,
    components: state.ResultsReducer.components,
    tabState: state.ResultsReducer.tabState,
  };
};

export const ResultsContainer = connect(mapStateToProps, mapDispatchToProps)(ResultsComponent);
