import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increment, decrement } from '../store/actions/index'

function mapStateToProps(state) {
    return {
        counter: state.counter
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        inc: increment,
        dec: decrement
    }, dispatch)
}
class Counter extends Component {
    
    render() {
        return (
            <div>
                Counter: {this.props.counter}
                <button onClick={() => this.props.inc()}>Increment</button>
                <button onClick={() => this.props.dec()}>Deccrement</button>
            </div>
        )
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(Counter);