import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";
import {SelectionPanel} from "./selectionPanel.js"
export class PlaceBetMenu extends React.Component {
	

	constructor(props){
		    super(props);

		    this.state = 
		    {
				date:"none",
				showDate:"false",
				display:"show",
				fixture:{},
				selectedPanel:"none"
				
		    };
		    this.minimise = this.minimise.bind(this);
		    this.selectTeam = this.selectTeam.bind(this);
		  }
		
		

	minimise()
	{
		this.setState({
			display:"hide"
		})
	}

	selectTeam(type)
	{
		this.setState({
			selectionPanel:type
		})
	}

	componentWillReceiveProps(nextProps)
		{
			this.setState({
				fixture:nextProps.fixture
			})
		}

	render()
	{



	

		const betMenu= style({

			position:"absolute",
			backgroundColor:"rgb(245,245,245)",
			top:"15%",
			bottom:"15%",
			width:"70%",
			left:"15%",
			boxShadow: "2px 4px 50px -5px rgba(0, 0, 0, 1)",
			borderRadius:"2px"


		})

		const dynamicBackdropStyle = 
		{
			show:{
				display:"initial"
			},
			hide:
			{
				display:"none"
			}
		}

		const opaqueBackdrop= style({

			position:"absolute",
			backgroundColor:"white",
			top:"0",
			bottom:"0",
			left:"0",
			right:"0",
			backgroundColor:"rgba(0, 0, 0, 0.6)",
			display:dynamicBackdropStyle[this.state.display].display


		})


		const header= style({

			position:"relative",
			height:"17.5%",
			width:"100%"
		})

		const heading= style({

			position:"relative",
			height:"100%",
			width:"90%",
			fontSize:"2.5em",
			float:"left"
		})
		
		const verticalAlign= style({

					margin: 0,
					position: 'absolute',
					top: '50%',
					transform: "translate(0%, -50%)",
					marginLeft:"5.5%" ,
					fontWeight:"bold",
					color:"rgb(251, 98, 53)" 

				})

		const cancelBox= style({

				position:"relative",
				height:"100%",
				width:"10%",
				fontSize:"2.5em",
				float:"right" 

				})

		const exText= style({

			margin: 0,
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginRight: "-60%",
			transform: "translate(-100%, -50%)" ,
			fontSize:"1em" ,
			fontFamily:"lato",
			fontWeigth:"bold",
			cursor:"pointer"

		})


		const subTextBar= style({

			position:"relative",
			width:"90%",
			height:"1%",
			margin:"0 auto",
			color:"rgb(100,100,100)",
			fontSize:".7em",
			fontFamily:"Lato"

		})


		const selectionPanel= style({

			height:"40%",
			width:"100%",
			marginTop:"2%"

		})


		const homePanel= style({

			height:"100%",
			width:"22.5%",
			backgroundColor:"blue",
			float:"left",
			marginLeft:"5.41%"

		})

		const drawPanel= style({

			height:"100%",
			width:"22.5%",
			backgroundColor:"blue",
			float:"left",
			marginLeft:"10.833%"

		})

		const awayPanel= style({

			height:"100%",
			width:"22.5%",
			backgroundColor:"blue",
			float:"left",
			marginLeft:"10.833%"

		})
		

		const centerText= style({

			margin: 0,
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginRight: "-50%",
			transform: "translate(-50%, -50%)" ,
			fontSize:".8em" 

		})


		const InputText= style({

			height:"2%",
			marginTop:"5%",
			width:"100%" ,
			position:"relative"

		})


		const inputBoxStyle= style({

		
			 //display: "block",
			 //float:"left",
             margin : "0 auto",
             height:"100%",
             width:"100%",
             textAlign:"right",
             fontSize:"1.2em"
             

		})

		const wrapper = style({

			
			height:"100%",
			width:"20%",
			float:"left",
			margin:"0 auto",
			backgroundColor:"yellow",
			marginLeft:"40%"


		})
		const inputBoxWrapper =  style({
			height:"6%",
			width:"100%",
			marginTop:"2%",
			position:"relative",

		})

		const currencyStyle =  style({
			float:"left",
			
			margin: 0,
			position: 'absolute',
			top: '55%',
			left: '30%',
			marginRight: "-50%",
			transform: "translate(-50%, -50%)" ,
			fontSize:"1em" 

		})

		const currencyTextWrapper =  style({
			
			width:"10%",
			height:"100%",
			float:"left",
			position:"relative",


		})

		const betButton =  style({
			
			height:"5%",
			width:"12.5%",
			backgroundColor:"rgb(251, 98, 53)",
			marginTop:"3%",
			margin:"0 auto",
			borderRadius:"16px",
			position:"relative",
			fontSize:"1.1em",
			color:"white",
			cursor:"pointer"

		})
		
		if(this.props.display && this.props.display != this.state.display)
		{
			console.log(this.props.display)
			this.setState({
				display:this.props.display
			})
		}
//
		return(
				<div className = {opaqueBackdrop}>
					<div className = {betMenu} >
						<div className = {header}>
							<div className = {heading}>
								<div className = {verticalAlign}>Place a bet</div>
							</div>
							<div className = {cancelBox}>
								<div onClick = {this.props.closeDialogueBox} className = {exText}>X</div>
							</div>
						</div>
						<div className = {subTextBar}>
							<div >WHAT WILL THE OUTCOME BE ?</div>
						</div>
						<div className = {selectionPanel}>
							<SelectionPanel selectFunction = {this.selectTeam} selected = {this.state.selectionPanel} panelType = "Home" teamName = {this.state.fixture.homeTeamName} marginLeft  ="9%" name = "Home"/>
							<SelectionPanel selectedFunction = {this.selectTeam} selected = {this.state.selectionPanel} panelType = "" teamName = "Draw" marginLeft  ="7%" name = "Draw"/>
							<SelectionPanel selectedFunction = {this.selectTeam} selected = {this.state.selectionPanel} panelType = "Away" teamName = {this.state.fixture.awayTeamName} marginLeft  ="7%" name = "Away"/>
						</div>
						<div className = {InputText}>
							<div className = {centerText}>How Much Ethereum ?</div>
						</div>
						

						<div className = {inputBoxWrapper}>
							<div className ={wrapper}>
								<input className = {inputBoxStyle} placeholder="0.00" />
								
							</div>
							<div className = {currencyTextWrapper}>
								<div className = {currencyStyle} > ETH</div>
							</div>
						</div>

						<div className = {betButton}>
							<div className = {centerText}>Place Bet</div>
						</div>


					</div>
				</div>
				
			)
	}

};




