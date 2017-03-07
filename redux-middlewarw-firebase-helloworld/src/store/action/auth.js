export class AuthAction {

    static SIGNUP = 'SIGNUP';
    //static NULL = 'NULL';
    static signup() {
        return {
            type: AuthAction.SIGNUP
        }
    }   
}