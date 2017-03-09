import { Observable } from "rxjs";

import { TodoAction } from "./../action/todo";
import * as firebase from 'firebase';

const ref = firebase.database().ref('todoApp/todo');

export class TodoEpic {

    static addTodo = (action$) =>
        action$.ofType(TodoAction.ADD_TODO)
            .switchMap(({ payload }) => {

                console.log("adding started");
                return Observable.fromPromise(ref.push(payload))
                    .map((x) => {
                        return {
                            type: TodoAction.ADD_TODO_DONE
                        };

                    })
            })

    static getTodos = (action$) =>
        action$.ofType(TodoAction.GET_TODO)
            .switchMap(({ payload }) => {

                console.log("getting todo started using: ", payload)

                return new Observable((observer) => {
                    ref.on("child_added", (snapshot) => {
                        console.log("firebase data arrived: ");

                        observer.next({
                            type: TodoAction.GET_TODO_ADDED,
                            payload: {
                                key: snapshot.key,
                                val: snapshot.val()
                            }
                        })
                    })
                    ref.on("child_removed", (snapshot) => {
                        console.log("firebase data arrived: ", snapshot.key);

                        observer.next({
                            type: TodoAction.GET_TODO_REMOVED,
                            payload: snapshot.key
                        })
                    })
                    ref.on("child_changed", (snapshot) => {
                        console.log("firebase data arrived: ", snapshot.key);

                        observer.next({
                            type: TodoAction.GET_TODO_CHANGED,
                            payload: {
                                key: snapshot.key,
                                val: snapshot.val()
                            }
                        })
                    })


                }).takeUntil(action$.ofType(TodoAction.GET_TODO_CANCELLED));
            })

    static getTodosCancel = (action$) =>
        action$.ofType(TodoAction.GET_TODO_CANCELLED)
            .switchMap(({ payload }) => {

                ref.off();
                return Observable.of({
                    type: TodoAction.NULL
                })

            })

}