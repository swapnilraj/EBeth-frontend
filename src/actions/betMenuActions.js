export const toggleMenuDisplay = "toggleMenuDisplay"
export const selectTeam = "selectTeam"
export const toggleValidInput = "toggleValidInput"
export const updateBetValueInput = "onUpdateBetValueInput"


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


