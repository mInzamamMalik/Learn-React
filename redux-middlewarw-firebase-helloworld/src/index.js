import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './App';
import './index.css';

import firebaseConfig from './config';

import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <Todo></Todo>
  </Provider>
, document.getElementById('root'));
