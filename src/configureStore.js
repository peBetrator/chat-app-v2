import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { verifyAuth } from './actions/';
import rootReducer from './reducers';

const logMiddleware = store => dispatch => action => {
  console.log(action.type, store.getState());
  return dispatch(action);
};

export default function configureStore(persistedState) {
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunkMiddleware, logMiddleware)
  );
  store.dispatch(verifyAuth());
  return store;
}
