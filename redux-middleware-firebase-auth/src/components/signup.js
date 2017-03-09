import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { RaisedButton, TextField } from 'material-ui';
import { AuthMiddleware } from './../store/epic/auth'


function mapStateToProps(state) {
    return {
        isRegistered: state.AuthReducer.isRegistered,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        signup: (credentials) => dispatch(AuthMiddleware.signup(credentials))
    };
}
class Signup extends Component {

    constructor(props) {
        super(props)
        this.doSignup = this.doSignup.bind(this);
    }
    doSignup() {
        var name = this.refs.name.getValue();
        var email = this.refs.email.getValue();
        var password = this.refs.password.getValue();
        console.log(name, email, password);

        this.props.signup(
            {
                "fullName": name,
                "email": email,
                "password": password,
            })

        //browserHistory.push('/login');
    }

    render() {
        return (<div>
            <div>This is Login</div>

            <TextField type="text" hintText="name" ref="name" /> <br />
            <TextField type="text" hintText="email" ref="email" /> <br />
            <TextField type="password" hintText="password" ref="password" /> <br />

            <RaisedButton primary={true} onClick={this.doSignup}>
                Signup
            </RaisedButton>
        </div>)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)