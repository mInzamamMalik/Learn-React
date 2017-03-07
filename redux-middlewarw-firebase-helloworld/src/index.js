import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './App';
import './index.css';

import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <Signup></Signup>
  </Provider>
, document.getElementById('root'));
