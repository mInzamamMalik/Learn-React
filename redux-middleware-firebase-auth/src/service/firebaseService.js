import * as firebase from 'firebase'

export class firebaseService {

    static signup(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    static login(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
    // static auth() {
    //     return firebase.auth();
    // }
    static getUser() {
        return new Promise((res) => {
            firebase.auth().onAuthStateChanged((user) => {
                res(user);
            });
        })

    }
}

