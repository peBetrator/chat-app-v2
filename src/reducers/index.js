import { combineReducers } from 'redux';
import auth from './auth';
import messaging from './messaging';
import rooms from './rooms';
import uploading from './uploading';

export default combineReducers({ auth, messaging, rooms, uploading });
