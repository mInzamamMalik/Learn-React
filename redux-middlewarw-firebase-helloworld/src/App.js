import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux'
import { AuthAction } from './store/action/auth'

function mapStateToProps(state) {
    return {
        isRegistered: state.AuthReducer.isRegistered,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        startSignup: () => dispatch(   AuthAction.signup()   )
    };
}
class Signup extends Component {

    constructor(props) {
        super(props)
        this.doSignup = this.doSignup.bind(this);
    }
    doSignup() {
        var name = this.refs.name.value;
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        console.log(name, email, password);

        this.props.startSignup()

        //browserHistory.push('/login');
    }

    render() {
        return (<div>
            <div>This is Login</div>

            <input type="text" placeholder="name" ref="name" /> <br />
            <input type="text" placeholder="email" ref="email" /> <br />
            <input type="password" placeholder="password" ref="password" /> <br />

            <button onClick={this.doSignup}>
                Signup
            </button>
        </div>)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)

