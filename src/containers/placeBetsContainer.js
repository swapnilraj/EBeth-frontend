import React from 'react';
import ReactDOM from 'react-dom';
import * as csstips from 'csstips';
import {style} from "typestyle";
import {SideBar} from "../components/sideBar/sideBar.js"
import {BettingFixtureComponent} from "../components/bettingFixtureComponent/bettingFixtureComponent.js"
import {PlaceBetMenu} from "../components/placeBetMenu/placeBetMenu.js"
import { connect } from "react-redux"
import {ListOfBettingComponents} from "../components/placeBetsList/listOfBettingComponents.js"
import {addBetComponentToState,toggleStatsBarFunc,updateBetFixtureList} from "../reducers/listOfBettingComponentsReducer"
import {onSelectTeam,onToggleBetMenuDisplay,onToggleValidInput,onUpdateBetValueInput} from "../reducers/betMenuReducer"


var Fixtures = class Fixtures {
  constructor(homeTeamName,awayTeamName,date,time,homeBets,drawBets,awayBets,potValue) {
    this.homeTeamName = homeTeamName;
    this.awayTeamName = awayTeamName;
    this.date = date;
    this.time = time;
    this.homeBets = homeBets;
    this.awayBets = awayBets;
    this.drawBets = drawBets;
    this.potValue = potValue;
  }
}

class placeBetsContainer extends React.Component {
	

	constructor(props){
		    super(props);

		    this.state = 
		    {
				"display":"hide",
				"fixture":{}
		    };
		    this.openDialogueBox = this.openDialogueBox.bind(this);
		    this.closeDialogueBox = this.closeDialogueBox.bind(this);
		    this.updateComponentsInList = this.updateComponentsInList.bind(this);
		    this.updateComponentsInList = this.updateComponentsInList.bind(this);
		    this.addBetComponentToState = this.addBetComponentToState.bind(this);
		    this.toggleStatsBar = this.toggleStatsBar.bind(this);
		    this.expandBetMenu = this.expandBetMenu.bind(this);
		    this.selectTeamToBetOn = this.selectTeamToBetOn.bind(this);
		    this.toggleValidUserInput =  this.toggleValidUserInput.bind(this);
		    this.updateInputValue  = this.updateInputValue.bind(this);
		  }

	updateComponentsInList(array){
		if(this.props.betComponent.fixture[0] != array[0])
		{
			this.props.onUpdateList(array)
		}
	
	}

	addBetComponentToState(betComponent){
		this.props.onNewBetComponentMade(betComponent)
	}

	toggleStatsBar(currentState, id){
		this.props.onStatsBarToggle(currentState,id)
	}

	expandBetMenu(currentState, fixture){
		this.props.onToggleBetMenuDisplay("hide",fixture)
	}

	selectTeamToBetOn(homeTeamName,panelType)
	{
		this.props.onSelectTeam(homeTeamName,panelType)
	}

	toggleValidUserInput()
	{
		this.props.onToggleValidInput()
	}

	updateInputValue(newInput)
	{
		this.props.onUpdateBetValueInput(newInput)
	}

		 
	

		openDialogueBox(fixture)
		{
			this.setState({
				"display":"show",
				fixture:fixture
			})
		}

		closeDialogueBox()
		{
		
			this.setState({
				"display":"hide"
			})
		}

		
		

	componentWillReceiveProps(nextProps)
	{
		console.log(nextProps)
		if(nextProps.fixtureList)
		{
			this.updateComponentsInList(this.props.fixtureList)
		}
		if(this.props.width)
		{

		}
	}

	render()
	{
		const dynamicHeader = 
		{
			true:
			{
				width:this.props.width
			},
			false:
			{
				width:"80%"
			}
		}
		
		const header =() =>style({
			height:"3.5em",
			width:dynamicHeader[this.props.width!=undefined].width,
			position:"relative",
			margin:"1.5em auto",
			left:this.props.marginLeft

		})

		const heading =style({
			fontSize:"2.5em",
			positon:"absolute",
			color:"rgb(251, 98, 53)",
			fontWeight:'bold'
		})

		const makeBetMenuClicked = 
		{
			true:
			{
				overflow:"auto"
			},
			false:
			{
				overflow:"hidden"
			}
		}

		const placeBetsContainer = () => style({
			position:"absolute",
			
			overflow:makeBetMenuClicked[(this.props.menu.display == "hide")].overflow,
			width:"80%",
		})

		const placeBetsWrapper = () => style({
			position:"absolute",
			top:"0",
			bottom:"0",
			left:"0",
			right:"0",
			overflow:makeBetMenuClicked[(this.props.menu.display == "hide")].overflow,
			width:"100%",
		})

		if(this.props.fixtureList)
		{
			this.updateComponentsInList(this.props.fixtureList)
		}

		
		return(
			<div className = {placeBetsWrapper()}>
				<div >
					<div className = {header()} onClick ={() => this.toggleValidUserInput()}>
						<div className = {heading}>Place Bets</div>
					</div>
					<ListOfBettingComponents  width ={this.props.width} openDialogueBoxClick = {this.openDialogueBox} fixtures = {this.props.betComponent.fixture} addBetComponentToState = {this.addBetComponentToState} componentStatus = {this.props.betComponentStatus} toggleStatsBar = {this.toggleStatsBar} expandBetMenu = {this.expandBetMenu} updateFixtures = {this.updateComponentsInList} marginLeft = {this.props.marginLeft}/>
					<PlaceBetMenu closeDialogueBox = {this.closeDialogueBox} display = {this.props.menu.display} fixture = {this.props.menu.fixture} toggleMenuDisplay = {this.expandBetMenu} menuState = {this.props.menu} selectPanel = {this.selectTeamToBetOn} toggleValidUserInput = {this.toggleValidUserInput} updateInputValue = {this.updateInputValue}/>
				</div>
			</div>
			)
	}

};

const mapDispatchToProps  ={

  onUpdateList:updateBetFixtureList,
  onNewBetComponentMade:addBetComponentToState,
  onStatsBarToggle:toggleStatsBarFunc,
  onToggleBetMenuDisplay:onToggleBetMenuDisplay,
  onSelectTeam:onSelectTeam,
  onToggleValidInput:onToggleValidInput,
  onUpdateBetValueInput:onUpdateBetValueInput

}

const mapStateToProps = state => ({
		betComponent:state.betComponent,
		betComponentStatus:state.betComponent.components,
		menu:state.menu
	})

export const PlaceBetsContainer =  connect(mapStateToProps, mapDispatchToProps)(placeBetsContainer)




