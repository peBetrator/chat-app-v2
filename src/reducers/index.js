import { combineReducers } from 'redux';
import auth from './auth';
import messaging from './messaging';
import rooms from './rooms';

export default combineReducers({ auth, messaging, rooms });
