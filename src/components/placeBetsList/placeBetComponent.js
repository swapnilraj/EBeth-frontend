import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";
import {BettingFixtureComponent} from "../bettingFixtureComponent/bettingFixtureComponent.js"

export class PlaceBetComponent extends React.Component {
	

	constructor(props){
		    super(props);
		  }
		
	componentWillReceiveProps(){

	}

	render()
	{

		
		
		
		const dynamicDateWrapper = 
		{
			false:{
			paddingTop:".7%",
			width:"80%",
			margin:"0 auto",
			paddingBottom:".7%",
			textAlign:"left",
			color:"rgb(110, 110, 110)",
			display:"inherit"
			},
			true:
			{
			paddingTop:".7%",
			width:"80%",
			margin:"0 auto",
			paddingBottom:".7%",
			textAlign:"left",
			color:"rgb(110, 110, 110)",
			display:"none"
			}

		}
		 	
		const dateWrapper= () =>style (

			dynamicDateWrapper[(this.props.fixture.date=="")]

		)


		const centerText= style({

			margin: 0,
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginRight: "-50%",
			transform: "translate(-50%, -50%)"  

		})

		
		const componentStyle= style({

			marginBottom : ".2%"
			

		})

		return(
				<div className = {componentStyle} >

					<div className = {dateWrapper()}>{this.props.fixture.date}</div>
					<BettingFixtureComponent openDialogueBoxClick = {this.props.openDialogueBoxClick} fixture = {this.props.fixture} status = {this.props.status} toggleStatsBar = {this.props.toggleStatsBar} expandBetMenu = {this.props.expandBetMenu}/>
				</div>
				
			)
	}

};




