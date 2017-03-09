import * as firebase from 'firebase'

export class firebaseService {

    static signup(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    static login(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(error.code, error.message);
        });
    }

}

