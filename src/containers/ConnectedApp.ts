/**
 * Connected App component
 */

import { bindActionCreators, Dispatch } from 'redux';

import { connect } from 'react-redux';

import { IState } from '../stores/root';

import App from '../components/App';

const mapDispatch = (dispatch: Dispatch<IState>) => bindActionCreators({}, dispatch);

const ConnectedApp = connect(null, mapDispatch)(App);

export default ConnectedApp;
