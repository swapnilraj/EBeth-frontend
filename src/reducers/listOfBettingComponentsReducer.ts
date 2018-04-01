import { IFixture } from '../containers/resultsContainer';

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

interface IAddBetComponent {
  type: 'insertNewBetComponent';
  payload: {
    componentList: any;
  };
}
export const insertNewComponents: IAddBetComponent['type'] = 'insertNewBetComponent';
export const addBetComponentToState = (newComponent: IAddBetComponent['payload']['componentList']) => {
  return {
    type: insertNewComponents,
    payload: {
      componentList: newComponent,
    },
  };
};

interface IToggleStateBar {
  type: 'toggleStatsBar';
  payload: {
    toggleState: any;
    barId: any;
  };
}
export const toggleStatsBar: IToggleStateBar['type'] = 'toggleStatsBar';
export function toggleStatsBarFunc(currentState, barId) {
  return {
    type: toggleStatsBar,
    payload: {
      toggleState: currentState,
      barId,
    },
  };
}

// ***********************__ACTIONS__*****************************
// ***********************__REDUCERS__*****************************

export type BettingComponentActions = IUpdateBetFixture | IAddBetComponent | IToggleStateBar;

export interface IListOfBettingComponentState {
  fixture: IFixture[];
  components: any[];
}

const array = [];

export const defaultListOfBettingComponentState: IListOfBettingComponentState = {
  fixture: array,
  components: [],
};

export const ListOfBettingComponentReducer = (state = defaultListOfBettingComponentState, action) => {
  switch (action.type) {
    case updateFixtureList:
      const replace = Object.assign({}, state);
      replace.fixture = action.payload.componentList;
      for (let i = replace.fixture.length - 1; i > 0; i--) {
        if (replace.fixture[i].date === replace.fixture[i - 1].date) {
          replace.fixture[i].date = '';
        }
      }
      return Object.assign({}, state, replace);

    case insertNewComponents:
      let replacement = Object.assign({}, state) as any;
      if (action.payload.componentList.id > 0) {
        replacement = replacement.components.concat(action.payload.componentList);
      } else {
        replacement = [action.payload.componentList];
      }
      const objReplacement = { components: replacement };
      return Object.assign({}, state, objReplacement);

    case toggleStatsBar:
      const currentStateOfBars = Object.assign({}, state);
      if (action.payload.toggleState === 'contracted') {
        currentStateOfBars.components[action.payload.barId].status = 'expanded';
        currentStateOfBars.components[action.payload.barId].message = 'Show Less';
      } else {
        currentStateOfBars.components[action.payload.barId].status = 'contracted';
        currentStateOfBars.components[action.payload.barId].message = 'Show More';
      }
      return Object.assign({}, state, currentStateOfBars);

    default:
      return state;
  }
};

// ***********************__REDUCERS__*****************************
