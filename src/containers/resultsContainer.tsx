import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { style } from 'typestyle';
import { ListOfResults } from '../components/resultComponent/listOfResults';
import { ResultToggleButton } from '../components/resultComponent/resultToggleButton';
import { defaultResult, IFixture, IResult, IResultComponent, ITabState } from '../components/Results';
import { getBetInfo, getUserBetInfo , IBetInfo, IUserBetInfo } from '../ethereum/contract-interaction';
import { IMyBets, onPopulateMyBets } from '../reducers/myBetsReducer';
import {
  onLoadResults,
  onReplaceResults,
  onSwitchTab,
  toggleStatsBar,
  updateResultsComponentList,
} from '../reducers/resultsReducer';
import { fetchPlacedBets, fetchResultsBet } from '../stores/contract';
import { IState } from '../stores/root';
import { Outcome } from '../utils/constants';
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
  resultBets: string[],
  components: IResultComponent[];
  tabState: ITabState;
  resultsFetched:boolean;
  fetchResultsBet();
  fetchPlacedBets();
  // onUpdateList(array: IFixture[]);
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
  onPopulateMyBets(newBets: IMyBets[]);
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

  public componentWillMount() {
    // tslint:disable-next-line:no-console
    if (this.props.resultBets.length === 0) {
      this.props.fetchResultsBet();
     this.props.fetchPlacedBets();
    }
  }

  public async componentWillReceiveProps(nextProps) {
    
    if (nextProps.resultBets.length > 0 && this.props.results.length===0 && this.props.resultsFetched===false){ // } && nextProps.betComponent.fixture.length === 0) {

      const promises = nextProps.resultBets.map(await getBetInfo);
      const APIfixtures: IBetInfo[] = (await Promise.all(promises)) as any;
      // const promisesUser = nextProps.resultBets.map(await getUserBetInfo);
      // const APIfixturesUser: IBetInfo[] = (await Promise.all(promisesUser)) as any;
      const myBetspromises = nextProps.placedBets.map(await getBetInfo);
      const APIMyBets: IBetInfo[] = (await Promise.all(myBetspromises)) as any;
      const promisesUser = nextProps.placedBets.map(await getUserBetInfo);
      const userBetInfo: IUserBetInfo[] = (await Promise.all(promisesUser)) as any;

      const myBetsArray :IMyBets[] = [];
      // tslint:disable-next-line:prefer-for-of
      for(let i = 0;i<userBetInfo.length;i++)
      {

        const tempFixture:IFixture = {
          homeTeamName: '',
          awayTeamName: '',
          date: '',
          time: '',
          homeBets: 0,
          awayBets: 0,
          drawBets: 0,
          potValue: 0,
          betEvent: '',
        }
        const APIDate: Date = APIMyBets[i].kickOffTime;
        tempFixture.homeTeamName = APIMyBets[i].outcomeOne;
        tempFixture.awayTeamName = APIMyBets[i].outcomeThree;
        tempFixture.homeBets = APIMyBets[i].poolOne;
        tempFixture.drawBets = APIMyBets[i].poolTwo;
        tempFixture.awayBets = APIMyBets[i].poolThree;
        tempFixture.potValue = APIMyBets[i].totalPool;
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

        const newBet: IMyBets = {
          fixture: tempFixture,
          expanded: false,
          live: false,
          betValue: 0,
          betPlacedOn: '',
        };
        newBet.fixture = tempFixture;
        newBet.betValue = userBetInfo[i].amount;
        newBet.betPlacedOn = Outcome[userBetInfo[i].outcomeIndex];

        myBetsArray.push(newBet);
      }
 
      this.props.onPopulateMyBets(myBetsArray);
     
      const resultArray: IResult[] = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < APIfixtures.length; i++) {
        const tempFixture:IFixture = {
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
        tempFixture.betEvent = nextProps.placedBets[i];
        tempFixture.homeTeamName = APIfixtures[i].outcomeOne;
        tempFixture.awayTeamName = APIfixtures[i].outcomeThree;
        tempFixture.homeBets = APIfixtures[i].poolOne;
        tempFixture.drawBets = APIfixtures[i].poolTwo;
        tempFixture.awayBets = APIfixtures[i].poolThree;
        tempFixture.potValue = APIfixtures[i].totalPool;
        // tempFixture.score = APIfixtures[i].teamOneScore + ' - '+APIfixtures[i].teamTwoScore;
        tempFixture.date = numToWeekDay(APIDate.getDay()) + '   |   ' + APIDate.getDate() + ' ' + numToMonth(APIDate.getMonth());
        const time = APIDate.getHours();
        let formattedTime;
        if (time > 12) {
          formattedTime = (time % 12).toString() + ' pm';
        } else {
          formattedTime = time.toString() + ' am';
        }
        tempFixture.time = formattedTime;
       
         const myBetIndex = this.determineIndexOfResultInMyBets(tempFixture,myBetsArray)
        if(myBetIndex!==-1){
     
          const newResult:IResult = defaultResult
          newResult.amountWon = myBetsArray[myBetIndex].betValue;
          newResult.awayTeamBets = tempFixture.awayBets;
          newResult.awayTeamName = tempFixture.awayTeamName;
          newResult.date = tempFixture.date;
          newResult.drawBets  = tempFixture.drawBets;
          newResult.homeTeamBets = tempFixture.homeBets;
          newResult.homeTeamName = tempFixture.homeTeamName;
          newResult.potValue = tempFixture.potValue;
          newResult.resultForUser = Outcome[APIfixtures[i].winningIndex]  === myBetsArray[myBetIndex].betPlacedOn?'win':'lose',
          newResult.score = APIfixtures[i].teamOneScore+' - '+APIfixtures[myBetIndex].teamTwoScore,
          newResult.teamOfUser = myBetsArray[myBetIndex].betPlacedOn;
          newResult.winningTeamStatus = Outcome[APIfixtures[i].winningIndex]
          resultArray.push(newResult);
        }
        else
        {
          const newResult:IResult = defaultResult
          newResult.amountWon = 0;
          newResult.awayTeamBets = tempFixture.awayBets;
          newResult.awayTeamName = tempFixture.awayTeamName;
          newResult.date = tempFixture.date;
          newResult.drawBets  = tempFixture.drawBets;
          newResult.homeTeamBets = tempFixture.homeBets;
          newResult.homeTeamName = tempFixture.homeTeamName;
          newResult.potValue = tempFixture.potValue;
          newResult.resultForUser = 'none',
          newResult.score = APIfixtures[i].teamOneScore+' - '+APIfixtures[i].teamTwoScore,
          newResult.teamOfUser = 'none';
          newResult.winningTeamStatus = Outcome[APIfixtures[i].winningIndex]
          resultArray.push(newResult);
        }
        // const newResult :IResult= {}
        // newResult.
        // resultArray.push(tempFixture);
      }
    
      
        this.loadNewResults(resultArray);
      // }
    }
  }


  public determineIndexOfResultInMyBets(fixture:IFixture,myBets:IMyBets[])
  {
    for(let i = 0;i<myBets.length;i++)
    {
      if(myBets[i].fixture ===fixture)
      {
        return i;
      }
    }
    return -1;
  }

  public updateComponentsInList(array: IFixture[]) {
    if (this.props.betComponent.fixture[0] !== array[0]) {
     // this.props.onUpdateList(array);
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
      fontSize: '3em',
      fontWeight:'bold',
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

    return renderIf(
      this.props.resultsFetched===true ,
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
          results={this.props.results || []}
          componentStatus={this.props.components}
          addResultComponentToState={this.updateResultsComponentList}
          toggleStatsBar={this.toggleStatsBar}
          expandBetMenu={this.expandBetMenu}
          updateResults={this.updateResults}
          replaceResults={this.loadNewResults}
        />
      </div>,
      <h1>Loading ...</h1>
    
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IState>) =>
  bindActionCreators({
  
    fetchPlacedBets,
    fetchResultsBet,
    onUpdateResultsComponentList: updateResultsComponentList,
    onToggleStatsBar: toggleStatsBar,
    onSwitchTab,
    onLoadResults,
    replaceResults: onReplaceResults,
    onPopulateMyBets
  },
    dispatch,
  );

const mapStateToProps = (state: IState) => {
  return {
    results: state.ResultsReducer.results,
    resultsFetched: state.ResultsReducer.resultsFetched,
    placedBets: state.contract.placedBets,
    resultBets: state.contract.resultBets,
    components: state.ResultsReducer.components,
    tabState: state.ResultsReducer.tabState,
    userBets: state.MyBetsReducer.userBets,

  };
};

export const ResultsContainer = connect(mapStateToProps, mapDispatchToProps)(ResultsComponent);
