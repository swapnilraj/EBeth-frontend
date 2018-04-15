import { IResult, IResultComponent, ITabState } from '../components/Results';

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

interface ISwitchTab {
  type: 'switchTab';
  payload: {
    tabState: ISwitchTab;
  };
}
export const switchTab: ISwitchTab['type'] = 'switchTab';
export const onSwitchTab = (tabState: ISwitchTab) => {
  // tslint:disable-next-line:no-console

  return {
    type: switchTab,
    payload: {
      tabState,
    },
  };
};

interface ILoadSpecifiedResults {
  type: 'loadResults';
  payload: {
    tabState: ILoadSpecifiedResults;
  };
}
export const loadResults: ILoadSpecifiedResults['type'] = 'loadResults';
export const onLoadResults = (currentScreen: string) => {
  // tslint:disable-next-line:no-console

  return {
    type: loadResults,
    payload: {
      currentScreen,
    },
  };
};

interface IReplaceResults {
  type: 'replaceResults';
  payload: {
    replacementResults: IReplaceResults;
  };
}
export const replaceResults: IReplaceResults['type'] = 'replaceResults';
export const onReplaceResults = (newResults: IResult[]) => {
  // tslint:disable-next-line:no-console

  return {
    type: replaceResults,
    payload: {
      newResults,
    },
  };
};

// ***********************__ACTIONS__*****************************
// ***********************__REDUCERS__*****************************




const defaultTabState: ITabState = {
  message: 'All results',
  color: '#F8623E',
  expanded: false,
};

export type ResultComponentActions =
  | IAddResultsComponentToState
  | IToggleStatsBar
  | ISwitchTab
  | ILoadSpecifiedResults
  | IReplaceResults;

export interface IListOfResultsComponentState {
  results: IResult[];
  components: IResultComponent[];
  tabState: ITabState;
  allResults:IResult[];
  resultsFetched:boolean;
}

export const defaultListOfResultComponentState: IListOfResultsComponentState = {
  allResults:[],
  results: [],
  components: [],
  tabState: defaultTabState,
  resultsFetched:false
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

    case switchTab:
      const currentTabStatus = Object.assign({}, state.tabState);
      currentTabStatus.expanded = !currentTabStatus.expanded;
      const tabReplacement = { tabState: currentTabStatus };
      return Object.assign({}, state, tabReplacement);

    case loadResults:
      const currentToggleButtonDisplay = Object.assign({}, state.tabState);
      const allResultArray = state.allResults
      const myResults:IResult[] = [];
      let replacementResultArray:IResult[] = [];
      // tslint:disable-next-line:prefer-for-of
      for(let i =0;i< allResultArray.length;i++)
      {
        if(allResultArray[i].resultForUser==='win' ||allResultArray[i].resultForUser==='lose')
        {
          myResults.concat(allResultArray[i])
        }
      }
      if (currentToggleButtonDisplay.message === 'My results') {
        currentToggleButtonDisplay.message = 'All results';
        currentToggleButtonDisplay.expanded = false;
        replacementResultArray = allResultArray;
        // call fetch results here?
      } else {
        currentToggleButtonDisplay.message = 'My results';
        currentToggleButtonDisplay.expanded = false;
        replacementResultArray = myResults;
        // call fetch results here?
      }

      const replacementToggleButtonDisplay = {
        tabState: currentToggleButtonDisplay,
        results: replacementResultArray
        
      };
      return Object.assign({}, state, replacementToggleButtonDisplay);

    case replaceResults:
      // pass array of results to this function to display on front end
      // important you incorporate control flow in order to avoid infinite reloading
      
      const replacementResults = { results: action.payload.newResults,allResults:action.payload.newResults ,resultsFetched:true};
      return Object.assign({}, state, replacementResults);

    default:
      return state;
  }
};

// ***********************__REDUCERS__*****************************
