import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import { connect } from 'react-redux'
// import { AuthMiddleware } from './store/epic/auth'

// function mapStateToProps(state) {
//     return {
//         isRegistered: state.AuthReducer.isRegistered,
//     };
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         dispatchsignup: (credentials) => dispatch(AuthMiddleware.signup(credentials))
//     };
// }
class Signup extends Component {

    // constructor(props) {
    //     super(props)
    //     this.doSignup = this.doSignup.bind(this);
    // }
    // doSignup() {
    //     var name = this.refs.name.getValue();
    //     var email = this.refs.email.getValue();
    //     var password = this.refs.password.getValue();
    //     console.log(name, email, password);

    //     this.props.signup(
    //         {
    //             "fullName": name,
    //             "email": email,
    //             "password": password,
    //         })

    //     //browserHistory.push('/login');
    // }

    render() {
        return (<div>
            <div>This is Login</div>

            {/*<input type="text" hintText="name" ref="name" /> <br />
            <input type="text" hintText="email" ref="email" /> <br />
            <input type="password" hintText="password" ref="password" /> <br />

            <button primary={true} onClick={this.doSignup}>
                Signup
            </button>*/}
        </div>)
    }
}
export default (Signup);
// export default connect(mapStateToProps, mapDispatchToProps)(Signup)

