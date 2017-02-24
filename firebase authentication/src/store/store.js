import { createStore } from 'redux'

import allReducers from './reducers/index.js'

const store = createStore(allReducers)
export default store;