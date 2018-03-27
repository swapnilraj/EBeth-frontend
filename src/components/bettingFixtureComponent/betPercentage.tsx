import * as React from 'react';
import { style } from 'typestyle';
import { types } from 'typestyle';
interface IProps {
  width: number;
  color: string;
}

export class BetPercentage extends React.Component<IProps, {}> {
  public render() {
    const dynamicBarColor = {
      backgroundColor: '#a1e5ed',
      width: '0%',
    };

    const betPercentageStyle = () =>
      style({
        height: '100%',
        width: dynamicBarColor.width,
        float: 'left' as types.CSSGlobalValues,
        backgroundColor: dynamicBarColor.backgroundColor,
      });

    if (this.props.color) {
      dynamicBarColor.backgroundColor = this.props.color;
    }

    if (this.props.width) {
      dynamicBarColor.width = (this.props.width * 100).toString() + '%';
    }

    return <div className={betPercentageStyle()} />;
  }
}
