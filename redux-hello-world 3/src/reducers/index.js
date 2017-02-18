import { combineReducers } from 'redux'
import UserReducer from './reducers-user'

const allReducers = combineReducers({
    users: UserReducer
    // movies: movieReducer
})
export default allReducers;