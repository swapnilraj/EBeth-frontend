import * as React from 'react';
import { style } from 'typestyle';

interface IProps {
  currentDisplay: string;
}

export class ResultToggleButton extends React.Component<IProps, {}> {
  public render() {
    const resultsToggleButtonSection = style({
      height: '100%',
      width: '12.5%',
      float: 'right',
      marginRight: '2.5%',
      position: 'relative',
    });

    const resultsToggleButtonStyle = style({
      height: '60%',
      width: '100%',
      backgroundColor: 'rgb(251, 98, 53)',
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

    return (
      <div className={resultsToggleButtonSection}>
        <div className={resultsToggleButtonStyle}>
          <div className={buttonTextWrapper}>
            <div className={centerText}>My results</div>
          </div>
          <div className={arrowIcon}>
            <img className={tabArrowStyle} src="./images/tabmenu-arrow-down@2x.png" />
          </div>
        </div>
      </div>
    );
  }
}
