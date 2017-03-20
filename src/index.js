import React from 'react';
import ReactDOM from 'react-dom';
import './js/App.js';

class App extends React.Component {

    render() {
        return (
            <h1>Water Quality</h1>
        );
    }
};

ReactDOM.render(<App />,  document.getElementById("app"));