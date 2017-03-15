import store from './reducer';

export class counterAction {

    static increment() {
        store.dispatch({ type: 'INCREMENT' })
    }
    static decrement() {
        store.dispatch({ type: 'DECREMENT' })
    }
}