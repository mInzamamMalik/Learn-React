import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



import Password from './components/password.jsx'



class App extends Component {
    render() {
        return <Password
            upperCase={true}
            lowerCase={true}
            special={true}
            number={true}
            over6={true} />
    }
}
export default App;
