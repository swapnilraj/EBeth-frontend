import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { style, types } from 'typestyle';
import { PlaceBetMenu } from '../components/placeBetMenu/placeBetMenu';
import { ListOfBettingComponents } from '../components/placeBetsList/listOfBettingComponents';
import { IFixture } from '../components/Results';
import { getBetInfo, /*getUserBetInfo , */ IBetInfo } from '../ethereum/contract-interaction';
import {
  onSelectTeam,
  onToggleBetMenuDisplay,
  onToggleValidInput,
  onUpdateBetValueInput,
} from '../reducers/betMenuReducer';
import {
  addBetComponentToState,
  IListOfBettingComponentState,
  toggleStatsBarFunc,
  updateBetFixtureList,
} from '../reducers/listOfBettingComponentsReducer';
import { defaultIFixture } from '../reducers/myBetsReducer';
import { fetchAvailableBets, placeBet } from '../stores/contract';
import { IState } from '../stores/root';
import { numToMonth, numToWeekDay } from '../utils/formatDates';
import { renderIf } from '../utils/render-if-else';

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


interface IProps {
  fixtureList: IFixture[];
  width: string;
  marginLeft: string;
  menu: IMenu;
  betComponent: IListOfBettingComponentState;
  betComponentStatus: IComponent[];
  availableBets: string[];
  fetchAvailableBets();
  onUpdateList(array: IFixture[]);
  onNewBetComponentMade(betComponent: IComponent);
  onStatsBarToggle(currentState: string, id: number);
  onToggleBetMenuDisplay(currentState: string, fixture: IFixture);
  onSelectTeam(homeTeamName: string, panelType: string);
  onToggleValidInput();
  onUpdateBetValueInput(newInput: string);
  placeBet(betEvent: string, outcomeIndex: number, value: string);
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

  /*
  This is where the addresses for the available bets is queried.
  This function will get the id of all fixtures we have made available and place in the availableBets array in the redux store
  */
  public componentWillMount() {
    if (this.props.availableBets.length === 0) {
      this.props.fetchAvailableBets();
    }
  }

  /*
    Here the addresses pulled in the above componentWillMount method are converted into a fixture array and pushed back uo
    to the redux store. From there they will distribute details of the available bets to the placeBetsContainer which will
    render a list using this prop info.
  */
  public async componentWillReceiveProps(nextProps) {
    if (nextProps.availableBets.length > 0 && nextProps.betComponent.fixture.length === 0) {
      const promises = nextProps.availableBets.map(await getBetInfo);
      const APIfixtures: IBetInfo[] = (await Promise.all(promises)) as any;
      const fixtureArray: IFixture[] = []; 
      // for loop to iterate over match details and push fixtures to redux store 
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < APIfixtures.length; i++) {
        const tempFixture = Object.assign({},defaultIFixture);
        const APIDate: Date = APIfixtures[i].kickOffTime;
        tempFixture.homeTeamName = APIfixtures[i].outcomeOne;
        tempFixture.awayTeamName = APIfixtures[i].outcomeThree;
        tempFixture.homeBets = APIfixtures[i].poolOne;
        tempFixture.drawBets = APIfixtures[i].poolTwo;
        tempFixture.awayBets = APIfixtures[i].poolThree;
        tempFixture.potValue = APIfixtures[i].totalPool;
        tempFixture.betEvent = this.props.availableBets[i];
        tempFixture.date =  numToWeekDay(APIDate.getDay()) + '   |   ' + APIDate.getDate() + ' ' + numToMonth(APIDate.getMonth());
        const time = APIDate.getHours();
        let formattedTime;
        // convert time to be in 12 hour clock
        if (time > 12) { formattedTime = (time % 12).toString() + ' pm';} 
        else {formattedTime = time.toString() + ' am';}
        tempFixture.time = formattedTime;
        fixtureArray.push(tempFixture);
      }
      /* 
      if the first fixture is different from the fixture of the first betting component, 
      then update the redux store
      */
      if (nextProps.betComponent.fixture[0] !== fixtureArray[0]) {
        this.updateComponentsInList(fixtureArray);
      }
    }
  }
/* 
  function that updates the redux store. Takes in a list of fixtures which it will use to replace 
  store.bettingComponentReducer.fixtures
*/
  public updateComponentsInList(array: IFixture[]) {
    if (this.props.betComponent.fixture[0] !== array[0]) {
      this.props.onUpdateList(array);
    }
  }

  /*
    updates the component list in  store.bettingComponentReducer.componentList. This contains information about
    both the current fixture that a betting component is representing and its state e.g if it is contracted / expanded etc
  */
  public addBetComponentToState(betComponent: IComponent) {
    this.props.onNewBetComponentMade(betComponent);
  }
  /*
    Expands the starts bar when show more / show less is clicked - edits state in reducer
  */
  public toggleStatsBar(currentState: string, id: number) {
    this.props.onStatsBarToggle(currentState, id);
  }
/*
  Expands the bet menu with team select / input field when you click 'place bet' - changes state in reducer
*/
  public expandBetMenu(currentState: string, fixture: IFixture) {
    this.props.onToggleBetMenuDisplay(currentState, fixture);
  }
/*
  updates reducer state when a user selects which team they want to bet on
*/
  public selectTeamToBetOn(homeTeamName: string, panelType: string) {
    this.props.onSelectTeam(homeTeamName, panelType);
  }
/*
  boolean in the store which dictates if the amount entered by the user is a valid input. 
  if user input is invalid, they will not be able to click the 'place bet' button in the place bet menu
*/
  public toggleValidUserInput() {
    this.props.onToggleValidInput();
  }
/*
  updates value in the redux store which contains whatever the user has typed into the input field
*/
  public updateInputValue(newInput: string) {
    this.props.onUpdateBetValueInput(newInput);
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

      const marginTop = style({
       
        marginTop:'3.5em'
      })
    return renderIf(
      this.props.betComponent.fixture.length > 0,
      <div className={placeBetsWrapper()}>
        <div className = {marginTop}>
          <div className={header()} >
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
            screen="PLACE_BETS"
            display={this.props.menu.display}
            fixture={this.props.menu.fixture}
            toggleMenuDisplay={this.expandBetMenu}
            menuState={this.props.menu}
            selectPanel={this.selectTeamToBetOn}
            toggleValidUserInput={this.toggleValidUserInput}
            updateInputValue={this.updateInputValue}
            placeBet={this.props.placeBet}
            changeBet={() => 0}
          />
        </div>
      </div>,
      <h1>loading...</h1>,
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IState>) =>
  bindActionCreators(
    {
      onUpdateList: updateBetFixtureList,
      onNewBetComponentMade: addBetComponentToState,
      onStatsBarToggle: toggleStatsBarFunc,
      onToggleBetMenuDisplay,
      onSelectTeam,
      onToggleValidInput,
      onUpdateBetValueInput,
      fetchAvailableBets,
      placeBet,
    },
    dispatch,
  );

const mapStateToProps = (state: IState) => {
  return {
    betComponent: state.ListOfBettingComponentReducer,
    betComponentStatus: state.ListOfBettingComponentReducer.components,
    menu: state.betMenuReducer,
    availableBets: state.contract.availableBets,
  };
};

export const PlaceBetsContainer = connect(mapStateToProps, mapDispatchToProps)(PlaceBetsComponent);
