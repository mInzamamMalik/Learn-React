import { AuthAction } from "./../action/auth";
import * as firebase from 'firebase';

export class AuthEpic {
    /// Singup Functions start
    static signup(credentials) {
        console.log("test ", credentials);
        return (dispatch) => {
            dispatch(AuthAction.signup())
            AuthEpic.registerUserOnFirebase(dispatch, credentials);
        }
    }
}