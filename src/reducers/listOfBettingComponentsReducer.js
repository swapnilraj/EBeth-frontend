// import {insertNewComponents} from "../actions/listOfBettingComponentsActions"
// import {updateFixtureList}  from "../actions/listOfBettingComponentsActions"
// import {toggleStatsBar}  from "../actions/listOfBettingComponentsActions"

export const updateFixtureList = "updateFixtureList"
export const insertNewComponents = "insertNewBetComponent"
export const toggleStatsBar = "toggleStatsBar"

//***********************__ACTIONS__*****************************

export function updateBetFixtureList(array){
	
	console.log(array)
	return{
		type:updateFixtureList,
		payload:{
			componentList : array
		}
	}
}


export function addBetComponentToState(newComponent){

	return{
		type:insertNewComponents,
		payload:{
			componentList : newComponent

		}
	}
} 


export function toggleStatsBarFunc(currentState,barId){
	
	return{
		type:toggleStatsBar,
		payload:{
			toggleState : currentState,
			barId:barId
		}
	}
} 






//***********************__ACTIONS__*****************************
//***********************__REDUCERS__*****************************


var Fixtures = class Fixtures {
  constructor(homeTeamName,awayTeamName,date,time,homeBets,drawBets,awayBets,potValue) {
    this.homeTeamName = homeTeamName;
    this.awayTeamName = awayTeamName;
    this.date = date;
    this.time = time;
    this.homeBets = homeBets;
    this.awayBets = awayBets;
    this.drawBets = drawBets;
    this.potValue = potValue;
  }
};


var array = []

export default function ListOfBettingComponentReducer(state={fixture:array,components:[]},action){
	
	switch(action.type){

		
		case updateFixtureList:

			const replace = {fixture:action.payload.componentList,components:[]}
				for(var i = replace.fixture.length-1;i>0;i--)
			{
				if(replace.fixture[i].date == replace.fixture[i-1].date )
				{
					replace.fixture[i].date = "";
				}
			}
			return Object.assign({},state,replace);
			break;

		case insertNewComponents:
			var replacement = Object.assign({},state);
			if(action.payload.componentList.id>0){
			replacement = replacement.components.concat(action.payload.componentList)
		    }
		    else
		    {
		    	replacement = [action.payload.componentList]
		    }
			var objReplacement = {components:replacement}
			console.log(objReplacement)
			console.log(state)
			return Object.assign({},state,objReplacement);
			break;

		case toggleStatsBar:

			var currentStateOfBars = currentStateOfBars = Object.assign({},state);
			if(action.payload.toggleState==="contracted")
			{
				currentStateOfBars.components[action.payload.barId].status = "expanded"
				currentStateOfBars.components[action.payload.barId].message = "Show Less"
			}
			else
			{
				currentStateOfBars.components[action.payload.barId].status = "contracted"
				currentStateOfBars.components[action.payload.barId].message = "Show More"
			}
			return Object.assign({},state,currentStateOfBars);

		default:
			
			return state
	}
	return state
}



//***********************__REDUCERS__*****************************