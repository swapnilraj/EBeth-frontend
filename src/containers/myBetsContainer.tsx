import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { style, types } from 'typestyle';
import { ListOfMyBets } from '../components/myBets/listOfMyBets';
import { PlaceBetMenu } from '../components/placeBetMenu/placeBetMenu';
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
import { IMyBets, toggleStatsStatus, onPopulateMyBets } from '../reducers/myBetsReducer';
// import { onToggleStatsBar } from '../reducers/resultsReducer';
<<<<<<< Updated upstream
import { fetchAvailableBets } from '../stores/contract';
=======
import { changeBet, fetchPlacedBets, fetchUserAccount } from '../stores/contract';
>>>>>>> Stashed changes
import { IState } from '../stores/root';
// import {formatDate , IFormatDate} from '../utils/formatDates'
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

export interface IComponent {
  fixture: IFixture;
  id: number;
  status: string;
  potValue: number;
  message: string;
}

// interface IBetComponent {
//   fixture: IFixture[];
//   components: IComponent[];
// }

interface IProps {
  fixtureList: IFixture[];
  width: string;
  marginLeft: string;
  menu: IMenu;
  betComponent: IListOfBettingComponentState;
  betComponentStatus: IComponent[];
  availableBets: string[];
  placedBets: string[];
  userBets: IMyBets[];
  userAccount: string;
  // fetchAvailableBets();
  fetchUserAccount();
  fetchPlacedBets(userAccount: string);
  onUpdateList(array: IFixture[]);
  onNewBetComponentMade(betComponent: IComponent);
  onStatsBarToggle(currentState: string, id: number);
  onToggleBetMenuDisplay(currentState: string, fixture: IFixture);
  onSelectTeam(homeTeamName: string, panelType: string);
  onToggleValidInput();
  onUpdateBetValueInput(newInput: string);
  onToggleStatus(id: number);
<<<<<<< Updated upstream
=======
  onPopulateMyBets(newBets: IMyBets[]);
  changeBet(betEvent: string, outcomeIndex: number);
>>>>>>> Stashed changes
}
class MyBetsComponent extends React.Component<IProps, {}> {
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
    this.onPopulateMyBets = this.onPopulateMyBets.bind(this);
  }

  public componentWillMount() {
    // tslint:disable-next-line:no-console

    if (this.props.placedBets.length === 0) {
      this.props.fetchUserAccount();
      this.props.fetchPlacedBets(this.props.userAccount);
    }
  }

  public async componentWillReceiveProps(nextProps) {
    if (nextProps.placedBets.length > 0 && nextProps.betComponent.fixture.length === 0) {
      const promises = nextProps.placedBets.map(await getBetInfo);
      console.log(this.props.placedBets);
      const APIfixtures: IBetInfo[] = (await Promise.all(promises)) as any;
      console.log(APIfixtures);

      const fixtureArray: IFixture[] = [];
      // const myBets: IMyBets[] = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < APIfixtures.length; i++) {
        const tempFixture = {
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
        const APIDate: Date = APIfixtures[i].kickOffTime;
        tempFixture.homeTeamName = APIfixtures[i].outcomeOne;
        tempFixture.awayTeamName = APIfixtures[i].outcomeThree;
        tempFixture.homeBets = APIfixtures[i].poolOne;
        tempFixture.awayBets = APIfixtures[i].poolTwo;
        tempFixture.drawBets = APIfixtures[i].poolThree;
        tempFixture.potValue = APIfixtures[i].totalPool;
        tempFixture.date =
          numToWeekDay(APIDate.getDay()) + '   |   ' + APIDate.getDate() + ' ' + numToMonth(APIDate.getMonth());
        const time = APIDate.getHours();
        let formattedTime;
        if (time > 12) {
          formattedTime = (time % 12).toString() + ' pm';
        } else {
          formattedTime = time.toString() + ' am';
        }
        tempFixture.time = formattedTime;
        fixtureArray.push(tempFixture);

        // const newBet : IMyBets= {
        //   fixture:tempFixture,
        //   expanded:false,
        //   live:false,

        // }
      }
     
      console.log(fixtureArray[0]);
      console.log(nextProps.betComponent.fixture[0]);
      if (nextProps.betComponent.fixture[0] !== fixtureArray[0]) {
        console.log('called');
        this.updateComponentsInList(fixtureArray);
      }
    }
  }

  public onPopulateMyBets(newBets: IMyBets[]) {
    this.props.onPopulateMyBets(newBets);
  }

  public updateComponentsInList(array: IFixture[]) {
    console.log('UPDATE1');
    if (this.props.betComponent.fixture[0] !== array[0]) {
      console.log('UPDATE2');
      this.props.onUpdateList(array);
    }
  }

  public addBetComponentToState(betComponent: IComponent) {
    this.props.onNewBetComponentMade(betComponent);
  }

  // tslint:disable-next-line:no-empty
  public toggleStatsBar(id: number) {
    this.props.onToggleStatus(id);
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

    const myBetsWrapper = () =>
      style({
        position: 'absolute',
        top: '4%',
        bottom: '0',
        left: '0',
        right: '0',
        overflow: makeBetMenuClicked[this.props.menu.display === 'hide' ? 'true' : 'false']
          .overflow as types.CSSOverflow,
        width: '100%',
      });

    // const array:IFixture[] = []
    return renderIf(
      this.props.placedBets.length > 0,
      <div className={myBetsWrapper()}>
        <div>
          <div className={header()} onClick={() => this.toggleValidUserInput()}>
            <div className={heading}>My Bets</div>
          </div>
          <ListOfMyBets
            width={this.props.width}
            addBetComponentToState={this.addBetComponentToState}
            componentStatus={[]}
            toggleStatsBar={this.toggleStatsBar}
            expandBetMenu={this.expandBetMenu}
            updateFixtures={this.updateComponentsInList}
            marginLeft={this.props.marginLeft}
            myBets={this.props.userBets}
          />
          <PlaceBetMenu
            screen="MY_BETS"
            display={this.props.menu.display}
            fixture={this.props.menu.fixture}
            toggleMenuDisplay={this.expandBetMenu}
            menuState={this.props.menu}
            selectPanel={this.selectTeamToBetOn}
            toggleValidUserInput={this.toggleValidUserInput}
            updateInputValue={this.updateInputValue}
            placeBet={() => 0}
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
      fetchPlacedBets,
      fetchUserAccount,
      onToggleStatus: toggleStatsStatus,
<<<<<<< Updated upstream
=======
      onPopulateMyBets: onPopulateMyBets,
      changeBet,
>>>>>>> Stashed changes
    },
    dispatch,
  );

const mapStateToProps = (state: IState) => {
  return {
    // availableBets: state.contract.availableBets,
    placedBets: state.contract.placedBets,
    userAccount: state.contract.userAccount,
    betComponent: state.MyBetsReducer,
    betComponentStatus: state.ListOfBettingComponentReducer.components,
    menu: state.betMenuReducer,
    userBets: state.MyBetsReducer.userBets,
  };
};

export const MyBetsContainer = connect(mapStateToProps, mapDispatchToProps)(MyBetsComponent);
