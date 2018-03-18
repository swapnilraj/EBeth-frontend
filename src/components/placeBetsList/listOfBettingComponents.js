import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";
import {PlaceBetComponent} from "./placeBetComponent"

// named

function renderBettingComponents(fixtures,clickHandler) {
    if (fixtures.length > 0) {      
        return fixtures.map((fixture, index) => (
            <PlaceBetComponent fixture = {fixture} openDialogueBoxClick = {clickHandler} />
        ));
    }
    else return [];
}

export class ListOfBettingComponents extends React.Component {
	

	constructor(props){
		    super(props);

		    this.state = 
		    {
				fixtures:[]
				
		    };
		    this.clickHandler = this.clickHandler.bind(this)

		  }
		
clickHandler(e)
{e.preventDefault()

}
createComponent(newFixture){
    return <PlaceBetComponent openDialogueBoxClick = {this.props.openDialogueBoxClick} fixture = {newFixture} />;
  }




	render()
	{

		const bettingComponents = renderBettingComponents(this.props.fixtures,this.props.openDialogueBoxClick);

		if(this.props.fixtures && this.state.fixtures[0]==null)
{
			var newFixtures = this.props.fixtures;
			for(var i = newFixtures.length-1;i>0;i--)
			{
				if(newFixtures[i].date == newFixtures[i-1].date )
				{
					newFixtures[i].date = "";
				}
			}
			this.setState({fixtures:newFixtures})
		
			
}
	

		var message = "Show More";

		 	
		const componentStyle= style({

			marginTop : "30%"
			

		})

 


		return(
			<div>
				{bettingComponents}
			</div>

			)
	}

};




