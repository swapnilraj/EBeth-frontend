import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";

export class TimeSegment extends React.Component {
	

	constructor(props){
		    super(props);

		  }

		
	render()
	{
		 	
		const timeWrapper= style({

			height:"100%",
			width:"15%",
			float:"left",
			position:"relative"
			

		})
		

		const centerText= style({

			margin: 0,
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginRight: "-50%",
			transform: "translate(-50%, -50%)"  

		})

		
		return(
					<div className = {timeWrapper}>
						<div className = {centerText}>
							{this.props.startTime}
						</div>
					</div>
				

		)
	}

};




