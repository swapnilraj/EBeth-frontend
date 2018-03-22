import {toggleMenuDisplay} from "../actions/betMenuActions"
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
							teamName:"",
							selectedTab:"none",
							betPlaced:0
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
							fixture:{}
							}
			}
			return Object.assign({},state,replace)
	}

	return state
}
