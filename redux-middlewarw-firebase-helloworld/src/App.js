import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Link extends Component {
    render() {

        const url = '/'
            + this.props.label
                .toLowerCase()
                .trim()
                .replace(' ', '-');

        return React.createElement(
            'a',
            { href: url },
            this.props.label,
            React.createElement('br')
        )

    }
}

class Menu extends Component {
    render() {
        let menus = ['Home',
            'About',
            'Services',
            'Portfolio',
            'Contact us']
        return React.createElement('div',
            null,
            menus.map((v, i) => {
                return React.createElement('div',
                    { key: i },
                    React.createElement(Link, { label: v })
                )
            })
        )
    }
}
export default Menu;
