import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from 'reducers';
import middleware from 'middlewares';

export default createStore(reducers);

composeWithDevTools(applyMiddleware(...middleware));