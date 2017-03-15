import React, { Component } from 'react';
import { connect } from 'react-redux';
import { counterAction } from '../store/action/action-counter'

function mapStateToProps(state) {
    return {
        counter: state.CounterReducer
    }
}
function matchDispatchToProps(dispatch) {
    return {
        inc: () => { dispatch(counterAction.increment()) },
        dec: () => { dispatch(counterAction.decrement()) }
    }
}
class Counter extends Component {
    constructor(props) {
        super(props);
        this.doIncrement = this.doIncrement.bind(this);
        this.doDecrement = this.doDecrement.bind(this);
    }

    doIncrement() { return this.props.inc(); }
    doDecrement() { return this.props.dec(); }

    render() {
        return (
            <div>
                <h2> {this.props.counter}</h2>
                <button onClick={this.doIncrement}>Increment</button>
                <button onClick={this.doDecrement}>Deccrement</button>
            </div>
        );
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(Counter);