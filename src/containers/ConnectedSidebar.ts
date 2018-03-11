/**
 * Connected Sidebar component
 */

import { bindActionCreators, Dispatch } from 'redux';

import { connect } from 'react-redux';

import { IState } from '../stores/root';
import { toggleSidebar } from '../stores/sidebar';

import Sidebar from '../components/Sidebar';

const mapState = (state: IState) => state.sidebar;

const mapDispatch = (dispatch: Dispatch<IState>) =>
  bindActionCreators(
    {
      toggleSidebar,
    },
    dispatch,
  );

const ConnectedSidebar = connect(mapState, mapDispatch)(Sidebar);

export default ConnectedSidebar;
