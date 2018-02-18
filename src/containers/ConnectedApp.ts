/**
 * Connected App component
 */

import { bindActionCreators, Dispatch } from 'redux';

import { connect } from 'react-redux';

import { IState } from '../stores/root';

import { startTimer, stopTimer } from '../stores/timer';

import App from '../components/App';

const mapState = ({ timer }: IState) => timer;

const mapDispatch = (dispatch: Dispatch<IState>) => bindActionCreators({
  startTimer,
  stopTimer,
}, dispatch);

const ConnectedApp = connect(mapState, mapDispatch)(App);

export default ConnectedApp;
