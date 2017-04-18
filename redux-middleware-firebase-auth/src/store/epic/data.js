import { Observable } from "rxjs";
import { TodoAction } from "./../action/data";
import { firebaseService } from './../../service/firebaseService';


export class TodoEpic {

    static addTodo = (action$) =>
        action$.ofType(TodoAction.ADD_TODO)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(firebaseService.database.ref("data/" + payload.uid).push(payload.data))
                    .map((x) => {
                        return { type: TodoAction.NULL };
                    })
            })

    static updateTodo = (action$) =>
        action$.ofType(TodoAction.MARK_TODO_ARCHIVED)
            .switchMap(({ payload }) => {
                console.log("updating epic: ", payload);
                return Observable.fromPromise(firebaseService.database.ref("data/" + payload.uid).child(payload.key).update(payload.data))
                    .map((x) => {
                        return { type: TodoAction.NULL };
                    })
            })

    static deleteTodo = (action$) =>
        action$.ofType(TodoAction.DELETE_TODO)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(firebaseService.database.ref("data/" + payload.uid).child(payload.data.key).set(null))
                    .map((x) => {
                        return { type: TodoAction.NULL };
                    })
            })

    static getTodos = (action$) =>
        action$.ofType(TodoAction.GET_TODO)
            .switchMap(({ payload }) => {
                return new Observable((observer) => {

                    firebaseService.database.ref("data/" + payload.uid).on("child_added", (snapshot) => {
                        observer.next({
                            type: TodoAction.GET_TODO_ADDED,
                            payload: {
                                key: snapshot.key,
                                val: snapshot.val()
                            }
                        })
                    })
                    firebaseService.database.ref("data/" + payload.uid).on("child_changed", (snapshot) => {
                        observer.next({
                            type: TodoAction.GET_TODO_CHANGED,
                            payload: {
                                key: snapshot.key,
                                val: snapshot.val()
                            }
                        })
                    })
                    firebaseService.database.ref("data/" + payload.uid).on("child_removed", (snapshot) => {
                        observer.next({
                            type: TodoAction.GET_TODO_REMOVED,
                            payload: snapshot.key
                        })
                    })
                }).takeUntil(action$.ofType(TodoAction.GET_TODO_CANCELLED));
            })

    static getTodosCancel = (action$) =>
        action$.ofType(TodoAction.GET_TODO_CANCELLED)
            .switchMap(({ payload }) => {
                firebaseService.database.ref("data/" + payload.uid).off();
                return Observable.of({ type: TodoAction.NULL })
                //we dont want to do any work on GET_TODO_CANCELLED so we are dispatching NULL action
            })

}