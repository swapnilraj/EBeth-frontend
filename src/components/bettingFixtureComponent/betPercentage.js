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
			backgroundColor:"rgb(161, 229, 237)",
			width:"33.33%"
		}
		
		const betPercentageStyle= () => style({

			//marginLeft: "10%",
			//position: 'absolute',
			height:"100%",
			width:dynamicBarColor.width,
			float:"left",
			backgroundColor:dynamicBarColor.backgroundColor


		})		

		if(this.props.color)
		{
			dynamicBarColor.backgroundColor = this.props.color;
		}

		if(this.props.width)
		{
			dynamicBarColor.width= (this.props.width*100).toString()+"%";
		}

		
		return(
					<div className ={betPercentageStyle()} >
					
					</div>
				
				

		)
	}

};




