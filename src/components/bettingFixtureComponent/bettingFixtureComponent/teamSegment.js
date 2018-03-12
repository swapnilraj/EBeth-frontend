import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";

export class TeamSegment extends React.Component {
	

	constructor(props){
		    super(props);

		    this.state = 
		    {
				hover:"mouseOut",
				team:"none"
		    };
		  }

		

	render()
	{
		var teamName = "Arsenal";
		var crestSource = "./images/arsenal.png";
		 // const dynamicButtonStyle = 
			// {
			  
			//   fontSize:"1.1em",
			//   mouseOver:
			//   {
			//   	backgroundColor:"rgb(26, 35, 42)"
			//   },
			//   mouseOut:
			//   {
			  	
			//   }

			  
			// }

		 // 	const buttonStyle = () =>
  	// 		style(
    				
   //  			{
   //  				backgroundColor : dynamicButtonStyle[this.state.hover].backgroundColor,
   //  				cursor:"pointer",
			// 	    height:"20%",
			// 		width:"100%",
			// 		position:"relative",
			// 		color:"white",
			// 		fontFamily:"lato",
			// 		fontSize:dynamicButtonStyle.fontSize
					
					
   //  			}
 		// 	);

		 

		
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
			//marginTop:"10%",
			position:"relative",
			display:"inline-block", 
			verticalAlign:"middle", 
			textAlign:"center"
			
		})
		
		const dynamicCenterText= {
			home:
			{
				position: 'absolute',
				top: '50%',
				left: '5%',
				marginRight: "-50%",
				transform: "translate(0%, -50%)"  
			},
			away:{
			margin: 0,
			position: 'absolute',
			top: '50%',
			right: '5%',
			marginRight: "0%",
			transform: "translate(0%, -50%)"  
			},
			none:{}

		}


		const centerText= () => style(dynamicCenterText[this.state.team])

		const homeOrAway = 
		{
			home:{
				float:"left",
				marginLeft:"5%",
				marginRight:"0%"
			},
			away:
			{
				float:"right",
				marginLeft:"0%",
				marginRight:"5%"
			},
			none:{}
		}

		const crestWrapper= () => 

		style({

			//margin: 0,
			height:"60%",
			display:"inline-block", 
			verticalAlign:"middle", 
			textAlign:"center",
			marginTop:"5%",
			position:"relative",
			marginLeft:homeOrAway[this.state.team].marginLeft,
			marginRight:homeOrAway[this.state.team].marginRight,
			float:homeOrAway[this.state.team].float,


		})

		const textWrapper= () => 
		style({

			//margin: 0,
			height:"100%",
			float:homeOrAway[this.state.team].float, 
			width:"60%",
			marginLeft:"2%",
			position:"relative"
			
		})



		if(this.props.teamName)
		{
			teamName = this.props.teamName;
		}

		if(this.props.crest)
		{
			crestSource = this.props.crest
		}

		if(this.props.team && this.state.team=="none")
		{
			this.setState({team:this.props.team})
		}



		return(
					<div className = {teamWrapper}>
						<div className = {crestWrapper()}>
							<img className = {crestStyle} src = {crestSource} />
						</div>
						<div className = {textWrapper()}>
							<div className = {centerText()}>{teamName}
							</div>
						</div>
					</div>
				

		)
	}

};




