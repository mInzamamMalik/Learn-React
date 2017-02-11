import React, { Component } from 'react';
import { Link } from 'react-router'

class Menu extends Component {
    render() {
        return (
            <ul>
                <li>
                    <Link to="/profile">Profile</Link> <br />
                </li>
                <li>
                    <Link to="/about">About</Link> <br />
                </li>
                <li>
                    <Link to="/contacts">Contacts</Link> <br />
                </li>
            </ul>
        )
    }
}
export default Menu;