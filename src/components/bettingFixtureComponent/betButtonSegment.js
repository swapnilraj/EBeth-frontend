import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";

export class BetButtonSegment extends React.Component {
	



	constructor(props){
		    super(props);

		    
		  }

		

	render()
	{
		var message = "Show More";

		 	
		const betButtonWrapper= style({

			height:"100%",
			width:"25%",
			float:"left"
			

		})

		const container= style({

			height:"100%",
			width:"50%",
			float:"left",
			position:"relative"
			

		})
		
		 const centerText= style({

			margin: 0,
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginRight: "-50%",
			transform: "translate(-50%, -50%)" ,
			cursor:"pointer" 

		})

		 const betButton= style({
				height:"40%",
				width:"70%",
				borderRadius:"15px",
				backgroundColor:"rgb(251, 98, 53);",
				position: 'absolute',
				top: '50%',
				color:"white",
				transform: "translate(0%, -50%)" ,
				cursor:"pointer" 

		})
		 
		 if(this.props.message)
		 {
		 	message = this.props.message;
		 }

		return(
				<div className = {betButtonWrapper}>
					<div className = {container}>
						<div className = {centerText} onClick = {this.props.showMore}>{message}</div>
					</div>
					<div  className = {container}>
						<div onClick = {() => this.props.expandBetMenu("hide",this.props.fixture)} className = {betButton} >
							<div className = {centerText}>BET
							</div>
						</div>
					</div>
				</div>
				

		)
	}

};




