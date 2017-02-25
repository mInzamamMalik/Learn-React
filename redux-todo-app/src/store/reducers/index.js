import { combineReducers } from 'redux';

import TodoReducer from './reducer-todo';

const allReducers = combineReducers({
    todo: TodoReducer
})
export default allReducers;