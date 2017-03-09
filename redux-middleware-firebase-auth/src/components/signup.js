import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { FlatButton, RaisedButton, TextField, Dialog } from 'material-ui';
import { AuthActions } from './../store/action/auth'

 
function mapStateToProps(state) {
    return {
        isRegistered: state.AuthReducer.isRegistered,
        isError: state.AuthReducer.isError,
        errorMessage: state.AuthReducer.errorMessage,
        isProcessing: state.AuthReducer.isProcessing,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        signup: (credentials) => dispatch(AuthActions.signup(credentials))
    };
}
class Signup extends Component {

    constructor(props) {
        super(props)
        this.doSignup = this.doSignup.bind(this);
        this.state = {
            errorPopup: false
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("Signup component nextProps: ", nextProps);
        if (nextProps.isError) {
            // alert(nextProps.errorMessage);
            this.setState({
                errorPopup: true
            })
        }
        if (nextProps.isRegistered) {
            browserHistory.push('/login');
        }
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

    }

    render() {
        return (<div>

            <Dialog
                title={"Signup Failed"}
                modal={false}
                open={this.state.errorPopup}
                actions={<FlatButton
                    label="Submit"
                    primary={true}
                    keyboardFocused={true}
                    onTouchTap={() => { this.setState({ errorPopup: false }) }}
                />}
            >

                <p>{this.props.errorMessage}</p>

            </Dialog>

            <div>This is Login</div>

            <TextField defaultValue="abc" type="text" hintText="name" ref="name" /> <br />
            <TextField defaultValue="abc@abc.com" type="text" hintText="email" ref="email" /> <br />
            <TextField defaultValue="aaaaaa" type="password" hintText="password" ref="password" /> <br />

            <RaisedButton primary={true} onClick={this.doSignup}>
                Signup
            </RaisedButton>
        </div >)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)