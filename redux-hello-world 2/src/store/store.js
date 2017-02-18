import { createStore } from 'redux'

const counter = (state = 0, action) => {
    switch (action.type) {
        
        case 'INCREMENT':
            return state + 1
            break;
        case 'DECREMENT':
            return state - 1
            break;
        default:
            return state
            break;
    }
}
const store = createStore(counter);

export default store;
