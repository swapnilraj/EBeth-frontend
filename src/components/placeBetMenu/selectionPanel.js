import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";
import crests from '../../Crests.json';

export class SelectionPanel extends React.Component {
	

	constructor(props){
		    super(props);

		    this.state = 
		    {
				teamName:"",
				panelType:"",
				click:"unselected"
				
		    };
		    //this.highlightBox = this.highlightBox.bind(this)
		  }
		
	// highlightBox()
	// {
	// 	this.setState({
	// 		click:"selected"
	// 	})
	// }	

	componentWillReceiveProps(nextProps)
		{
			this.setState({
				teamName:nextProps.teamName
			})
			if(nextProps.selected == this.props.name)
			{
				this.setState({
					click:"selected"
				})
			}
			else
			{
				this.setState({
					click:"unselected"
				})
			}

			// if(this.props.name == nextProps.selected)
			// {
			// 	this.setState({
			// 	click:"selected"
			// })
			// }
			// else
			// {
			// 	this.setState({
			// 	click:"unselected"
			// })
			// }
		}	


	highlight()
	{
		
	}	

	render()
	{


		

		const dynamicPanelStyle = 
		{
			marginLeft:"5.41%" 
		}

		const highlight = 
		{
			selected:{
				 border: "5px solid rgb(251, 98, 53)"
			},
			unselected:{
				border:"none"
			}
		}
		const panelStyle= () =>style({

			height:"100%",
			width:"22.5%",
			backgroundColor:"white",
			float:"left",
			marginLeft:dynamicPanelStyle.marginLeft,
			boxShadow: "3px 3px 15px -5px rgba(0, 0, 0, 0.5)",
			cursor:"pointer",
			position:"relative",
			border:highlight[this.state.click].border
			

		})

		const teamName = style({

			height:"4%",
			width:"100%",
			marginTop:"0%",
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

		const crestContainer= style({
			position:"relative",
			height:"40%",
			width:"100%",
			position:"relative"

		})

		const crestStyle= style({
			height:"100%",
			width:"auto",
			display:"block",
			position:"relative",
			marginLeft:"auto",
			marginRight:"auto"

		})

		const teamType= style({
			height:"3%",
			width:"100%",
			top:"10%",
			position:"relative",


		})

		const paddingDiv= style({
			height:"15%",
			width:"100%",
			position:"relative"
			


		})
		
		if(this.props.marginLeft)
		{
			dynamicPanelStyle.marginLeft = this.props.marginLeft
		}

		if(this.props.teamName &&  this.state.teamName =="")
		{
			this.setState({
				teamName:this.props.teamName,
				panelType:this.props.panelType
			})
		}

		return(
				<div className = {panelStyle()} onClick = {() => this.props.selectFunction(this.props.name,this.state.teamName)}>
					<div className = {paddingDiv}></div>
					<div className = {teamName}><div className={centerText}>{this.state.teamName}</div></div>
					<div className = {paddingDiv}></div>
					<div className = {crestContainer}>
						<img className = {crestStyle} src = {"./images"+crests[this.state.teamName]} />
					</div>
					<div className = {teamType}><div className = {centerText}>{this.props.panelType}</div></div>
				</div>
				
			)
	}

};




