export const toggleMenuDisplay = "toggleMenuDisplay"
export const selectTeam = "selectTeam"


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