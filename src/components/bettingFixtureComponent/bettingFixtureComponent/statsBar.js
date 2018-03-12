import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";

export class StatsBar extends React.Component {
	

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

		 	
		
		const statsBar= style({

			//marginLeft: "10%",
			//position: 'absolute',
			height:"20%",
			width:"80%",
			borderRadius:"10px",
			backgroundColor:"rgb(216, 216, 216)",
			//top: '40%',
			float:"left",
			//transform: "translate(0%, -50%)" 
			//marginTop:"10%",
			position:"relative" ,
			marginTop:".5%",
			marginLeft:"1%"

		})		

		const centerText= style({

			margin: 0,
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginRight: "-50%",
			transform: "translate(-50%, -50%)"  

		})

		const wrapper= style({
			
			height:"50%",
			width:"100%",
			position:"relative", 

		})

		const homeStats = style({
			float:"left",
			margin:"0 auto",
			marginLeft:"8%",
			position:'relative'

		})

		const awayStats = style({
			float:"left",
			margin:"0 auto",
			marginLeft:"1%",
			position:'relative'

		})
		return(
					<div className = {wrapper}>
						<div className = {homeStats}>{homeTeamPundits}</div>
						<div className = {statsBar}></div>
						<div className = {awayStats}>{awayTeamPundits}</div>	
						
					</div>
				
				

		)
	}

};




