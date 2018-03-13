import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";

export class BetPercentage extends React.Component {
	

	constructor(props){
		    super(props);

		    this.state = 
		    {
				hover:"mouseOut"
		    };
		  }

		mouseOver() {
    		
    		this.setState({hover: 'mouseOver'});
    		//dynamicStyle.backgroundColor = colors["red"];
  		}

  		mouseOut() {
    		
    		this.setState({hover: 'mouseOut'});
    		//dynamicStyle.backgroundColor = colors["red"];
  		}
		 
		

	render()
	{
		var homeTeamPundits = 0;
		var awayTeamPundits = 0;

		const dynamicBarColor = 
		{
			backgroundColor:"rgb(161, 229, 237)"
		}
		
		const betPercentageStyle= () => style({

			//marginLeft: "10%",
			//position: 'absolute',
			height:"100%",
			width:"33.33%",
			float:"left",
			backgroundColor:dynamicBarColor.backgroundColor


		})		

		if(this.props.color)
		{
			dynamicBarColor.backgroundColor = this.props.color;
		}

		
		return(
					<div className ={betPercentageStyle()} >
					
					</div>
				
				

		)
	}

};




