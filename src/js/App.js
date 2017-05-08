import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Header from './components/common/Header/Header';
import Home from './components/homePage/Home';
import MapPage from './components/mapPage/MapPage';
import SignupPage from './components/signUpPage/SignupPage';
import LoginPage from './components/loginPage/LoginPage';
import './../base-sass/_main.scss';
import axios from 'axios';


class Routes extends React.Component {
    constructor(props) {
        super();

        this.state = {
            loggedIn: false
        }
    }

    componentWillMount() {
        this.checkForAuth();
    }

    checkForAuth() {

        axios.get('/user').then(function () {
            this.setState({
                loggedIn: true
            });
        });

    }

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Route exact path="/" component={LoginPage}/>
                    <Route path="/home" render={({match}) => (
                        this.state.loggedIn ? <Home/> : <Redirect to="/"/>
                    )}/>
                    <Route path="/map" component={MapPage}/>
                    <Route path="/signup" component={SignupPage}/>
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
