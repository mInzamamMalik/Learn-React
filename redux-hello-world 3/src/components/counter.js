import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { increment, decrement } from '../store/actions/index'

class Counter extends Component {

    constructor(props) {
        super(props);
        this._handel = this._handel.bind(this);
    }

    _handel() {
        return this.props.dec()
    }

    render() {
        return (
            <div>
                Counter: {this.props.counter}
                
                <button onClick={() => this.props.inc()}>Increment</button>

                <button onClick={this._handel}>Deccrement</button>
            </div>
        );
    }
}


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

export default connect(mapStateToProps, matchDispatchToProps)(Counter);