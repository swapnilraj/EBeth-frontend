import * as React from 'react';
import { style } from 'typestyle';
import { types } from 'typestyle';
import { IMyBets } from '../../reducers/myBetsReducer';

import { defaultResult } from '../resultComponent/listOfResults';
import { IFixture, IResultComponent } from '../Results';
import { MyBetsComponent } from './myBetsComponent';

interface IProps {
  marginLeft: string;
  width: string;
  fixture: IFixture;
  status: IResultComponent;
  bet: IMyBets;
  id: number;
  toggleStatsBar(id: number);
  expandBetMenu(teamname: string, currentFixture: IFixture);
}

export class MyBetWithDate extends React.Component<IProps, {}> {
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

    const dateWrapper = () => style(dynamicDateWrapper[this.props.bet.fixture.date === '' ? 'true' : 'false']);

    const componentStyle = () =>
      style({
        marginBottom: '.2%',
      });

    return (
      <div className={componentStyle()}>
        <div className={dateWrapper()}>{this.props.bet.fixture.date}</div>
        <MyBetsComponent
          marginLeft={this.props.marginLeft}
          fixture={this.props.fixture}
          status={this.props.status}
          toggleStatsBar={this.props.toggleStatsBar}
          expandBetMenu={this.props.expandBetMenu}
          width={this.props.width}
          result={defaultResult}
          bet={this.props.bet}
          id={this.props.id}
        />
      </div>
    );
  }
}
