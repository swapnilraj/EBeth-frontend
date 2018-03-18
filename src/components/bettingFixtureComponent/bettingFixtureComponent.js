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

		    this.state = 
		    {
				hover:"expanded",
				fixturePopulated:"false",
				homeTeam:"Manchester United",
				homeCrest:"./images/machester-united.png",
				awayTeam:"Manchester City",
				awayCrest:"./images/machester-city.png",
				status:"contracted",
				time:"",
				potValue:"1.00 ETH",
				message:"Show More"
		    };
		     this.handler = this.handler.bind(this)
		  }
		 
		handler() {
    
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

		
		
		if(this.props.fixture && this.state.fixturePopulated =="false")
		{
			//alert(this.props.fixture.potValue)
			this.setState({
				hover:"expanded",
				fixturePopulated:"true",
				homeTeam:this.props.fixture.homeTeamName,
				homeCrest:"./images"+crests[this.props.fixture.homeTeamName],
				awayTeam:this.props.fixture.awayTeamName,
				awayCrest:"./images"+crests[this.props.fixture.awayTeamName],
				time : this.props.fixture.time,
				potValue:this.props.fixture.potValue
			})

			
		}
		

		 const bettingFixtureComponent = style({
		 	//marginTop:"2%",
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
						<TeamSegment teamName = {this.state.homeTeam} crest = {this.state.homeCrest} team = "Home" status = {this.state.status}/>
						<TimeSegment startTime = {this.state.time} />
						<TeamSegment teamName = {this.state.awayTeam} crest = {this.state.awayCrest} team = "Away" status = {this.state.status}/>
						<BetButtonSegment openDialogueBoxClick = {this.props.openDialogueBoxClick} message = {this.state.message} handler = {this.handler} fixture = {this.props.fixture}/>
						
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




