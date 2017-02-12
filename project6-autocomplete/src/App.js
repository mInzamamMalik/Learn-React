import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Navbar, Jumbotron, Button, Panel } from 'react-bootstrap';

import Autocomplete from './components/autocomplete.jsx';

class App extends Component {
    render() {

        return <Autocomplete
            options={[]}
            url={"https://malikasinger-demo-server.herokuapp.com/autocomplete/v1/rooms"} />
    }
}
export default App;
