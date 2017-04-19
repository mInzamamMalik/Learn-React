export class ProductAction {

    static GET_PRODUCT = 'GET_PRODUCT';
    static GET_PRODUCT_ADDED = 'GET_PRODUCT_ADDED';
    static GET_PRODUCT_REMOVED = 'GET_PRODUCT_REMOVED';
    static GET_PRODUCT_CHANGED = 'GET_PRODUCT_CHANGED';
    static GET_PRODUCT_CANCELLED = 'GET_PRODUCT_CANCELLED';

    static ADD_PRODUCT = 'ADD_PRODUCT';
    static MARK_PRODUCT_ARCHIVED = 'MARK_PRODUCT_ARCHIVED';
    static DELETE_PRODUCT = 'DELETE_PRODUCT';

    static NULL = 'NULL';

    static getProducts( companyUid) {
        return { type: ProductAction.GET_PRODUCT, payload: {  companyUid } }
    }
    static getProductsCancel( companyUid,  product) {
        return { type: ProductAction.GET_PRODUCT_CANCELLED, payload: {  companyUid,  product } }
    }
    static addProduct( companyUid,  product) {
        return { type: ProductAction.ADD_PRODUCT, payload: {  companyUid,  product } }
    }
    static updateProduct( companyUid, key,  product) {
        return { type: ProductAction.MARK_PRODUCT_ARCHIVED, payload: {  companyUid, key,  product } }
    }
    static deleteProduct( companyUid,  key) {
        return {
            type: ProductAction.DELETE_PRODUCT, payload: {  companyUid,  key }
        }
    }
}