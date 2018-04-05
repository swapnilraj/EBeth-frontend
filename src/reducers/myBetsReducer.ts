import { IFixture } from '../components/Results';

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

interface IToggleStats {
  type: 'toggleStatus';
  payload: {
    id: number;
  };
}
export const toggleStatus: IToggleStats['type'] = 'toggleStatus';
export const toggleStatsStatus = (id: number) => {
  return {
    type: toggleStatus,
    payload: {
      id,
    },
  };
};

// ***********************__ACTIONS__*****************************
// ***********************__REDUCERS__*****************************

export interface IMyBets {
  fixture: IFixture;
  betValue: number;
  betPlacedOn: string;
  expanded: boolean;
  live: boolean;
}

export type BettingComponentActions = IUpdateBetFixture;

export interface IMyBetsState {
  fixture: IFixture[];
  userBets: IMyBets[];
}

export const defaultIFixture: IFixture = {
  potValue: 0,
  awayBets: 5,
  homeBets: 5,
  awayTeamName: 'Chelsea',
  date: 'Saturday  |  31st March',
  drawBets: 0,
  homeTeamName: 'Manchester City',
  time: '3pm',
  betEvent: '',
};

export const secondFixture: IFixture = {
  potValue: 8.05,
  awayBets: 5,
  homeBets: 5,
  awayTeamName: 'Watford',
  date: 'Sunday  |  1st April',
  drawBets: 3,
  homeTeamName: 'Arsenal',
  time: '3pm',
  betEvent: '',
};

export const thirdFixture: IFixture = {
  potValue: 8.05,
  awayBets: 5,
  homeBets: 5,
  awayTeamName: 'Tottenham Hotspur',
  date: 'Sunday  |  1st April',
  drawBets: 3,
  homeTeamName: 'West Ham United',
  time: '5pm',
  betEvent: '',
};

export const fourthFixture: IFixture = {
  potValue: 8.05,
  awayBets: 5,
  homeBets: 5,
  awayTeamName: 'Newcastle United',
  date: 'Monday |  2nd April',
  drawBets: 3,
  homeTeamName: 'Manchester United',
  time: '5pm',
  betEvent: '',
};

export const defaultMyBet: IMyBets = {
  betValue: 0,
  betPlacedOn: 'Home',
  fixture: defaultIFixture,
  expanded: false,
  live: false,
};

export const secondBet: IMyBets = {
  betValue: 0.025,
  betPlacedOn: 'Home',
  fixture: secondFixture,
  expanded: false,
  live: true,
};

export const thirdBet: IMyBets = {
  betValue: 0.025,
  betPlacedOn: 'Away',
  fixture: thirdFixture,
  expanded: false,
  live: false,
};

export const fourthBet: IMyBets = {
  betValue: 0.025,
  betPlacedOn: 'Away',
  fixture: fourthFixture,
  expanded: false,
  live: false,
};

export const defaultMyBetState: IMyBetsState = {
  fixture: [defaultIFixture, defaultIFixture, defaultIFixture],
  userBets: [secondBet, thirdBet, fourthBet, defaultMyBet],
};

export const MyBetsReducer = (state: IMyBetsState = defaultMyBetState, action) => {
  switch (action.type) {
    case toggleStatus:
      const currentStatsBarStatus = Object.assign({}, state);
      const emptyArray: IMyBets[] = [];
      const userBetsState = emptyArray.concat(currentStatsBarStatus.userBets);
      userBetsState[action.payload.id].expanded = !userBetsState[action.payload.id].expanded;
      const replacementStatsBarState = { userBets: userBetsState };
      return Object.assign({}, state, replacementStatsBarState);
    default:
      return state;
  }
};

// ***********************__REDUCERS__*****************************
