/*
import db from '../components/config/fbConfig'

const initState = {
  players: [],
  playerStats: [],  
  db: db
}
*/
import authReducer from './authReducer';
import dbReducer from './dbReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  db: dbReducer
});

/*
const rootReducer = (state = initState, action) => {
  if (action.type === 'DELETE_POST') {
    let newPosts = state.posts.filter(post => {
      return action.id !== post.id;
    });
    return {
      ...state,
      posts: newPosts
    }
  }
  return state;
}
*/
export default rootReducer;
