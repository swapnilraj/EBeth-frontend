// ***********************__ACTIONS__*****************************
interface IUpdateBetFixture {
  type: 'updateFixtureList';
  payload: {
    componentList: any;
  };
}
export const updateFixtureList: IUpdateBetFixture['type'] = 'updateFixtureList';
export const updateBetFixtureList = (_array: IUpdateBetFixture['payload']['componentList']) => {
  // console.log(array);
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
  fixture: any;
  components: any[];
}

class Fixtures {
  public homeTeamName: string;
  public awayTeamName: string;
  public date: string;
  public time: string;
  public homeBets: string;
  public awayBets: string;
  public drawBets: string;
  public potValue: string;

  constructor(homeTeamName, awayTeamName, date, time, homeBets, drawBets, awayBets, potValue) {
    this.homeTeamName = homeTeamName;
    this.awayTeamName = awayTeamName;
    this.date = date;
    this.time = time;
    this.homeBets = homeBets;
    this.awayBets = awayBets;
    this.drawBets = drawBets;
    this.potValue = potValue;
  }
}

const fixture1 = new Fixtures('Arsenal', 'Brighton', 'Saturday | 21st March', '3pm', 40, 40, 60, 1.2);
const fixture2 = new Fixtures('Watford City', 'Arsenal', 'Saturday | 21st March', '3pm', 100, 45, 92, 0.45);
const fixture3 = new Fixtures('Stoke City', 'Newcastle United', 'Saturday | 21st March', '5.30pm', 100, 45, 92, 0.9);
const fixture4 = new Fixtures('Liverpool', 'Everton', 'Sunday | 28th March', '4pm', 169, 82, 120, 2.0);
const fixture5 = new Fixtures('Huddersfield United', 'West Brom', 'Sunday | 28th March', '5.30pm', 169, 82, 120, 1.12);

const fixture6 = new Fixtures('West Ham United', 'Southampton', 'Saturday | 31st March', '3pm', 40, 40, 60, 1.2);
const fixture7 = new Fixtures('Brighton', 'Leicester City', 'Saturday | 31st March', '3pm', 100, 45, 92, 0.45);
const fixture8 = new Fixtures('Chelsea FC', 'Tottenham Hotspur', 'Sunday | 1st April', '4pm', 169, 82, 120, 2.0);
const fixture9 = new Fixtures('Everton', 'Manchester City', 'Saturday | 31st March', '5.30pm', 169, 82, 120, 1.12);

const array = [fixture1, fixture2, fixture3, fixture4, fixture5, fixture6, fixture7, fixture8, fixture9];

export const defaultListOfBettingComponentState: IListOfBettingComponentState = {
  fixture: array,
  components: [],
};

export const ListOfBettingComponentReducer = (state = defaultListOfBettingComponentState, action) => {
  switch (action.type) {
    case updateFixtureList:
      const replace = { fixture: action.payload.componentList, components: [] };
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
      // console.log(objReplacement)
      // console.log(state)
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
