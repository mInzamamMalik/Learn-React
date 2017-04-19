import { Observable } from "rxjs";
import { ProductAction } from "./../action/product";
import { firebaseService } from './../../service/firebaseService';


export class ProductEpic {

    static addProduct = (action$) =>
        action$.ofType(ProductAction.ADD_PRODUCT)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(firebaseService.database.ref("product").push(payload.product))
                    .map((x) => {
                        return { type: ProductAction.NULL };
                    })
            })

    static updateProduct = (action$) =>
        action$.ofType(ProductAction.MARK_PRODUCT_ARCHIVED)
            .switchMap(({ payload }) => {
                console.log("updating epic: ", payload);
                return Observable.fromPromise(firebaseService.database.ref("product").child(payload.key).update(payload.product))
                    .map((x) => {
                        return { type: ProductAction.NULL };
                    })
            })

    static deleteProduct = (action$) =>
        action$.ofType(ProductAction.DELETE_PRODUCT)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(firebaseService.database.ref("product").child(payload.key).set(null))
                    .map((x) => {
                        return { type: ProductAction.NULL };
                    })
            })

    static getProducts = (action$) =>
        action$.ofType(ProductAction.GET_PRODUCT)
            .switchMap(({ payload }) => {
                return new Observable((observer) => {
 
                    firebaseService.database.ref("/product").on("child_added", (snapshot) => {
                        
                        console.log("getting product: ", snapshot.val());
                        observer.next({
                            type: ProductAction.GET_PRODUCT_ADDED,
                            payload: {
                                key: snapshot.key,
                                val: snapshot.val()
                            }
                        })
                    })
                    firebaseService.database.ref("product").on("child_changed", (snapshot) => {
                        observer.next({
                            type: ProductAction.GET_PRODUCT_CHANGED,
                            payload: {
                                key: snapshot.key,
                                val: snapshot.val()
                            }
                        })
                    })
                    firebaseService.database.ref("product").on("child_removed", (snapshot) => {
                        observer.next({
                            type: ProductAction.GET_PRODUCT_REMOVED,
                            payload: snapshot.key
                        })
                    })
                }).takeUntil(action$.ofType(ProductAction.GET_PRODUCT_CANCELLED));
            })

    static getProductsCancel = (action$) =>
        action$.ofType(ProductAction.GET_PRODUCT_CANCELLED)
            .switchMap(({ payload }) => {
                firebaseService.database.ref("product").off();
                return Observable.of({ type: ProductAction.NULL })
                //we dont want to do any work on GET_PRODUCT_CANCELLED so we are dispatching NULL action
            })

}