import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

//requiring all reducers
import { AuthReducer } from './reducer/auth';

//requiring all epics
import { AuthEpic } from './epic/auth';

//combine epic
const rootEpic = combineEpics(
    AuthEpic.signup
);
//combine reducers
const rootReducer = combineReducers({
    AuthReducer
})

//creating middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

//appling middleware
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

//creating store
export let store = createStoreWithMiddleware(rootReducer)
