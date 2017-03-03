import AuthActions from "./../actions/authActions";
import * as firebase from 'firebase';


export default class AuthMiddleware {
    /// Singup Functions start
    static signup(credentials) {
        console.log("test ", credentials);
        return (dispatch) => {
            dispatch(AuthActions.signup())
            AuthMiddleware.registerUserOnFirebase(dispatch, credentials);
        }
    }

    static registerUserOnFirebase(dispatch, credentials) {
        firebase.auth()
            .createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(function (authUser) {
                console.log("signup successfull ", authUser);
                AuthMiddleware.createUserInFirebase(dispatch, credentials, authUser);
            })
            .catch(function (error) {
                //var errorCode = error.code;
                //var errorMessage = error.message;
                console.log("signup error ", error);
                dispatch(AuthActions.signupRejected(error));
            });

    }

    static createUserInFirebase(dispatch, credentials, authUser) {
        let user = {
            uid: authUser.uid,
            email: credentials.email,
            fullName: credentials.fullName,
            isDonor: false
        };
        firebase.database().ref('/')
            .child(`users/${user.uid}`)
            .set(user)
            .then(function () {
                dispatch(AuthActions.signupupSuccessful());
            });
    }
    // Signup Functions Ends



    // Signin Functions Starts
    static signin(credentials) {
        console.log("test ", credentials);
        return (dispatch) => {
            dispatch(AuthActions.signin())
            AuthMiddleware.authenticateUserOnFirebase(dispatch, credentials);
        }
    }

    static authenticateUserOnFirebase(dispatch, credentials) {
        firebase.auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(function (authUser) {
                console.log("singIN successfull ", authUser);
                AuthMiddleware.getUserFromFirebase(dispatch, authUser);
            })
            .catch(function (error) {
                //var errorCode = error.code;
                //var errorMessage = error.message;
                console.log("signup error ", error);
                dispatch(AuthActions.signinRejected(error));
            });

    }

    static getUserFromFirebase(dispatch, authUser) {
        firebase.database().ref('/')
            .child(`users/${authUser.uid}`)
            .once('value')
            .then(function (userObj) {
                console.log("user after login ", userObj.val());
                LocalStorageManager.setUser(userObj.val())
                dispatch(AuthActions.signinSuccessful(userObj.val()));
            });
    }
    // Signin Functions Ends


    // Logout Functions Starts
    static logout() {
        return (dispatch) => {
            dispatch(AuthActions.logout())
            AuthMiddleware.logoutFromFirebase(dispatch);
        }
    }

    static logoutFromFirebase(dispatch) {
        LocalStorageManager.removeUser();
        firebase.auth().signOut()
            .then(function () {
                dispatch(AuthActions.logoutSuccessful())
            })
            .catch(function (error) {
                console.log("Error in lougout ", error);
                dispatch(AuthActions.logoutSuccessful())
            })

    }

    // Logout Functions Ends

    // isLoggedIn 
    static isLoggedIn() {
        return (dispatch) => {
            let user = LocalStorageManager.getUser();
            if (user) {
                dispatch(AuthActions.signinSuccessful(user))
            }
            else {
                console.log("not logged in ");
                // dispatch(AuthActions.signinSuccessful(user))
            }
        }
    }

    static updateUser(authUser) {
        return (dispatch) => {
            firebase.database().ref('/')
                .child(`users/${authUser.uid}`)
                .once('value')
                .then(function (userObj) {
                    console.log("user after update ", userObj.val());
                    LocalStorageManager.setUser(userObj.val())
                    dispatch(AuthActions.updateUser(userObj.val()));
                });
        }
    }


}



