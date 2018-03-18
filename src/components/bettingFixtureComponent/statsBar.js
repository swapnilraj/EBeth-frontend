import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";
import {BetPercentage} from "./betPercentage"

export class StatsBar extends React.Component {
	

	constructor(props){
		    super(props);

		    this.state = 
		    {
		    	initialized:"false",
				homePercentage:33.33,
				awayPercentage:33.33,
				drawPercentage:33.33,
				betsOnHomeTeam:0,
				betsOnAwayTeam:0,
				betsOnDraw:0,
				dynamicTextMargin:"50%"

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

			
			height:"20%",
			width:"80%",
			borderRadius:"10px",
			backgroundColor:"rgb(216, 216, 216)",
			float:"left",
			position:"relative" ,
			marginTop:".5%",
			marginLeft:"1%",
			overflow:"hidden"

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

		const dynamicDrawMargin =
		{
			left: this.state.dynamicTextMargin,
		}

		const positionDrawText = () => style({

			margin: 0,
			position: 'relative',
			//top: '50%',
			marginLeft: dynamicDrawMargin.left,
			//marginRight: "-50%",
			//transform: "translate(-50%, -50%)"  

		}) 

		const drawStats = style({
			//float:"left",
			float:"left",
			height:"5%",
			width:"80%",
			marginTop:"0%",
			float:"left",
			marginLeft:"10%"
			//marginLeft:"1%",
			//position:'relative',



		})

		if(this.props.fixture && this.state.initialized == "false")
		{
			var total = this.props.fixture.homeBets + this.props.fixture.drawBets + this.props.fixture.awayBets
			var homeBets = this.props.fixture.homeBets / total
			var drawBets = this.props.fixture.drawBets / total
			var awayBets = this.props.fixture.awayBets / total
			this.setState({
				initialized:"true",
				homePercentage:homeBets,
				drawPercentage:drawBets,
				awayPercentage:awayBets,
				betsOnDraw:this.props.fixture.drawBets,
				betsOnHomeTeam: this.props.fixture.homeBets,
				betsOnAwayTeam: this.props.fixture.awayBets,
				dynamicTextMargin:((homeBets + (drawBets/2))*100).toString()+"%"
			})

			
		}

		return(
					<div className = {wrapper}>
						<div className = {homeStats}>{this.state.betsOnHomeTeam}</div>
						<div className = {statsBar}>
							<BetPercentage width = {this.state.homePercentage} color = "rgb(161, 229, 237)"/>
							<BetPercentage width = {this.state.drawPercentage} color ="rgb(252, 239, 126)"/>
							<BetPercentage width = {this.state.awayPercentage} color = "rgb(255, 129, 129)"/>
						</div>
						<div className = {awayStats}>{this.state.betsOnAwayTeam}</div>
						<div className = {drawStats}><div className = {positionDrawText()}>{this.state.betsOnDraw}</div></div>	
						
					</div>
				
				

		)
	}

};




