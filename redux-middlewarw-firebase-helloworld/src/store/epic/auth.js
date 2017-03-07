import { Observable } from "rxjs";

import { AuthAction } from "./../action/auth";
import * as firebase from 'firebase';

export class AuthEpic {
    
    static signup = (action$) =>
        action$.ofType(AuthAction.SIGNUP)
            .switchMap(({ payload }) => {

                console.log("signup started using: ", payload);
                
                return Observable.of({
                    type: AuthAction.SIGNUP_DONE,
                    payload: payload
                });

            })
}