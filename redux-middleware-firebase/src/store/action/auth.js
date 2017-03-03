export default class AuthActions {

    static SIGNUP = 'SIGNUP';
    static SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL';
    static SIGNUP_REJECTED = 'SIGNUP_REJECTED';

    static SIGNIN = 'SIGNIN';
    static SIGNIN_SUCCESSFUL = 'SIGNIN_SUCCESSFUL';
    static SIGNIN_REJECTED = 'SIGNIN_REJECTED';

    static LOGOUT = 'LOGOUT';
    static LOGOUT_SUCCESSFUL = 'LOGOUT_SUCCESSFUL';

    static UPDATE_USER = 'UPDATE_USER';

    static ISLOGGEDIN = 'ISLOGGEDIN';

    //static NULL = 'NULL';

    static signup() {
        return {
            type: AuthActions.SIGNUP
        }
    }

    static signupupSuccessful(authUser) {
        return {
            type: AuthActions.SIGNUP_SUCCESSFUL,
            payload: authUser
        }
    }

    static signupRejected(error) {
        return {
            type: AuthActions.SIGNUP_REJECTED,
            payload: error
        }
    }


    static signin() {
        return {
            type: AuthActions.SIGNIN
        }
    }

    static signinSuccessful(authUser) {
        return {
            type: AuthActions.SIGNIN_SUCCESSFUL,
            payload: authUser
        }
    }

    static signinRejected(error) {
        return {
            type: AuthActions.SIGNIN_REJECTED,
            payload: error
        }
    }

    static logout() {
        return {
            type: AuthActions.LOGOUT
        }
    }

    static logoutSuccessful() {
        return {
            type: AuthActions.LOGOUT_SUCCESSFUL
        }
    }

    static isLoggedIn(user) {
        return {
            type: AuthActions.ISLOGGEDIN,
            payload: user
        }
    }

    static updateUser(updatedUser) {
        return {
            type: AuthActions.UPDATE_USER,
            payload: updatedUser
        }
    }
}