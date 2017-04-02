import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/common/Header/Header';
import Home from './components/homePage/Home';
import MapPage from './components/mapPage/MapPage';
import './../base-sass/_main.scss';


class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Route exact path="/" component={Home}/>
                    <Route path="/map" component={MapPage}/>
                </div>
            </Router>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <Routes />
        );
    }
}

export default App;
