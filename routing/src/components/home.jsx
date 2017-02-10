import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (<div>
            <h1>This is Dashboard </h1>
            <br />
            <a href="#profile">Profile</a>
            <br />
            <a href="#contacts">Contacts</a>
            <br />
            <a href="#about">About</a>
        </div>)
    }
}
export default Home;