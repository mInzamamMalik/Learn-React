import React, { Component } from 'react';
import Menu from './menu.jsx'

class Home extends Component {
    render() {
        return (<div>
            <Menu></Menu>
            <h1>This is Dashboard </h1>

            {this.props.children}

        </div>)
    }
}
export default Home;