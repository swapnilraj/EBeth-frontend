import { IResult } from '../components/Results';

// ***********************__ACTIONS__*****************************
interface IUpdateBetFixture {
  type: 'updateFixtureList';
  payload: {
    componentList: any;
  };
}
export const updateFixtureList: IUpdateBetFixture['type'] = 'updateFixtureList';
export const updateBetFixtureList = (_array: IUpdateBetFixture['payload']['componentList']) => {
  return {
    type: updateFixtureList,
    payload: {
      componentList: _array,
    },
  };
};

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
export const toggleStatsBar = (componentId: IToggleStatsBar['payload']['id']) => {
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
  winningTeamStatus: '',
  date: 'Wednesday | December 18th',
  score: '2  -  3',
  resultForUser: 'win',
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
  winningTeamStatus: '',
  date: 'Thursday | December 19th',
  score: '1  -  1',
  resultForUser: 'lose',
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
  winningTeamStatus: '',
  date: 'Thursday | December 19th',
  score: '4  -  1',
  resultForUser: 'win',
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
  winningTeamStatus: '',
  date: 'Friday | December 20th',
  score: '2  -  3',
  resultForUser: 'lose',
  amountWon: 0.6,
  potValue: 10,
  homeTeamBets: 100,
  awayTeamBets: 200,
  drawBets: 70,
  yourBetValue: 0.12,
};

const array = [sampleResult1, sampleResult2, sampleResult3, sampleResult4];

export type ResultComponentActions = IUpdateBetFixture | IAddResultsComponentToState | IToggleStatsBar;

export interface IListOfResultsComponentState {
  results: IResult[];
  components: any[];
}

export const defaultListOfResultComponentState: IListOfResultsComponentState = {
  results: array,
  components: [],
};

export const ResultsReducer = (state = defaultListOfResultComponentState, action) => {
  let replace;
  switch (action.type) {
    case addResultsComponentToState:
      return { ...state, components: state.components.concat(action.payload.componentList) };

    case onToggleStatsBar:
      replace = Object.assign({}, state);
      const components = replace.components;
      if (components[action.payload.id].status === 'expanded') {
        components[action.payload.id].status = 'contracted';
      } else {
        components[action.payload.id].status = 'expanded';
      }

      replace.components = components;
      return Object.assign({}, state, replace);
    default:
      return state;
  }
};

// ***********************__REDUCERS__*****************************
