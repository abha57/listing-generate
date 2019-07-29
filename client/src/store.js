import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';

import fetchListingReducer from './reducers/index';

export const sagaMiddleware = createSagaMiddleware();
// import middleware from 'middlewares';

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer,
  products: fetchListingReducer
});

export default createStore(rootReducer, applyMiddleware(sagaMiddleware));

// composeWithDevTools(applyMiddleware(...middleware));