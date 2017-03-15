import store from './index';

export class counterAction {
    
    static increment() {
        store.dispatch({ type: 'INCREMENT' })
    }
    static decrement() {
        store.dispatch({ type: 'DECREMENT' })
    }
}