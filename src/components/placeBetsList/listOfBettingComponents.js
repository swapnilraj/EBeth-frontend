import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";
import {PlaceBetComponent} from "./placeBetComponent"

// named


export class ListOfBettingComponents extends React.Component {
	

	constructor(props){
		    super(props);

		    this.clickHandler = this.clickHandler.bind(this)

		  }
		

renderBettingComponents(fixtures,clickHandler) {
	if(this.props.componentStatus[0]!=undefined){
		if (fixtures.length > 0) {      
		        return fixtures.map((fixture, index) => (
		        	
		            <PlaceBetComponent fixture = {fixture} openDialogueBoxClick = {clickHandler} status = {this.props.componentStatus[index]} toggleStatsBar = {this.props.toggleStatsBar} expandBetMenu = {this.props.expandBetMenu}/>
		           

		        ));
		    }
		else return [];
		}
	else{
		if (fixtures.length > 0) {   
		const defaultStatus = {fixture:undefined,id:0,potValue:0,status:"contracted"}   
		        return fixtures.map((fixture, index) => (
		        	
		            <PlaceBetComponent fixture = {fixture} openDialogueBoxClick = {clickHandler} status = {defaultStatus} toggleStatsBar = {this.props.toggleStatsBar} expandBetMenu = {this.props.expandBetMenu} />
		           

		        ));
		    }
		else return [];	
	}
    
}

clickHandler(e)
{e.preventDefault()

}

componentWillMount()
{
	
	if((this.props.fixtures)){
		for(var i =0;i<this.props.fixtures.length;i++)
		{
		var newComponent = 
		{
			fixture:this.props.fixtures[i],
			id:i,
			status:"contracted",
			potValue:0.00,
			message:"Show More"
		}

			this.props.addBetComponentToState(newComponent)
		}
	}
}

componentWillReceiveProps(nextProps)
{
	
	if(((nextProps.fixtures) && (nextProps.fixtures[0] != this.props.fixtures[0]) ) ){




		var newFixtures = nextProps.fixtures;
			for(var i = nextProps.fixtures-1;i>0;i--)
			{
				if(nextProps.fixtures[i].date == newFixtures[i-1].date )
				{
					newFixtures[i].date = "";
				}
			}



		for(var i =0;i<nextProps.fixtures.length;i++)
		{

		var newComponent = 
		{
			fixture:nextProps.fixtures[i],
			id:i,
			status:"contracted",
			message:"Show More"
		}

			nextProps.addBetComponentToState(newComponent)
		}
	}
}

	render()
	{

		
		var bettingComponents = this.renderBettingComponents(this.props.fixtures,this.props.openDialogueBoxClick);
	
	

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




