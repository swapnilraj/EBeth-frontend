import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";

export class TeamSegment extends React.Component {
	

	constructor(props){
		    super(props);

		   
		  }

		

	render()
	{
		var teamName = "Arsenal";
		var crestSource = "./images/arsenal.png";
	
		
		const teamWrapper= style({

			height:"100%",
			width:"30%",
			float:"left",
			display:"inline-block",
			verticalAlign:"middle",
			position:"relative"
			

		})

		const crestStyle = style({
			height:"100%",
			width:"auto",
			position:"relative",
			display:"inline-block", 
			verticalAlign:"middle", 
			textAlign:"center"
			
		})
		
		const dynamicCenterText= {
			Home:
			{
				position: 'absolute',
				top: '50%',
				left: '5%',
				marginRight: "-50%",
				transform: "translate(0%, -50%)"  
			},
				Away:{
				margin: 0,
				position: 'absolute',
				top: '50%',
				right: '5%',
				marginRight: "0%",
				transform: "translate(0%, -50%)"  
				},
				none:{}

		}


		const centerText= () => style(dynamicCenterText[this.props.team])

		const homeOrAway = 
		{
			Home:{
				
				float:"left",
				marginLeft:"5%",
				marginRight:"0%"
			},
			Away:
			{
				float:"right",
				marginLeft:"0%",
				marginRight:"5%",
				backgroundColor:"white"
			},
			none:{}
		}
		const expandedOrContracted = 
		{
			expanded:
			{
				display:"inherit",
			},
			contracted:
			{
				display:"none"
			},
			none:
			{
				display:"none"
			}
		}

		const dynamicHomeAwayText= {
			Home:
			{
				color:"rgb(140, 140, 140)",
				position: 'absolute',
				top: '75%',
				left: '5%',
				marginRight: "-50%",
				transform: "translate(0%, -50%)" ,
				fontSize:".8em", 
				
			},
				Away:
				{
				color:"rgb(140, 140, 140)",
				margin: 0,
				position: 'absolute',
				top: '75%',
				right: '5%',
				marginRight: "0%",
				transform: "translate(0%, -50%)" ,
				fontSize:".8em" ,
				
				},
				none:{}

		}


		const homeOrAwayText= () => style(
			dynamicHomeAwayText[this.props.team],
			expandedOrContracted[this.props.status]
			)

	
		const crestWrapper= () => 

		style({

			//margin: 0,
			height:"60%",
			display:"inline-block", 
			verticalAlign:"middle", 
			textAlign:"center",
			marginTop:"5%",
			position:"relative",
			marginLeft:homeOrAway[this.props.team].marginLeft,
			marginRight:homeOrAway[this.props.team].marginRight,
			float:homeOrAway[this.props.team].float,


		})

		const textWrapper= () => 
		style({

			//margin: 0,
			
			height:"100%",
			float:homeOrAway[this.props.team].float, 
			width:"60%",
			marginLeft:"2%",
			position:"relative"
			
		})



		return(
					<div className = {teamWrapper}>
						<div className = {crestWrapper()}>
							<img className = {crestStyle} src = {this.props.crest} />
						</div>
						<div className = {textWrapper()}>
							<div className = {centerText()}>{this.props.teamName}
							</div>
							<div className = {homeOrAwayText()}>{this.props.team}
							</div>
						</div>
					</div>
				

		)
	}

};




