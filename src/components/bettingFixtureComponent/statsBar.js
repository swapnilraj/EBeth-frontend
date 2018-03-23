import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";
import {BetPercentage} from "./betPercentage"

export class StatsBar extends React.Component {
	

	constructor(props){
		    super(props);

		    this.calculateMargin = this.calculateMargin.bind(this);
		  }

		calculateMargin()
		{
			var total = this.props.fixture.homeBets + this.props.fixture.drawBets + this.props.fixture.awayBets
			var homeBets = this.props.fixture.homeBets / total
			var drawBets = this.props.fixture.drawBets / total
			var awayBets = this.props.fixture.awayBets / total
			return ((homeBets + (drawBets/2))*100).toString()+"%"
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

	

		const positionDrawText = () => style({

			margin: 0,
			position: 'relative',
			marginLeft: this.calculateMargin(),

		}) 

		const drawStats = style({
			float:"left",
			height:"5%",
			width:"80%",
			marginTop:"0%",
			float:"left",
			marginLeft:"10%"
			

		})

	

		var total = this.props.fixture.homeBets + this.props.fixture.drawBets + this.props.fixture.awayBets
		var homeBets = this.props.fixture.homeBets / total
		var drawBets = this.props.fixture.drawBets / total
		var awayBets = this.props.fixture.awayBets / total

		return(
					<div className = {wrapper}>
						<div className = {homeStats}>{this.props.fixture.homeBets}</div>
						<div className = {statsBar}>
							<BetPercentage width = {homeBets} color = "rgb(161, 229, 237)"/>
							<BetPercentage width = {drawBets} color ="rgb(252, 239, 126)"/>
							<BetPercentage width = {awayBets} color = "rgb(255, 129, 129)"/>
						</div>
						<div className = {awayStats}>{this.props.fixture.awayBets}</div>
						<div className = {drawStats}><div className = {positionDrawText()}>{this.props.fixture.drawBets}</div></div>	
						
					</div>
				
				

		)
	}

};




