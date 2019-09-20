import { combineReducers } from 'redux';
import auth from './auth';
import messaging from './messaging';

export default combineReducers({ auth, messaging });
