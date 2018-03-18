import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";

export class TimeSegment extends React.Component {
	

	constructor(props){
		    super(props);

		    this.state = 
		    {
				time:""
		    };
		  }

		
		 
		

	render()
	{
		var time = "11am";

		 	
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

		if(this.props.startTime && this.state.time =="")
		{
			this.setState({time:this.props.startTime});
		}
		return(
					<div className = {timeWrapper}>
						<div className = {centerText}>
							{this.state.time}
						</div>
					</div>
				

		)
	}

};




