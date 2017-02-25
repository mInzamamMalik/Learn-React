import { combineReducers } from 'redux';
import { createStore } from 'redux'

import TodoReducer from './reducers/reducer-todo';

const allReducers = combineReducers({
    todoStore: TodoReducer
})

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store;