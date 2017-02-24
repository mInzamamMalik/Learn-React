import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { Provider } from 'react-redux';
import store from './store/store'

//to remove 'onTouchTap' warning
import injectTapEventPlugin from 'react-tap-event-plugin'; injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('root')
);
