import * as firebase from 'firebase'

export class firebaseService {

    static database = firebase.database();

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

    static logout() {//promise
        console.log("logging out");
        return firebase.auth().signOut();
    }

    static push(path, obj) {
        return firebase.database().ref(path).push(obj);
    }
    static set(path, obj) {
        return firebase.database().ref(path).set(obj);
    }

}

