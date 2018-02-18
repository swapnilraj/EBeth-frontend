/**
 * Application store configuration
 */

import { applyMiddleware, compose, createStore } from 'redux';

import { createEpicMiddleware } from 'redux-observable';

import { IState, rootEpic, rootReducer } from './root';

import { getDefaultState } from './utils';

const epicMiddleware = createEpicMiddleware(rootEpic);

const composeEnhancers = (window as IReduxDevToolsEnabledWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore<IState>(rootReducer, getDefaultState(), composeEnhancers(applyMiddleware(epicMiddleware)));
}
