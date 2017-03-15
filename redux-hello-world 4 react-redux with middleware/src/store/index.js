import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { counterReducer } from './reducer/reducer-counter';
import { counterEpic } from './epic/epic-counter';

//combine epics
const rootEpic = combineEpics(
    counterEpic.increment,
    counterEpic.decrement,
);
//combine reducers
const rootReducer = combineReducers({
    counterReducer //provide all reducers here comma seaprated
})

//creating middleware
const epicMiddleware = createEpicMiddleware(rootEpic);
//appling middleware
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

//creating store with middleware
const store = createStoreWithMiddleware(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //this line will enable redux dev tool
)
export default store;