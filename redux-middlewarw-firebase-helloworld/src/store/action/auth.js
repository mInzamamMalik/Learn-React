export class AuthAction {

    static SIGNUP = 'SIGNUP';
    static SIGNUP_DONE = 'SIGNUP_DONE';

    //static NULL = 'NULL';
    static signup(data) {
        console.log("data in action file: ", data);

        return {
            type: AuthAction.SIGNUP,
            payload: data
        }
    }   
}