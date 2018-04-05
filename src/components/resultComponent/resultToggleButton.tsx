import * as React from 'react';
import { style, types } from 'typestyle';
import { ITabState } from '../Results';

interface IProps {
  currentDisplay: string;
  tabState: ITabState;
  switchTab(tabState: ITabState);
  loadNewResults(currentState: string);
}

export class ResultToggleButton extends React.Component<IProps, {}> {
  public changeTab() {
    this.props.switchTab(this.props.tabState);
  }

  public changeResultsScreen() {
    this.props.loadNewResults(this.props.tabState.message);
  }

  public render() {
    const resultsToggleButtonSection = style({
      height: '100%',
      width: '12.5%',
      float: 'right',
      marginRight: '2.5%',
      position: 'relative',
    });

    const dynamicColoring = {
      backgroundColor: this.props.tabState.color,
    };
    const resultsToggleButtonStyle = () =>
      style({
        height: '60%',
        width: '100%',
        backgroundColor: dynamicColoring.backgroundColor,
        position: 'relative',
        cursor: 'pointer',
        boxShadow: '0 2px 5px -1px rgba(0, 0, 0, 0.31)',
      });

    const buttonTextWrapper = style({
      height: '100%',
      width: '50%',
      marginLeft: '20%',
      color: 'white',
      fontSize: '1.2em',
      position: 'relative',
      float: 'left',
    });

    const centerText = style({
      margin: 0,
      position: 'absolute',
      top: '50%',
      marginRight: '-50%',
      transform: 'translate(0%, -50%)',
      fontSize: '.8em',
    });

    const centerTextDropDown = style({
      margin: 0,
      position: 'absolute',
      top: '50%',
      marginRight: '-50%',
      transform: 'translate(0%, -50%)',
      fontSize: '.8em',
      color: 'black',
    });

    const arrowIcon = style({
      height: '100%',
      width: '20%',
      position: 'relative',
      float: 'left',
    });

    const tabArrowStyle = style({
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '20%',
    });

    const dynamicDropDown = {
      true: {
        display: 'initial',
      },
      false: {
        display: 'none',
      },
    };

    const dropDownStyle = () =>
      style({
        height: '60%',
        width: '100%',
        backgroundColor: 'white',
        float: 'left',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: '0 2px 5px -1px rgba(0, 0, 0, 0.31)',
        display: dynamicDropDown[this.props.tabState.expanded ? 'true' : 'false'].display as types.CSSDisplay,
      });

    return (
      <div className={resultsToggleButtonSection}>
        <div className={resultsToggleButtonStyle()} onClick={() => this.changeTab()}>
          <div className={buttonTextWrapper}>
            <div className={centerText}>{this.props.tabState.message}</div>
          </div>
          <div className={arrowIcon}>
            <img
              className={tabArrowStyle}
              src={
                this.props.tabState.expanded === true ? './images/assets@2x.png' : './images/tabmenu-arrow-down@2x.png'
              }
            />
          </div>
        </div>
        <div className={dropDownStyle()} onClick={() => this.changeResultsScreen()}>
          <div className={buttonTextWrapper}>
            <div className={centerTextDropDown}>
              {this.props.tabState.message === 'My results' ? 'All results' : 'My results'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
