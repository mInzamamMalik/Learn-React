import { AuthActions } from "./../action/auth";

const INITIAL_STATE = {
    authUser: {},
    isAuthenticated: false,
    isProcessing: false,
    isRegistered: false,
    isError: false,
    errorMessage: {}
}

export function AuthReducer(state = INITIAL_STATE, action) {

    console.log("all auth reducer: ", action);

    switch (action.type) {
        case AuthActions.SIGNUP_START:
            return { ...state, isProcessing: true, isRegistered: false, isError: false };

        case AuthActions.SIGNUP_SUCCESSFUL:
            return { ...state, isProcessing: false, isRegistered: true, isError: false, errorMessage: {} };

        case AuthActions.SIGNUP_REJECTED:
            return { ...state, isProcessing: false, isRegistered: false, isError: true, errorMessage: action.payload.message };


        case AuthActions.LOGIN:
            return { ...state, isProcessing: true, isAuthenticated: false, isError: false };
        case AuthActions.LOGIN_SUCCESSFUL:
            return { ...state, isProcessing: false, isAuthenticated: true, isError: false, authUser: action.payload, errorMessage: {} };
        case AuthActions.LOGIN_REJECTED:
            return { ...state, isProcessing: false, isAuthenticated: false, authUser: {}, isError: true, errorMessage: action.payload.message };

        case AuthActions.ISLOGGEDIN_SUCCESSFUL:
        // console.log("islogin success reducer", action.payload);
            return { ...state, isAuthenticated: true, authUser: action.payload };
        case AuthActions.ISLOGGEDIN_fail:
            return { ...state, isAuthenticated: false, authUser: {} };

        // case AuthActions.LOGOUT:
        //     return { ...state, isProcessing: true };
        // case AuthActions.LOGOUT_SUCCESSFUL:
        //     return { ...state, isProcessing: false, isAuthenticated: false, authUser: {} };
        // case AuthActions.UPDATE_USER:
        //     return { ...state, isProcessing: false, isAuthenticated: true, authUser: action.payload };
        default:
            return state;
    }
}