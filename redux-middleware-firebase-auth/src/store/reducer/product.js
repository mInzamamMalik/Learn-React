import { AuthActions } from "./../action/auth";
import { ProductAction } from "./../action/product";

const INITIAL_STATE = {
    products: {},
    loading: false,
}

export function ProductReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case ProductAction.GET_PRODUCT:
            return { ...state, loading: true };

        case ProductAction.GET_PRODUCT_ADDED:
            var newProducts = Object.assign({}, state.products);
            newProducts[action.payload.key] = action.payload.val;
            return { ...state, products: newProducts, loading: false };

        case ProductAction.GET_PRODUCT_REMOVED:
            var newProducts = Object.assign({}, state.products);
            delete newProducts[action.payload];
            return { ...state, products: newProducts, loading: false };

        case ProductAction.GET_PRODUCT_CHANGED:
            var newProducts = Object.assign({}, state.products);
            newProducts[action.payload.key] = action.payload.val;
            return { ...state, products: newProducts, loading: false };
        
        case AuthActions.LOGOUT_SUCCESSFUL:
            return INITIAL_STATE;

        default:
            return state;
    }
}