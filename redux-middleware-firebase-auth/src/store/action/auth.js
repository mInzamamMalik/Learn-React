export class AuthActions {

    static SIGNUP_START = 'SIGNUP_START';
    static SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL';
    static SIGNUP_REJECTED = 'SIGNUP_REJECTED';

    static LOGIN = 'SIGNIN';
    static LOGIN_SUCCESSFUL = 'SIGNIN_SUCCESSFUL';
    static LOGIN_REJECTED = 'SIGNIN_REJECTED';

    static LOGOUT = 'LOGOUT';
    static LOGOUT_SUCCESSFUL = 'LOGOUT_SUCCESSFUL';
    static LOGOUT_REJECTED = 'LOGOUT_REJECTED';

    static UPDATE_USER = 'UPDATE_USER';

    static ISLOGGEDIN = 'ISLOGGEDIN';

    static NULL = 'NULL';

    static signup(credentials) {
        console.log("action signup credentials", credentials);
        return { type: AuthActions.SIGNUP_START, payload: credentials }
    }
    static signupupSuccessful(authUser) {
        return { type: AuthActions.SIGNUP_SUCCESSFUL, payload: authUser }
    }
    static signupRejected(error) {
        return { type: AuthActions.SIGNUP_REJECTED, payload: error }
    }


    static login(credentials) {
        return { type: AuthActions.LOGIN, payload: credentials }
    }
    static loginSuccessful(authUser) {
        return { type: AuthActions.LOGIN_SUCCESSFUL, payload: authUser }
    }
    static loginRejected(error) {
        return { type: AuthActions.LOGIN_REJECTED, payload: error }
    }

    static logout() {
        return { type: AuthActions.LOGOUT }
    }
    static logoutSuccessful() {
        return { type: AuthActions.LOGOUT_SUCCESSFUL }
    }
    static logoutRejected() {
        return { type: AuthActions.LOGOUT_REJECTED }
    }

    static isLoggedIn() {
        return { type: AuthActions.ISLOGGEDIN }
    }
    static updateUser(updatedUser) {
        return {
            type: AuthActions.UPDATE_USER,
            payload: updatedUser
        }
    }
}