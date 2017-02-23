import { createStore, compose } from 'redux'
import { reduxReactFirebase } from 'redux-react-firebase'

import allReducers from './reducers/index.js'

const config = {
    piKey: "AIzaSyDspeNWtv6xycKzfsFA2mcVWxIYaKA1Mkk",
    authDomain: "test-project-5a3f4.firebaseapp.com",
    databaseURL: "https://test-project-5a3f4.firebaseio.com",
    storageBucket: "test-project-5a3f4.appspot.com",
    messagingSenderId: "523897901107"
}

const store = compose(reduxReactFirebase(config))(createStore)(allReducers, initialState)

export default store;