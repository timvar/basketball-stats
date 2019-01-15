import db from '../components/config/fbConfig'

const initState = {
  players: [],
  playerStats: [],  
  db: db
}

const dbReducer = (state = initState, action) => {
  return state;
}

export default dbReducer;