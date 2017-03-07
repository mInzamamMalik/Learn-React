export class AuthAction {

    static SIGNUP = 'SIGNUP';
    static SIGNUP_DONE = 'SIGNUP_DONE';

    //static NULL = 'NULL';
    static signup() {
        return {
            type: AuthAction.SIGNUP
        }
    }   
}