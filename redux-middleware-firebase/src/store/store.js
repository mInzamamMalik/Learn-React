import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { gitReducer } from './reducer/git';
import { AuthReducer } from './reducer/auth';

import { AuthEpic } from './epic/auth';
import { gitEpic } from './epic/git';


//combine epic
const rootEpic = combineEpics(
    gitEpic.getUserData, AuthEpic
);
//creating middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

//appling middleware
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);


//combine reducers
const allReducers = combineReducers({
    gitReducer,
    AuthReducer
})

//creating store
const store = createStoreWithMiddleware(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store;

