import React, { Component } from 'react';
import { connect } from 'react-redux';
import { counterAction } from '../store/action/action-counter'

function mapStateToProps(state) {
    return {
        counter: state.counterReducer
    }
}
function matchDispatchToProps(dispatch) {
    return {
        inc: () => { dispatch(counterAction.increment()) },
        dec: () => { dispatch(counterAction.decrement()) },
        incAsync: () => { dispatch(counterAction.incrementAsync()) },
        decAsync: () => { dispatch(counterAction.decrementAsync()) }
    }
}
class Counter extends Component {
    constructor(props) {
        super(props);
        this.doIncrement = this.doIncrement.bind(this);
        this.doDecrement = this.doDecrement.bind(this);
        this.doAsyncIncrement = this.doAsyncIncrement.bind(this);
        this.doAsyncDecrement = this.doAsyncDecrement.bind(this);
    }

    doIncrement() { return this.props.inc(); }
    doDecrement() { return this.props.dec(); }
    doAsyncIncrement() { return this.props.incAsync(); }
    doAsyncDecrement() { return this.props.decAsync(); }

    render() {
        return (
            <div>
                <h2> {this.props.counter}</h2>
                <button onClick={this.doIncrement}>Increment</button>
                <button onClick={this.doDecrement}>Deccrement</button> <br/>
                <button onClick={this.doAsyncIncrement}>Async Increment</button>
                <button onClick={this.doAsyncDecrement}>Async Deccrement</button>
            </div>
        );
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(Counter);