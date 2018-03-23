//import {toggleMenuDisplay, toggleValidInput, selectTeam,updateBetValueInput} from "../actions/betMenuActions"
export const toggleMenuDisplay = "toggleMenuDisplay"
export const selectTeam = "selectTeam"
export const toggleValidInput = "toggleValidInput"
export const updateBetValueInput = "onUpdateBetValueInput"


//************************__ACTIONS__*******************************

export function onToggleBetMenuDisplay(currentDisplay,fixture){

	return{
		type:toggleMenuDisplay,
		payload:{
			currentDisplay:currentDisplay,
			currentFixture:fixture
		}
	}
}

export function onSelectTeam(teamName,tileDescription){

	return{
		type:selectTeam,
		payload:{
			teamName:teamName,
			tileDescription:tileDescription
		}
	}
}


export function onToggleValidInput(){
	return{
		type:toggleValidInput,
		payload:{
			
		}
	}
}

export function onUpdateBetValueInput(newInput){
	
	return{
		type:updateBetValueInput,
		payload:{
			newInput:newInput
		}
	}
}



//************************__ACTIONS__*******************************
//************************__REDUCERS__*******************************





export default function betMenuReducer(state={
						
						display:"hide",
						fixture:{

							homeTeamName:"arsenal",
	    					awayTeamName : "arsenal",
							date: "",
							time: "",
							homeBets:0,
							awayBets:0,
							drawBets: 0,
							potValue : 0
						},
						selected:
						{
							selectTeam:"",
							selectedTab:"none",
							validBetAmount:false,
							betInputValue:"",
						}


						

					},action){
	
	switch(action.type)
	{
		case toggleMenuDisplay:
			var replace =  {};
			if(state.display == "hide"){
				replace = {
						display:"show",
						fixture:action.payload.currentFixture
						}
			}
			else
			{
				replace = {
							display:"hide",
							fixture:{},
							selected:
								{
								selectTeam:"",
								selectedTab:"none",
								validBetAmount:false,
								betInputValue:""
								}
							}
			}
			return Object.assign({},state,replace)
		
		case selectTeam:
			var newSelected = Object.assign({},state.selected)
			if(newSelected.selectTeam != action.payload.teamName)
			{
				newSelected.selectTeam = action.payload.teamName;
				newSelected.selectedTab = action.payload.tileDescription;
			}
			else
			{
				newSelected.selectTeam = "";
				newSelected.selectedTab = "none";

			}
			newSelected.betInputValue = "";
			var replace = {selected:newSelected}
			return Object.assign({},state,replace)


		case toggleValidInput:
			var currentState = Object.assign({},state.selected);
			currentState.validBetAmount = (!currentState.validBetAmount);
			var nextState = {selected:currentState};
			return Object.assign({},state,nextState);

		

		case updateBetValueInput:
			var currentState = Object.assign({},state.selected);
			currentState.betInputValue = action.payload.newInput;
			var nextState = {selected:currentState};
			return Object.assign({},state,nextState)
	}

	return state
}



//************************__REDUCERS__*******************************


