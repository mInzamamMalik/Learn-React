import { combineReducers } from 'redux';

import UserReducer from './reducers-user';
import ActiveUserReducer from './reducer-active-user';
import CounterReducer from './reducer-counter';


const allReducers = combineReducers({
    users: UserReducer,
    activeUser: ActiveUserReducer,
    counter: CounterReducer
})
export default allReducers;