import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import store from "./store/reducers.js"


var callback = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}

store.subscribe(callback)
callback()