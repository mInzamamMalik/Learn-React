import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Navbar, Jumbotron, Button, Panel } from 'react-bootstrap';


class App extends Component {
    render() {

        return <Panel header="React.js" bsStyle="primary"> Hello World </Panel>
    }
}
export default App;
