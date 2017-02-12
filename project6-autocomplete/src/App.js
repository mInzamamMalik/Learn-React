import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Navbar, Jumbotron, Button, Panel } from 'react-bootstrap';

import Autocomplete from './components/autocomplete.jsx';
// import { rooms, url } from window.__autocomplete_data;

class App extends Component {
    render() {

        return <Autocomplete
            options={[
                {
                    "name": "sdfsdfsd",
                    "id": "fgsdfgsdf"
                }
                ]}
            url={"http://localhost:3000/rooms"} />
    }
}
export default App;
