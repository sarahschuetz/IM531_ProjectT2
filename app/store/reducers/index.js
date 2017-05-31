import { combineReducers } from 'redux';
import project from './project';
import server from './server';

export default combineReducers({
  project,
  server,
});
