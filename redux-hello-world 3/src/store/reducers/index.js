import { combineReducers } from 'redux';

import CounterReducer from './reducer-counter';


const allReducers = combineReducers({
    counter: CounterReducer
})
export default allReducers;