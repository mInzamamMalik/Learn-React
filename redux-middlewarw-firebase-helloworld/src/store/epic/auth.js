import { Observable } from "rxjs";

import { AuthAction } from "./../action/auth";
import * as firebase from 'firebase';

export class AuthEpic {
    /// Singup Functions start
    // static signup(credentials) {
    //     console.log("test ", credentials);
    //     return (dispatch) => {
    //         dispatch())
    //         AuthEpic.registerUserOnFirebase(dispatch, credentials);
    //     }
    // }
    static signup = (action$) =>
        action$.ofType(AuthAction.SIGNUP)
            .switchMap(({ payload }) => {


                console.log("signup started");

                return Observable.of({
                    type: AuthAction.SIGNUP_DONE,
                    payload: "data"
                });

            })
}