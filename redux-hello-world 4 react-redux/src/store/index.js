import { createStore, combineReducers } from 'redux';
import CounterReducer from './reducer/reducer-counter';

const allReducers = combineReducers({
    CounterReducer //provide all reducers here comma seaprated
})

const store = createStore(allReducers)
export default store;