/**
 * Connected RoundImg component
 */

import { bindActionCreators, Dispatch } from 'redux';

import { connect } from 'react-redux';

import { fetchUserAccount } from '../stores/contract';
import { IState } from '../stores/root';

import RoundImg from '../components/RoundImg';

const mapState = (state: IState) => state.contract.userAccount;

const mapDispatch = (dispatch: Dispatch<IState>) =>
  bindActionCreators(
    {
      fetchUserAccount,
    },
    dispatch,
  );

const ConnectedRoundImg = connect(mapState, mapDispatch)(RoundImg);

export default ConnectedRoundImg;
