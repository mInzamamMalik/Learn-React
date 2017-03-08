import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

//requiring all reducers
import { TodoReducer } from './reducer/todo';

//requiring all epics
import { TodoEpic } from './epic/todo';

//combine epic
const rootEpic = combineEpics(
    TodoEpic.addTodo
);
//combine reducers
const rootReducer = combineReducers({
    TodoReducer
})

//creating middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

//appling middleware
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

//creating store
export let store = createStoreWithMiddleware(rootReducer)
