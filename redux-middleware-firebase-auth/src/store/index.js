import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { gitReducer } from './reducer/git';
import { AuthReducer } from './reducer/auth';

import { AuthEpic } from './epic/auth';
import { gitEpic } from './epic/git';


//combine epic
const rootEpic = combineEpics(
    gitEpic.getUserData,
    AuthEpic.signup,
    AuthEpic.login,
);
//combine reducers
const rootReducer = combineReducers({
    gitReducer,
    AuthReducer
})

//creating middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

//appling middleware
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

//creating store
export let store = createStoreWithMiddleware(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)