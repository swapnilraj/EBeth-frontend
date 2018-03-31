import { IResult, IResultComponent } from '../components/Results';

// ***********************__ACTIONS__*****************************

interface IAddResultsComponentToState {
  type: 'addResultsComponentToState';
  payload: {
    componentList: any;
  };
}
export const addResultsComponentToState: IAddResultsComponentToState['type'] = 'addResultsComponentToState';
export const updateResultsComponentList = (newComponent: IAddResultsComponentToState['payload']['componentList']) => {
  return {
    type: addResultsComponentToState,
    payload: {
      componentList: newComponent,
    },
  };
};

interface IToggleStatsBar {
  type: 'onToggleStatsBar';
  payload: {
    id: number;
  };
}
export const onToggleStatsBar: IToggleStatsBar['type'] = 'onToggleStatsBar';
export const toggleStatsBar = componentId => {
  // tslint:disable-next-line:no-console

  return {
    type: onToggleStatsBar,
    payload: {
      id: componentId,
    },
  };
};

// ***********************__ACTIONS__*****************************
// ***********************__REDUCERS__*****************************

const sampleResult1 = {
  homeTeamName: 'Arsenal',
  awayTeamName: 'Watford City',
  winningTeamStatus: 'Away',
  date: 'Wednesday | December 18th',
  score: '2  -  3',
  resultForUser: 'win',
  teamOfUser: 'Away',
  amountWon: 0.7,
  potValue: 10,
  homeTeamBets: 100,
  awayTeamBets: 200,
  drawBets: 70,
  yourBetValue: 0.12,
};

const sampleResult2 = {
  homeTeamName: 'Newcastle United',
  awayTeamName: 'Spurs',
  winningTeamStatus: 'Draw',
  date: 'Thursday | December 19th',
  score: '1  -  1',
  resultForUser: 'lose',
  teamOfUser: 'Away',
  amountWon: 0.222,
  potValue: 10,
  homeTeamBets: 100,
  awayTeamBets: 200,
  drawBets: 70,
  yourBetValue: 0.12,
};

const sampleResult3 = {
  homeTeamName: 'Manchester United',
  awayTeamName: 'Manchester City',
  winningTeamStatus: 'Home',
  date: 'Thursday | December 19th',
  score: '4  -  1',
  resultForUser: 'win',
  teamOfUser: 'Home',
  amountWon: 0.8,
  potValue: 10,
  homeTeamBets: 100,
  awayTeamBets: 200,
  drawBets: 70,
  yourBetValue: 0.12,
};

const sampleResult4 = {
  homeTeamName: 'Crystal Palace',
  awayTeamName: 'West Ham United',
  winningTeamStatus: 'Away',
  date: 'Friday | December 20th',
  score: '2  -  3',
  resultForUser: 'lose',
  teamOfUser: 'Home',
  amountWon: 0.6,
  potValue: 10,
  homeTeamBets: 100,
  awayTeamBets: 200,
  drawBets: 70,
  yourBetValue: 0.12,
};

const array = [sampleResult1, sampleResult2, sampleResult3, sampleResult4];

export type ResultComponentActions = IAddResultsComponentToState | IToggleStatsBar;

export interface IListOfResultsComponentState {
  results: IResult[];
  components: IResultComponent[];
  tab: string;
}

export const defaultListOfResultComponentState: IListOfResultsComponentState = {
  results: array,
  components: [],
  tab: 'myBets',
};

export const ResultsReducer = (state = defaultListOfResultComponentState, action) => {
  switch (action.type) {
    case addResultsComponentToState:
      return { ...state, components: state.components.concat(action.payload.componentList) };

    case onToggleStatsBar:
      const currentStateOfBars = Object.assign({}, state);
      const copyOfComponentsArray = currentStateOfBars.components.concat();
      const replacement = { components: copyOfComponentsArray };
      if (replacement.components[action.payload.id].status === 'expanded') {
        replacement.components[action.payload.id].status = 'contracted';
      } else {
        replacement.components[action.payload.id].status = 'expanded';
      }

      return Object.assign({}, state, replacement);
    default:
      return state;
  }
};

// ***********************__REDUCERS__*****************************
