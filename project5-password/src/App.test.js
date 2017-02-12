import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

var sum = function (a, b) {
    return a + b;
}

it('testing function', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum("5", 4)).toBe("54");    
});
