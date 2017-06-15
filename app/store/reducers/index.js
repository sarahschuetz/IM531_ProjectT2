import { combineReducers } from 'redux';
import project from './project';
import server from './server';
import process from './process';

export default combineReducers({
  project,
  server,
  process,
});
