export const updateFixtureList = "updateFixtureList"
export const insertNewComponents = "insertNewBetComponent"
export const toggleStatsBar = "toggleStatsBar"


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