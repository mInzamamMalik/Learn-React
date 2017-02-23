import React, { Component } from 'react';
import { Link } from 'react-router'

class Dashboard extends Component {
    render() {
        return (<div>

            <h1>This is Dashboard</h1>

            <Link to="/dashboard/profile">Profile</Link>
            <Link to="/dashboard/about">About</Link>
            <Link to="/dashboard/contact">Contact</Link>

            {this.props.children}
        </div>)
    }
}

export default Dashboard;