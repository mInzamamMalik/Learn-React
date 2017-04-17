import { Observable } from "rxjs"
import { AuthActions } from "./../action/auth";
import { firebaseService } from './../../service/firebaseService';

export class AuthEpic {

    static signup = (action$) =>
        action$.ofType(AuthActions.SIGNUP_START)
            .switchMap(({ payload }) => {

                // console.log("Credentials ", payload);
                return Observable.fromPromise(firebaseService.signup(payload.email, payload.password))

                    .map((authUser) => {

                        console.log("auth user: ", authUser);
                        var data = {
                            name: payload.name,
                            role: payload.role,
                            email: authUser.email,
                            uid: authUser.uid
                        };
                        return {
                            type: AuthActions.SIGNUP_WRITE_USER,
                            payload: data
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

    static writeUser = (action$) =>
        action$.ofType(AuthActions.SIGNUP_WRITE_USER)
            .switchMap(({ payload }) => {

                console.log("write user payload ", payload);
                return Observable.fromPromise(firebaseService.set("users/" + payload.uid, payload))
                    .map((data) => {
                        return {
                            type: AuthActions.SIGNUP_SUCCESSFUL,
                            payload: payload
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

                // console.log("Credentials ", payload);
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
                return Observable.fromPromise(firebaseService.getUser()).map((user) => {
                    if (user) {
                        return {
                            type: AuthActions.ISLOGGEDIN_SUCCESSFUL,
                            payload: user
                        }
                    } else {
                        return {
                            type: AuthActions.ISLOGGEDIN_FAIL
                        }
                    }
                })
            })
    static logout = (action$) =>
        action$.ofType(AuthActions.LOGOUT)
            .switchMap(({ payload }) => {

                return Observable.fromPromise(firebaseService.logout())
                    .map((loggedout) => {
                        console.log("loggedout: ", loggedout)
                        return {
                            type: AuthActions.LOGOUT_SUCCESSFUL,
                        };
                    })
                    .catch(function (error) {
                        console.error(error.code, error.message);
                        return Observable.of({
                            type: AuthActions.LOGOUT_REJECTED,
                            payload: error
                        });
                    })
            })
}

