import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

//to remove 'onTouchTap' warning
import injectTapEventPlugin from 'react-tap-event-plugin'; injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
ReactDOM.render(

    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>,
    document.getElementById('root')
);
