import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";
import {SelectionPanel} from "./selectionPanel.js"
import swal from 'sweetalert2'
import {creatStore} from 'redux';

var Bet = class Bet {
  constructor(teamName,amount) {
    this.teamName = teamName;
    this.amount = amount;
  }
};

 
export class PlaceBetMenu extends React.Component {
	

	constructor(props){
		    super(props);

		 
		    this.handleUserInput = this.handleUserInput.bind(this);
		    this.makeBet = this.makeBet.bind(this);
		  }
		
		

makeBet()
{
	
	var outcome = ""
	
	if(this.props.menuState.selected.selectedTab == "Draw")
	{
		outcome  = " the match will be a draw."
	}
	else if(this.props.menuState.selected.selectTeam== this.props.fixture.homeTeamName)
	{
		outcome  = " "+ this.props.menuState.fixture.homeTeamName +" will win"
	}
	else
	{
			outcome  = " "+ this.props.menuState.fixture.awayTeamName +" will win"
	
	}
	 swal({
		title: "You Placed A Bet!",
		text: "You have bet "+this.props.menuState.selected.betInputValue+" ETH, that" +outcome,
		type: "success",
		confirmButtonColor: "rgb(251, 98, 53)",
		confirmButtonText: "OK"
})
	 this.props.toggleMenuDisplay("show")
}

handleUserInput(e)
  {
  	console.log(this.props)
  	if(e.target.value != "" && isNaN(e.target.value) ==false && parseFloat(e.target.value)>0 ){
  		
  		if(this.props.menuState.selected.validBetAmount == false)
     	 {
     	 	this.props.toggleValidUserInput()
     	 }
  	}
  	else
  	{
  		if(this.props.menuState.selected.validBetAmount == true)
     	 {
     	 	this.props.toggleValidUserInput()
     	 }
  	}
  	this.props.updateInputValue(e.target.value)
   
  }



	
	componentWillReceiveProps(nextProps)
		{
			
			
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
			borderRadius:"2px",
			"WebkitUserSelect": "none",
			"MozUserSelect": "none",
			"MsUserSelect": "none"


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
			display:dynamicBackdropStyle[this.props.menuState.display].display


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
			marginTop:"2%",

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
			marginLeft:"40%"


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
			
			width:"30%",
			height:"40%",
			float:"left",
			position:"relative",


		})

		const currencyText= style({

			margin: 0,
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginRight: "-50%",
			transform: "translate(-100%, -50%)" ,
			fontSize:"1.1em" 

		})

		

		const betInputWrapper =  style({
			
			height:"37.5%",
			width:"100%",
			position:"relative"
			

		})

		const centralComponent =  style({
			
			height:"100%",
			width:"30%",
			position:"relative",
			margin:"0 auto"
			

		})

		const inputBoxWrapper =  style({
			
			height:"40%",
			width:"100%",
			position:"relative",
			marginLeft:"10%"
			
			

		})

		const wrapInputBox =  style({
			
			height:"40%",
			width:"70%",
			position:"relative",
			float:"left"
			

		})

		const tenPercentMargin = style({

			height:"10%",
			width:"100%"
		})

		const fifteenPercentMargin = style({

			height:"15%",
			width:"100%"
		})


		const twentyPercentMargin = style({

			height:"25%",
			width:"100%",
		})

		const fivePercentMargin = style({

			height:"5%",
			width:"100%"
		})
		
		const inputQuestionText = style({
			fontSize:".8em"
		})

		const inputStyle = style({
			height:"90%",
			width:"95%",
			textAlign:"right",
			fontSize:"1.2em"
		})

		const overlayDynamicStyle = 
		{

			true:
			{
				opacity:"0",
				display:"none"
			},
			false:
			{
				opacity:".65",
				display:"initial"
			}
		}

		const overlay1 = () => style({
			height:"100%",
			width:"100%",
			position:"absolute",
			backgroundColor:"#F5F5F5",
			zIndex:"20",
			opacity:overlayDynamicStyle[(this.props.menuState.selected.selectedTab != "none")].opacity,
			display:overlayDynamicStyle[(this.props.menuState.selected.selectedTab != "none")].display
		})


		const betButtonWrapper = () => style({
			height:"15%",
			width:"100%",
			position:"relative"
			
		})

		const betButton =  style({
			
			height:"100%",
			width:"50%",
			backgroundColor:"rgb(251, 98, 53)",
			margin:"0 auto",
			borderRadius:"16px",
			position:"relative",
			fontSize:"1.4em",
			color:"white",
			cursor:"pointer",

		})

		const overlay2 = () => style({
			top:"0",
			bottom:"0",
			left:"0",
			right:"0",
			position:"absolute",
			backgroundColor:"#F5F5F5",
			zIndex:"20",
			opacity:overlayDynamicStyle[(this.props.menuState.selected.validBetAmount)].opacity,
			display:overlayDynamicStyle[(this.props.menuState.selected.validBetAmount)].display
		})




		return(
				<div className = {opaqueBackdrop}>
					<div className = {betMenu} >
						<div className = {header}>
							<div className = {heading}>
								<div className = {verticalAlign}>Place a bet</div>
							</div>
							<div className = {cancelBox}>
								<div onClick = {() => this.props.toggleMenuDisplay("show")} className = {exText}>X</div>
							</div>
						</div>
						<div className = {subTextBar}>
							<div >WHAT WILL THE OUTCOME BE ?</div>
						</div>
						<div className = {selectionPanel}>
							<SelectionPanel selectFunction = {this.selectTeam}  panelType = "Home" teamName = {this.props.menuState.fixture.homeTeamName} marginLeft  ="9%" name = "Home" menuState =  {this.props.menuState} selectPanel = {this.props.selectPanel} />
							<SelectionPanel selectFunction = {this.selectTeam}  panelType = "" teamName = "Draw" marginLeft  ="7%" name = "Draw" menuState =  {this.props.menuState} selectPanel = {this.props.selectPanel} />
							<SelectionPanel selectFunction = {this.selectTeam}  panelType = "Away" teamName = {this.props.menuState.fixture.awayTeamName} marginLeft  ="7%" name = "Away" menuState =  {this.props.menuState} selectPanel = {this.props.selectPanel} />
						</div>
						
						
						<div className = {betInputWrapper}>
							<div className = {centralComponent}>
								<div className = {fifteenPercentMargin}></div>
								<div className = {inputBoxWrapper}>
									<div className = {overlay1()}></div>
									<div className = {inputQuestionText}>HOW MUCH ETHEREUM ?</div>
									<div className = {fifteenPercentMargin}></div>
									<div className = {wrapInputBox}>
										<input value = {this.props.menuState.selected.betInputValue} onChange = {this.handleUserInput} className = {inputStyle} placeholder = "0.00"/>
									</div>
									<div className = {currencyTextWrapper}>
										<div className  ={currencyText}>ETH</div>
									</div>
								</div>
								<div className = {tenPercentMargin}></div>
								<div className = {betButtonWrapper()}>
									<div className = {overlay2()}></div>
									<div onClick = {this.makeBet} className = {betButton}>
										<div className = {centerText}>Place Bet</div>
									</div>
								</div>
							</div>
						</div>


					</div>
				</div>
				
			)
	}

};




