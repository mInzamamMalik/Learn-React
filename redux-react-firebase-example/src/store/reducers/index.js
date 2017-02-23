import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'redux-react-firebase'

import UserReducer from './reducers-user';
import ActiveUserReducer from './reducer-active-user';
import CounterReducer from './reducer-counter';


const allReducers = combineReducers({
    users: UserReducer,
    activeUser: ActiveUserReducer,
    counter: CounterReducer,
    firebase: firebaseStateReducer
})
export default allReducers;