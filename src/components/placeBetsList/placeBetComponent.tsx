import * as React from 'react';
import { style } from 'typestyle';
import { types } from 'typestyle';
import { BettingFixtureComponent } from '../bettingFixtureComponent/bettingFixtureComponent';
import { IFixture } from '../Results';

interface IStatus {
  id: number;
  fixture: IFixture;
  message: string;
  potValue: number;
  status: string;
}

interface IProps {
  marginLeft: string;
  width: string;
  fixture: IFixture;
  status: IStatus;
  toggleStatsBar(currentState: string, id: number);
  expandBetMenu(teamname: string, currentFixture: IFixture);
}

export class PlaceBetComponent extends React.Component<IProps, {}> {
  public render() {
    const dynamicMargin = {
      true: {
        left: this.props.marginLeft,
      },
      false: {
        left: '0%',
      },
    };

    const dynamicDateWrapper = {
      false: {
        paddingTop: '.7%' as types.CSSGlobalValues,
        width: this.props.width as types.CSSGlobalValues,
        margin: '0 auto' as types.CSSGlobalValues,
        paddingBottom: '.7%' as types.CSSGlobalValues,
        textAlign: 'left' as types.CSSGlobalValues,
        color: 'rgb(110, 110, 110)' as types.CSSGlobalValues,
        display: 'inherit' as types.CSSDisplay,
        position: 'relative' as types.CSSGlobalValues,
        left: dynamicMargin[this.props.marginLeft !== undefined ? 'true' : 'false'].left,
      },
      true: {
        paddingTop: '.7%' as types.CSSGlobalValues,
        width: this.props.width as types.CSSGlobalValues,
        margin: '0 auto' as types.CSSGlobalValues,
        paddingBottom: '.7%' as types.CSSGlobalValues,
        textAlign: 'left' as types.CSSGlobalValues,
        color: 'rgb(110, 110, 110)' as types.CSSGlobalValues,
        display: 'none' as types.CSSDisplay,
        position: 'relative' as types.CSSGlobalValues,
        left: dynamicMargin[this.props.marginLeft !== undefined ? 'true' : 'false'].left,
      },
    };

    const dateWrapper = () => style(dynamicDateWrapper[this.props.fixture.date === '' ? 'true' : 'false']);

    const componentStyle = () =>
      style({
        marginBottom: '.2%',
      });

    return (
      <div className={componentStyle()}>
        <div className={dateWrapper()}>{this.props.fixture.date}</div>
        <BettingFixtureComponent
          marginLeft={this.props.marginLeft}
          fixture={this.props.fixture}
          status={this.props.status}
          toggleStatsBar={this.props.toggleStatsBar}
          expandBetMenu={this.props.expandBetMenu}
          width={this.props.width}
        />
      </div>
    );
  }
}
