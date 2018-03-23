import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";

export class PotValue extends React.Component {
	

	constructor(props){
		    super(props);

		  }

		

	render()
	{
		var potValue = "Pot: 0.00 ETH";

		
		

		const centerText= style({

			margin: 0,
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginRight: "-50%",
			transform: "translate(-50%, -50%)"  

		})

		const wrapper= style({

			height:"50%",
			width:"100%",
			position:"relative", 

		})

		return(
					<div className = {wrapper}>
						<div className = {centerText}>
							{this.props.fixture.potValue +" ETH"}
						</div>
					</div>
				
				

		)
	}

};




