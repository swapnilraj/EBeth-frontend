// ************************__ACTIONS__*******************************

export interface IonToggleBetMenuDisplayAction {
  type: 'toggleMenuDisplay';
  payload: {
    currentDisplay: number;
    currentFixture: number;
  };
}
export const toggleMenuDisplay: IonToggleBetMenuDisplayAction['type'] = 'toggleMenuDisplay';
export const onToggleBetMenuDisplay = (currentDisplay, fixture) => {
  return {
    type: toggleMenuDisplay,
    payload: {
      currentDisplay,
      currentFixture: fixture,
    },
  };
};

export interface IonSelectTeamAction {
  type: 'selectTeam';
  payload: {
    teamName: string;
    tileDescription: string;
  };
}
export const selectTeam: IonSelectTeamAction['type'] = 'selectTeam';
export const onSelectTeam = (teamName, tileDescription) => {
  return {
    type: selectTeam,
    payload: {
      teamName,
      tileDescription,
    },
  };
};

export interface IonToggleValidInput {
  type: 'toggleValidInput';
  payload: {};
}
export const toggleValidInput: IonToggleValidInput['type'] = 'toggleValidInput';
export function onToggleValidInput() {
  return {
    type: toggleValidInput,
    payload: {},
  };
}

export interface IonUpdateBetValueInput {
  type: 'onUpdateBetValueInput';
  payload: {
    newInput: string;
  };
}
export const updateBetValueInput: IonUpdateBetValueInput['type'] = 'onUpdateBetValueInput';
export function onUpdateBetValueInput(newInput) {
  return {
    type: updateBetValueInput,
    payload: {
      newInput,
    },
  };
}

// ************************__ACTIONS__*******************************
// ************************__REDUCERS__*******************************

export type BetMenuActions =
  | IonToggleBetMenuDisplayAction
  | IonSelectTeamAction
  | IonToggleValidInput
  | IonUpdateBetValueInput;

export interface IBetMenuState {
  display: string;
  fixture: {
    homeTeamName: string;
    awayTeamName: string;
    date: string;
    time: string;
    homeBets: number;
    awayBets: number;
    drawBets: number;
    potValue: number;
  };
  selected: {
    selectTeam: string;
    selectedTab: string;
    validBetAmount: boolean;
    betInputValue: string;
  };
}

export const defaultBetMenuState = {
  display: 'hide',
  fixture: {
    homeTeamName: 'arsenal',
    awayTeamName: 'arsenal',
    date: '',
    time: '',
    homeBets: 0,
    awayBets: 0,
    drawBets: 0,
    potValue: 0,
  },
  selected: {
    selectTeam: '',
    selectedTab: 'none',
    validBetAmount: false,
    betInputValue: '',
  },
};

export const betMenuReducer = (state = defaultBetMenuState, action) => {
  switch (action.type) {
    case toggleMenuDisplay:
      let replace = {};
      if (state.display === 'hide') {
        replace = {
          display: 'show',
          fixture: action.payload.currentFixture,
        };
      } else {
        replace = {
          display: 'hide',
          fixture: {},
          selected: {
            selectTeam: '',
            selectedTab: 'none',
            validBetAmount: false,
            betInputValue: '',
          },
        };
      }
      return Object.assign({}, state, replace);

    case selectTeam:
      const newSelected = Object.assign({}, state.selected);
      if (newSelected.selectTeam !== action.payload.teamName) {
        newSelected.selectTeam = action.payload.teamName;
        newSelected.selectedTab = action.payload.tileDescription;
      } else {
        newSelected.selectTeam = '';
        newSelected.selectedTab = 'none';
      }
      newSelected.betInputValue = '';
      const replaceSelected = { selected: newSelected };
      return Object.assign({}, state, replaceSelected);

    case toggleValidInput:
      const currentStateToggleValidInput = Object.assign({}, state.selected);
      currentStateToggleValidInput.validBetAmount = !currentStateToggleValidInput.validBetAmount;
      const nextStateToggleValidInput = { selected: currentStateToggleValidInput };
      return Object.assign({}, state, nextStateToggleValidInput);

    case updateBetValueInput:
      const currentState = Object.assign({}, state.selected);
      currentState.betInputValue = action.payload.newInput;
      const nextState = { selected: currentState };
      return Object.assign({}, state, nextState);

    default:
      return state;
  }
};
