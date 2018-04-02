import * as React from 'react';
import { style } from 'typestyle';
import * as crests from '../../Crests.json';
import { IFixture } from '../Results';

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
  teamName: string;
  name: string;
  panelType: string;
  marginLeft: string;
  menuState: ImenuStats;
  selectPanel(teamname: string, panelType: string);
}

export class SelectionPanel extends React.Component<IProps, {}> {
  public render() {
    const dynamicPanelStyle = {
      marginLeft: '5.41%',
    };

    const highlight = {
      true: {
        border: '5px solid rgb(251, 98, 53)',
      },
      false: {
        border: 'none',
      },
    };
    const panelStyle = () =>
      style({
        height: '100%',
        width: '22.5%',
        backgroundColor: 'white',
        float: 'left',
        marginLeft: dynamicPanelStyle.marginLeft,
        boxShadow: '3px 3px 15px -5px rgba(0, 0, 0, 0.5)',
        cursor: 'pointer',
        position: 'relative',
        border: highlight[this.props.menuState.selected.selectedTab === this.props.name ? 'true' : 'false'].border,
      });

    const teamName = style({
      height: '4%',
      width: '100%',
      marginTop: '0%',
      position: 'relative',
    });

    const centerText = style({
      margin: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    });

    const crestContainer = style({
      position: 'relative',
      height: '40%',
      width: '100%',
    });

    const crestStyle = style({
      height: '100%',
      width: 'auto',
      display: 'block',
      position: 'relative',
      marginLeft: 'auto',
      marginRight: 'auto',
    });

    const teamType = style({
      height: '3%',
      width: '100%',
      top: '10%',
      position: 'relative',
    });

    const paddingDiv = style({
      height: '15%',
      width: '100%',
      position: 'relative',
    });

    if (this.props.marginLeft) {
      dynamicPanelStyle.marginLeft = this.props.marginLeft;
    }

    return (
      <div className={panelStyle()} onClick={() => this.props.selectPanel(this.props.teamName, this.props.name)}>
        <div className={paddingDiv} />
        <div className={teamName}>
          <div className={centerText}>{this.props.teamName}</div>
        </div>
        <div className={paddingDiv} />
        <div className={crestContainer}>
          <img alt="Crest" className={crestStyle} src={'./images' + crests[this.props.teamName]} />
        </div>
        <div className={teamType}>
          <div className={centerText}>{this.props.panelType}</div>
        </div>
      </div>
    );
  }
}
