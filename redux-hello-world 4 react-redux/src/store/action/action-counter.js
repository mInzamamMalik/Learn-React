export class counterAction {

    static INCREMENT = "INCREMENT";
    static DECREMENT = "DECREMENT";

    static increment () {
        console.log("action increment ");
        return {
            type: counterAction.INCREMENT,
        }
    }
    static decrement = () => {
        return {
            type: counterAction.DECREMENT,
        }
    }
}