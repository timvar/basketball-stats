import db from '../components/config/fbConfig'

const initState = {
  players: [],
  playerStats: [],  
  db: db
}

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

export default rootReducer;