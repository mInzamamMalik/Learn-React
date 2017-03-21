import * as React from "react";
import * as ReactDOM from "react-dom";

import * as config from './config'; config;
import Todo from './App';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
    <Provider store={store}>
        <Todo></Todo>
    </Provider>,
    document.getElementById('root')
);
