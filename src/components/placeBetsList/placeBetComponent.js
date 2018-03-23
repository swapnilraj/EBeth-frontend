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

		
		const dynamicMargin = 
		{
			true:
			{
				left:this.props.marginLeft
			},
			false:
			{
				left:"0%"
			}
		}
		
		const dynamicDateWrapper = 
		{
			false:{
			paddingTop:".7%",
			width:this.props.width,
			margin:"0 auto",
			paddingBottom:".7%",
			textAlign:"left",
			color:"rgb(110, 110, 110)",
			display:"inherit",
			position:"relative",
			left:dynamicMargin[this.props.marginLeft!=undefined].left
			},
			true:
			{
			paddingTop:".7%",
			width:this.props.width,
			margin:"0 auto",
			paddingBottom:".7%",
			textAlign:"left",
			color:"rgb(110, 110, 110)",
			display:"none",
			position:"relative",
			left:dynamicMargin[this.props.marginLeft!=undefined].left
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

		
		const componentStyle= () =>style({

			marginBottom : ".2%",
			

		})



		return(
				<div className = {componentStyle()} >

					<div className = {dateWrapper()}>{this.props.fixture.date}</div>
					<BettingFixtureComponent marginLeft = {this.props.marginLeft} openDialogueBoxClick = {this.props.openDialogueBoxClick} fixture = {this.props.fixture} status = {this.props.status} toggleStatsBar = {this.props.toggleStatsBar} expandBetMenu = {this.props.expandBetMenu} width = {this.props.width}/>
				</div>
				
			)
	}

};




