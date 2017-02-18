import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/store.js'

const callback = () => {
    ReactDOM.render(
        <App
            value={store.getState()}
            onINCREMENT={() => { store.dispatch({ type: 'INCREMENT' }) }}
            onDECREMENT={() => { store.dispatch({ type: 'DECREMENT' }) }}
        />,
        document.getElementById('root')
    );
}
store.subscribe(callback);
callback()

