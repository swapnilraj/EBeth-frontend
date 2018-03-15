import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";

export class TimeSegment extends React.Component {
	

	constructor(props){
		    super(props);

		    this.state = 
		    {
				hover:"mouseOut"
		    };
		  }

		 mouseOver() {
    		
    		this.setState({hover: 'mouseOver'});
    		
  		}

  		mouseOut() {
    		
    		this.setState({hover: 'mouseOut'});
    		//dynamicStyle.backgroundColor = colors["red"];
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
		return(
					<div className = {timeWrapper}>
						<div className = {centerText}>
						{time}
						</div>
					</div>
				

		)
	}

};




