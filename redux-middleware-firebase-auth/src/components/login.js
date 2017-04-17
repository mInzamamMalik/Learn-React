import React, { Component } from 'react';
import { connect } from 'react-redux'

import { AuthActions } from './../store/action/auth';

import { browserHistory } from 'react-router'
import { RaisedButton, TextField } from 'material-ui';

function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        isError: state.AuthReducer.isError,
        errorMessage: state.AuthReducer.errorMessage,
        isProcessing: state.AuthReducer.isProcessing,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        login: (credentials) => dispatch(AuthActions.login(credentials))
    };
}


class Login extends Component {
    constructor(props) {
        super(props)//for using 'this.'
        this.doLogin = this.doLogin.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        console.log("Login component nextProps: ", nextProps);
        if (nextProps.isError) {
            // alert(nextProps.errorMessage);
            this.setState({
                errorPopup: true
            })
        }
        // if (nextProps.isAuthenticated) {
        //     browserHistory.push('/dashboard');
        // }
    }

    doLogin() {
        var email = this.refs.email.getValue();
        var password = this.refs.password.getValue();
        console.log(email, password);
        this.props.login({
            email: email,
            password: password
        })

    }
    render() {
        return (<div>
            <TextField defaultValue="abc@abc.com" type="text" hintText="Email" ref="email" /> <br />
            <TextField defaultValue="aaaaaa" type="password" hintText="password" ref="password" /> <br />

            <RaisedButton onClick={this.doLogin} primary={true} label="Login">

            </RaisedButton>
        </div>)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)