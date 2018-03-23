import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";
import {TeamSegment} from "./teamSegment"
import {TimeSegment} from "./timeSegment"
import {BetButtonSegment} from "./betButtonSegment"
import {PotValue} from "./potValue"
import {StatsBar} from "./statsBar"
import crests from '../../Crests.json';

export class BettingFixtureComponent extends React.Component {
	


	constructor(props){
		    super(props);
		    this.handler = this.handler.bind(this);
		  }
		 
	handler() {
    
  
    this.props.toggleStatsBar(this.props.status.status,this.props.status.id)

  }

 

	render()
	{
		var defaultWidth = "10%";
		var newWidth = 0;
		var offsetDueToMargin = 0;
	
		if(this.props.width)
		{
			var widthAsNumber = parseInt(this.props.width.substring(0,(this.props.width.length)-1));
			newWidth = (100-widthAsNumber)/2
		}

		if(this.props.marginLeft)
		{
			offsetDueToMargin = parseInt(this.props.marginLeft.substring(0,(this.props.marginLeft.length)-1))
		}
		console.log("newWidth")
		console.log(newWidth)
	
		const setWidth = 
		{
			true:{
				marginLeft:(newWidth+ offsetDueToMargin)+"%",
				marginRight:(newWidth- offsetDueToMargin)+"%"
			},
			false:
			{
				width:"10%"
			}
		}
		
		 const bettingFixtureComponent = () => style({
		 	height:"5em",
		 	marginLeft:setWidth[newWidth!=0].marginLeft,
		 	marginRight:setWidth[newWidth!=0].marginRight,
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
		 	marginLeft:setWidth[newWidth!=0].marginLeft,
		 	marginRight:setWidth[newWidth!=0].marginRight,
		 	backgroundColor:"white",
		 	margin:"0 auto",
		 	position:"relative",
		 	fontFamily:"lato",
		 	boxShadow: "1px 2px 9px -5px rgba(0, 0, 0, 0.1)",
		 	display:dynamicStats[this.props.status.status].display

		 })

		 const expandedSection = style({
		 	height:"100%",
		 	width:"75%",
		 	position:"relative"

		 })

		
		return(
				<div>
					
					<div className = {bettingFixtureComponent()}>
						<TeamSegment teamName = {this.props.fixture.homeTeamName} crest = {"./images"+crests[this.props.fixture.homeTeamName]} team = "Home" status = {this.props.status.status}/>
						<TimeSegment startTime = {this.props.fixture.time} />
						<TeamSegment teamName = {this.props.fixture.awayTeamName} crest = {"./images"+crests[this.props.fixture.awayTeamName]} team = "Away" status = {this.props.status.status}/>
						<BetButtonSegment openDialogueBoxClick = {this.props.openDialogueBoxClick} message = {this.props.status.message} showMore = {this.handler} fixture = {this.props.fixture}  expandBetMenu = {this.props.expandBetMenu}/>
						
					</div>
					<div className = {stats()}>
						<div className = {expandedSection}>
							<PotValue fixture = {this.props.fixture}/>
							<StatsBar fixture = {this.props.fixture}/>
						</div>
					</div>
				</div>

				

		)
	}

};




