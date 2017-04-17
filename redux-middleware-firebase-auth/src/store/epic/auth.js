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
                            type: AuthActions.GET_PROFILE,
                            authUser: authUser
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
                            type: AuthActions.GET_PROFILE,
                            authUser: user
                        }
                    } else {
                        return {
                            type: AuthActions.ISLOGGEDIN_FAIL
                        }
                    }
                })
            })

    static getProfile = (action$) =>
        action$.ofType(AuthActions.GET_PROFILE)
            .switchMap(({ authUser }) => {
                return new Observable((observer) => {

                    firebaseService.database.ref("users/" + authUser.uid).on("value", (snapshot) => {
                        console.log("snapshot.val()", snapshot.val(), authUser.uid);
                        observer.next({
                            type: AuthActions.ISLOGGEDIN_SUCCESSFUL,
                            payload: {
                                authUser: authUser,
                                profile: snapshot.val()
                            }
                        })
                    })
                }).takeUntil(action$.ofType(AuthActions.GET_TODO_CANCELLED));
            })

    static getProfileCancel = (action$) =>
        action$.ofType(AuthActions.GET_PROFILE_CANCEL)
            .switchMap(({ uid }) => {
                firebaseService.database.ref("users/" + uid).off();
                return Observable.of({ type: AuthActions.NULL })
                //we dont want to do any work on GET_TODO_CANCELLED so we are dispatching NULL action
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

