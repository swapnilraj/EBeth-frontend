/**
 * Round image component
 */
import * as React from 'react';
import Blockies from 'react-blockies';
import { style } from 'typestyle';

const container = style({
  borderRadius: '50%',
});

interface IProps {
  userAccount: string;
  fetchUserAccount();
}

class RoundImg extends React.Component<IProps, {}> {
  public componentDidMount() {
    const { fetchUserAccount } = this.props;
    fetchUserAccount();
  }

  public render() {
    return <Blockies seed={this.props.userAccount || 'Ebeth'} className={container} />;
  }
}
export default RoundImg;
