import { combineReducers } from 'redux';

import TodoReducer from './reducer-todo';

const allReducers = combineReducers({
    todoStore: TodoReducer
})
export default allReducers;