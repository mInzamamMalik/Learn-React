import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { Provider } from 'react-redux';
import store from './store/store'

import GitUser from './components/user';


ReactDOM.render(
    <Provider store={store}>
        <GitUser />
    </Provider>
    , document.getElementById('root')
);
