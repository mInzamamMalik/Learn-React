export class counterAction {

    static INCREMENT = "INCREMENT";
    static DECREMENT = "DECREMENT";

    static INCREMENT_ASYNC = "INCREMENT_ASYNC";
    static DECREMENT_ASYNC = "DECREMENT_ASYNC";

    static increment() {
        return { type: counterAction.INCREMENT }
    }
    static decrement = () => {
        return { type: counterAction.DECREMENT }
    }
    
    static incrementAsync() {
        return { type: counterAction.INCREMENT_ASYNC }
    }
    static decrementAsync = () => {
        return { type: counterAction.DECREMENT_ASYNC }
    }
}