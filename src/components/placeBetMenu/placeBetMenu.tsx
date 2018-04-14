import * as React from 'react';
import swal from 'sweetalert2';
import { style, types } from 'typestyle';
import { Outcome, Text } from '../../utils/constants';
import { IFixture } from '../Results';
import { SelectionPanel } from './selectionPanel';

interface ISelected {
  betInputValue: string;
  selectTeam: string;
  selectedTab: string;
  validBetAmount: boolean;
}

interface ImenuStats {
  display: string;
  fixture: IFixture;
  selected: ISelected;
}

interface IProps {
  menuState: ImenuStats;
  screen: string;
  display: string;
  fixture: IFixture;
  selectPanel(homeTeamName: string, panelType: string);
  toggleMenuDisplay(currentState: string, fixture: IFixture);
  updateInputValue(newInput: string);
  toggleValidUserInput();
  placeBet(betEvent: string, outcomeIndex: number, value: string);
  changeBet(betEvent: string, outcomeIndex: number);
}

export class PlaceBetMenu extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.makeBet = this.makeBet.bind(this);
    this.editBet = this.editBet.bind(this);
    this.outcomeText = this.outcomeText.bind(this);
  }

  public outcomeText(): string {
    let outcome = '';
    if (this.props.menuState.selected.selectedTab === 'Draw') {
      outcome = ' the match will be a draw.';
    } else if (this.props.menuState.selected.selectTeam === this.props.fixture.homeTeamName) {
      outcome = ' ' + this.props.menuState.fixture.homeTeamName + ' will win';
    } else {
      outcome = ' ' + this.props.menuState.fixture.awayTeamName + ' will win';
    }
    return outcome;
  }

  public editBet() {
    const outcome = this.outcomeText();
    swal({
      title: Text.editBetPopUpTitle,
      text: Text.editBetPopUpText + outcome,
      type: 'success',
      confirmButtonColor: 'rgb(251, 98, 53)',
      confirmButtonText: 'OK',
    });
    this.props.toggleMenuDisplay('show', this.props.fixture);

    // Uncomment after adding changeBet to props
    const outcomeIndex = Outcome[this.props.menuState.selected.selectedTab];
    this.props.changeBet(this.props.fixture.betEvent, outcomeIndex);
  }

  public makeBet() {
    const outcome = this.outcomeText();
    swal({
      title: Text.placeBetPopUpTitle,
      text: 'You have bet ' + this.props.menuState.selected.betInputValue + ' ETH, that' + outcome,
      type: 'success',
      confirmButtonColor: 'rgb(251, 98, 53)',
      confirmButtonText: 'OK',
    });
    this.props.toggleMenuDisplay('show', this.props.fixture);
    const outcomeIndex = Outcome[this.props.menuState.selected.selectedTab];

    this.props.placeBet(this.props.fixture.betEvent, outcomeIndex, this.props.menuState.selected.betInputValue);
  }

  public handleUserInput(e) {
    if (e.target.value !== '' && isNaN(e.target.value) === false && parseFloat(e.target.value) > 0) {
      if (this.props.menuState.selected.validBetAmount === false) {
        this.props.toggleValidUserInput();
      }
    } else {
      if (this.props.menuState.selected.validBetAmount === true) {
        this.props.toggleValidUserInput();
      }
    }
    this.props.updateInputValue(e.target.value);
  }

  public render() {
    const betMenu = style({
      position: 'absolute',
      backgroundColor: 'rgb(245,245,245)',
      top: '15%',
      bottom: '15%',
      width: '70%',
      left: '15%',
      boxShadow: '2px 4px 50px -5px rgba(0, 0, 0, 1)',
      borderRadius: '2px',
      '-moz-user-select': 'none',
      '-webkit-user-select': 'none',
      '-ms-user-select': 'none',
    });

    const dynamicBackdropStyle = {
      show: {
        display: 'initial',
      },
      hide: {
        display: 'none',
      },
    };

    const opaqueBackdrop = style({
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: dynamicBackdropStyle[this.props.menuState.display].display,
    });

    const header = style({
      position: 'relative',
      height: '17.5%',
      width: '100%',
    });

    const heading = style({
      position: 'relative',
      height: '100%',
      width: '90%',
      fontSize: '2.5em',
      float: 'left',
    });

    const verticalAlign = style({
      margin: 0,
      position: 'absolute',
      top: '50%',
      transform: 'translate(0%, -50%)',
      marginLeft: '5.5%',
      fontWeight: 'bold',
      color: 'rgb(251, 98, 53)',
    });

    const cancelBox = style({
      position: 'relative',
      height: '100%',
      width: '10%',
      fontSize: '2.5em',
      float: 'right',
    });

    const exText = style({
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-60%',
      transform: 'translate(-100%, -50%)',
      fontSize: '1em',
      fontFamily: 'lato',
      fontWeight: 'bold',
      cursor: 'pointer',
    });

    const subTextBar = style({
      position: 'relative',
      width: '90%',
      height: '1%',
      margin: '0 auto',
      color: 'rgb(100,100,100)',
      fontSize: '.7em',
      fontFamily: 'Lato',
    });

    const selectionPanel = style({
      height: '40%',
      width: '100%',
      marginTop: '2%',
    });

    const centerText = style({
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '.8em',
    });

    const currencyTextWrapper = style({
      width: '30%',
      height: '40%',
      float: 'left',
      position: 'relative',
    });

    const currencyText = style({
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-100%, -50%)',
      fontSize: '1.1em',
    });

    const betInputWrapper = style({
      height: '37.5%',
      width: '100%',
      position: 'relative',
    });

    const centralComponent = style({
      height: '100%',
      width: '30%',
      position: 'relative',
      margin: '0 auto',
    });

    const inputBoxWrapper = style({
      height: '40%',
      width: '100%',
      position: 'relative',
      marginLeft: '10%',
    });

    const wrapInputBox = style({
      height: '40%',
      width: '70%',
      position: 'relative',
      float: 'left',
    });

    const tenPercentMargin = style({
      height: '10%',
      width: '100%',
    });

    const fifteenPercentMargin = style({
      height: '15%',
      width: '100%',
    });

    const inputQuestionText = style({
      fontSize: '.8em',
    });

    const inputStyle = style({
      height: '90%',
      width: '95%',
      textAlign: 'right',
      fontSize: '1.2em',
    });

    const overlayDynamicStyle = {
      true: {
        opacity: '0',
        display: 'none',
      },
      false: {
        opacity: '.65',
        display: 'initial',
      },
    };

    const overlay1 = () =>
      style({
        height: '100%' as types.CSSGlobalValues,
        width: '100%' as types.CSSGlobalValues,
        position: 'absolute' as types.CSSGlobalValues,
        backgroundColor: '#F5F5F5' as types.CSSGlobalValues,
        zIndex: '20' as types.CSSGlobalValues,
        opacity: overlayDynamicStyle[this.props.menuState.selected.selectedTab !== 'none' ? 'true' : 'false']
          .opacity as types.CSSGlobalValues,
        display: overlayDynamicStyle[this.props.menuState.selected.selectedTab !== 'none' ? 'true' : 'false']
          .display as types.CSSDisplay,
      });

    const betButtonWrapper = () =>
      style({
        height: '15%',
        width: '100%',
        position: 'relative',
      });

    const betButton = style({
      height: '100%',
      width: '50%',
      backgroundColor: 'rgb(251, 98, 53)',
      margin: '0 auto',
      borderRadius: '16px',
      position: 'relative',
      fontSize: '1.4em',
      color: 'white',
      cursor: 'pointer',
    });

    const overlay2 = () =>
      style({
        top: '0' as types.CSSGlobalValues,
        bottom: '0' as types.CSSGlobalValues,
        left: '0' as types.CSSGlobalValues,
        right: '0' as types.CSSGlobalValues,
        position: 'absolute' as types.CSSGlobalValues,
        backgroundColor: '#F5F5F5' as types.CSSGlobalValues,
        zIndex: '20' as types.CSSGlobalValues,
        opacity: overlayDynamicStyle[this.props.menuState.selected.validBetAmount === true ? 'true' : 'false']
          .opacity as types.CSSGlobalValues,
        display: overlayDynamicStyle[this.props.menuState.selected.validBetAmount === true ? 'true' : 'false']
          .display as types.CSSDisplay,
      });

    const editBet = this.props.screen === 'MY_BETS';

    const inputBox = editBet ? null : (
      <div className={inputBoxWrapper}>
        <div className={overlay1()} />
        <div className={inputQuestionText}>HOW MUCH ETHEREUM ?</div>
        <div className={fifteenPercentMargin} />
        <div className={wrapInputBox}>
          <input
            value={this.props.menuState.selected.betInputValue}
            onChange={this.handleUserInput}
            className={inputStyle}
            placeholder="0.00"
          />
        </div>
        <div className={currencyTextWrapper}>
          <div className={currencyText}>ETH</div>
        </div>
      </div>
    );

    return (
      <div className={opaqueBackdrop}>
        <div className={betMenu}>
          <div className={header}>
            <div className={heading}>
              <div className={verticalAlign}>{editBet ? Text.editBetMenuTitle : Text.placeBetMenuTitle}</div>
            </div>
            <div className={cancelBox}>
              <div onClick={() => this.props.toggleMenuDisplay('show', this.props.fixture)} className={exText}>
                X
              </div>
            </div>
          </div>
          <div className={subTextBar}>
            <div>WHAT WILL THE OUTCOME BE ?</div>
          </div>
          <div className={selectionPanel}>
            <SelectionPanel
              panelType="Home"
              teamName={this.props.menuState.fixture.homeTeamName}
              marginLeft="9%"
              name="Home"
              menuState={this.props.menuState}
              selectPanel={this.props.selectPanel}
            />
            <SelectionPanel
              panelType=""
              teamName="Draw"
              marginLeft="7%"
              name="Draw"
              menuState={this.props.menuState}
              selectPanel={this.props.selectPanel}
            />
            <SelectionPanel
              panelType="Away"
              teamName={this.props.menuState.fixture.awayTeamName}
              marginLeft="7%"
              name="Away"
              menuState={this.props.menuState}
              selectPanel={this.props.selectPanel}
            />
          </div>

          <div className={betInputWrapper}>
            <div className={centralComponent}>
              <div className={fifteenPercentMargin} />
              {inputBox}
              <div className={tenPercentMargin} />
              <div className={betButtonWrapper()}>
                <div className={editBet ? overlay1() : overlay2()} />
                <div onClick={editBet ? this.editBet : this.makeBet} className={betButton}>
                  <div className={centerText}>{editBet ? Text.editBetMenuButton : Text.placeBetMenuButton}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
