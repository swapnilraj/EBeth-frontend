import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";
import {PlaceBetComponent} from "./placeBetComponent"

// named
var Fixtures = class Fixtures {
  constructor(homeTeamName,awayTeamName,date,homeBets,awayBets,drawBets) {
    this.homeTeamName = homeTeamName;
    this.awayTeamName = awayTeamName;
    this.date = date;
    this.homeBets = homeBets;
    this.awayBets = awayBets;
    this.drawBets = drawBets;
  }
};


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
	render()
	{
		var message = "Show More";

		 	
		const componentStyle= style({

			marginTop : "30%"
			

		})


		


		return(
			<div>
			<PlaceBetComponent onClick = {this.clickHandler} date = "Saturday | 22nd August"/>
			<PlaceBetComponent />
			<PlaceBetComponent date = "Tuesday | 25th August"/>
			</div>

			)
	}

};




