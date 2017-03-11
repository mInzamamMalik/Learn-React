import { Observable } from "rxjs"
import { AuthActions } from "./../action/auth";
import { firebaseService } from './../../service/firebaseService';

export class AuthEpic {

    static signup = (action$) =>
        action$.ofType(AuthActions.SIGNUP_START)
            .switchMap(({ payload }) => {

                console.log("Credentials ", payload);
                return Observable.fromPromise(firebaseService.signup(payload.email, payload.password))

                    .map((authUser) => {
                        return {
                            type: AuthActions.SIGNUP_SUCCESSFUL,
                            payload: authUser
                        };
                    })
                    .catch(function (error) {
                        console.error(error.code, error.message);
                        return Observable.of({
                            type: AuthActions.SIGNUP_REJECTED,
                            payload: error
                        });
                    })
            })

    static login = (action$) =>
        action$.ofType(AuthActions.LOGIN)
            .switchMap(({ payload }) => {

                console.log("Credentials ", payload);
                return Observable.fromPromise(firebaseService.login(payload.email, payload.password))
                    .map((authUser) => {
                        return {
                            type: AuthActions.LOGIN_SUCCESSFUL,
                            payload: authUser
                        };
                    })
                    .catch(function (error) {
                        console.error(error.code, error.message);
                        return Observable.of({
                            type: AuthActions.LOGIN_REJECTED,
                            payload: error
                        });
                    })
            })
    static isLogin = (action$) =>
        action$.ofType(AuthActions.ISLOGGEDIN)
            .switchMap(({ payload }) => {

                return new Observable((observer) => {
                    firebase.auth().onAuthStateChanged(function (user) {
                        if (user) {
                            observer.next({
                                type: AuthActions.LOGIN_SUCCESSFUL,
                                payload: user
                            })
                        } else {
                            observer.next({
                                type: AuthActions.LOGOUT_SUCCESSFUL
                            })
                        }
                    });
                })
            })
}

