import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducers from 'reducers';

export const sagaMiddleware = createSagaMiddleware();
// import middleware from 'middlewares';

export default createStore(reducers, applyMiddleware(sagaMiddleware));

// composeWithDevTools(applyMiddleware(...middleware));