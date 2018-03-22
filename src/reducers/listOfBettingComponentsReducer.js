import {insertNewComponents} from "../actions/listOfBettingComponentsActions"
import {updateFixtureList}  from "../actions/listOfBettingComponentsActions"
import {toggleStatsBar}  from "../actions/listOfBettingComponentsActions"


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


		var fixture1 = new Fixtures("Crystal Palace","Liverpool","Saturday | 31st March","12.30pm",16, 40,32,1.17)
		var fixture2 = new Fixtures("Newcastle United","Huddersfield United","Saturday | 31st March","3pm",40, 40,60,2.2)
		var fixture3 = new Fixtures("Manchester United","Swansea City","Saturday | 31st March","3pm",100, 45,92,0.38)
		var fixture4 = new Fixtures("Watford City","Bournemouth","Saturday | 31st March","3pm",150, 82,120,4.433)
		var fixture5 = new Fixtures("West Brom","Burnley","Saturday | 31st March","3pm",16, 40,32,0.50)
		var fixture6 = new Fixtures("West Ham United","Southampton","Saturday | 31st March","3pm",40, 40,60,1.2)
		var fixture7 = new Fixtures("Brighton","Leicester City","Sunday | 1st April","3pm",100, 45,92,0.45)
		var fixture8 = new Fixtures("Everton","Manchester City","Sunday | 1st April","5.30pm",169, 82,120,1.12)
		
var array = [fixture1,fixture2,fixture3,fixture4,fixture5, fixture6,fixture7,fixture8]


export default function ListOfBettingComponentReducer(state={fixture:array,components:[]},action){
	
	switch(action.type){

		
		case updateFixtureList:
			const replace = {fixture:action.payload.componentList,components:[]}
			return Object.assign({},state,replace);
			break;

		case insertNewComponents:
			var replacement = state.components.concat(action.payload.componentList)
			var objReplacement = {components:replacement}
			return Object.assign({},state,objReplacement);
			break;

		case toggleStatsBar:

			var currentStateOfBars = currentStateOfBars = Object.assign({},state);
			if(action.payload.toggleState==="contracted")
			{
				currentStateOfBars.components[action.payload.barId].status = "expanded"
			}
			else
			{
				currentStateOfBars.components[action.payload.barId].status = "contracted"
			}
			return Object.assign({},state,currentStateOfBars);

		default:
			
			return state
	}
	return state
}