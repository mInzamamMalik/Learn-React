import * as firebase from 'firebase';
import { browserHistory } from 'react-router';

export class firebaseService {
  constructor() {
      let list = "daniyal";
      console.log("dasdasd");
        //    console.log("aaaaaa",this.list)
        //    console.log(this.list)
            // .then((x)=> {console.log(x)});
            // .then((auth) => auth !== null ? this.adminreplytouser = this.af.database.list('feedback/' + auth.uid) : console.log('sorry'))
    }

    static auth = null;

    static signup(email, password) {//promise
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    static login(email, password) {//promise
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
    static auth() {
        return firebase.auth().currentUser;
    }
    static logout() {//promise
        console.log("logging out");
        return firebase.auth().signOut();
    }
}

//logout check
(() => {
    console.log("executing");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            
        } else {
            browserHistory.push('/login');
        }
    });
})();

