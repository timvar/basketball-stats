import authReducer from './authReducer';
import dbReducer from './dbReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  db: dbReducer
});

export default rootReducer;
