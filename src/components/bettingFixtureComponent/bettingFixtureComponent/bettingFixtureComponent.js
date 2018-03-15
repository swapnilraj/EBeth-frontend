import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";
import {TeamSegment} from "./teamSegment.js"
import {TimeSegment} from "./timeSegment.js"
import {BetButtonSegment} from "./betButtonSegment.js"
import {PotValue} from "./potValue.js"
import {StatsBar} from "./statsBar.js"

export class BettingFixtureComponent extends React.Component {
	

	constructor(props){
		    super(props);

		    this.state = 
		    {
				hover:"expanded",
				homeTeam:"Manchester United",
				homeCrest:"./images/machester-united.png",
				awayTeam:"Manchester City",
				awayCrest:"./images/machester-city.png",
				status:"contracted",
				message:"Show More"
		    };
		     this.handler = this.handler.bind(this)
		  }
		 
		handler(e) {
    e.preventDefault()
    if(this.state.status =="contracted")
    {
    this.setState({
      status: "expanded",
      message:"Show Less"
    })
	}
	else
	{
		this.setState({
      status: "contracted",
      message: "Show More"
    })
	}
  }

	render()
	{
	
		

		 const bettingFixtureComponent = style({
		 	height:"5em",
		 	marginLeft:"10%",
		 	marginRight:"10%",
		 	backgroundColor:"white",
		 	margin:"0 auto",
		 	position:"relative",
		 	fontFamily:"lato",
		 	boxShadow: "1px 2px 9px -5px rgba(0, 0, 0, 0.1)"

		 })

		 const dynamicStats = 
		 {
		 	expanded:
		 	{
		 		display:"inherit"
		 	},
		 	contracted:
		 	{
		 		display:"none"
		 	}
		 }

		 const stats = () => style({
		 	height:"6em",
		 	marginLeft:"10%",
		 	marginRight:"10%",
		 	backgroundColor:"white",
		 	margin:"0 auto",
		 	position:"relative",
		 	fontFamily:"lato",
		 	boxShadow: "1px 2px 9px -5px rgba(0, 0, 0, 0.1)",
		 	display:dynamicStats[this.state.status].display

		 })

		 const expandedSection = style({
		 	height:"100%",
		 	width:"75%",
		 	position:"relative"

		 })

		
		return(
				<div>
					<div className = {bettingFixtureComponent}>
						<TeamSegment teamName = {this.state.homeTeam} crest = {this.state.homeCrest} team = "home"/>
						<TimeSegment />
						<TeamSegment teamName = {this.state.awayTeam} crest = {this.state.awayCrest} team = "away"/>
						<BetButtonSegment message = {this.state.message} handler = {this.handler}/>
						
					</div>
					<div className = {stats()}>
						<div className = {expandedSection}>
							<PotValue />
							<StatsBar />
						</div>
					</div>
				</div>

				

		)
	}

};



