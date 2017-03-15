import { Observable } from "rxjs";
import { counterAction } from '../action/action-counter'

class CounterEpic {

    increment = (action$) =>
        action$.ofType(counterAction.INCREMENT_ASYNC)
            .delay(1000) //this delay may be Async call to server or a database request
            .switchMap(({ payload }) => {
                return Observable.of({
                    type: counterAction.INCREMENT,
                    payload: null
                });
            })

    decrement = (action$) =>
        action$.ofType(counterAction.DECREMENT_ASYNC)
            .delay(1000) //this delay may be Async call to server or a database request
            .switchMap(({ payload }) => {
                return Observable.of({
                    type: counterAction.DECREMENT,
                    payload: null
                });
            })
}
export let counterEpic = new CounterEpic();