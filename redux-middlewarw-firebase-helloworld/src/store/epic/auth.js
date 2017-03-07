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

    // static registerUserOnFirebase(dispatch, credentials) {
    //     firebase.auth()
    //         .createUserWithEmailAndPassword(credentials.email, credentials.password)
    //         .then(function (authUser) {
    //             console.log("signup successfull ", authUser);
    //             AuthEpic.createUserInFirebase(dispatch, credentials, authUser);
    //         })
    //         .catch(function (error) {
    //             //var errorCode = error.code;
    //             //var errorMessage = error.message;
    //             console.log("signup error ", error);
    //             dispatch(AuthAction.signupRejected(error));
    //         });

    // }

    // // Signin Functions Starts
    // static signin(credentials) {
    //     console.log("test ", credentials);
    //     return (dispatch) => {
    //         dispatch(AuthAction.signin())
    //         AuthEpic.authenticateUserOnFirebase(dispatch, credentials);
    //     }
    // }

    // static getUserFromFirebase(dispatch, authUser) {
    //     firebase.database().ref('/')
    //         .child(`users/${authUser.uid}`)
    //         .once('value')
    //         .then(function (userObj) {
    //             console.log("user after login ", userObj.val());
    //             dispatch(AuthAction.signinSuccessful(userObj.val()));
    //         });
    // }
}