import React from 'react';
import {BrowserRouter as Router, Route, Redirect, withRouter, Switch} from 'react-router-dom';
import Header from './components/common/Header/Header';
import Home from './components/homePage/Home';
import MapPage from './components/mapPage/MapPage';
import SignupPage from './components/signUpPage/SignupPage';
import axios from 'axios';
import './../base-sass/_main.scss';
import NotFound from './404';

let auth = {
    isAuthenticated: false,
    authenticate(values, cb) {
        let payload = {
            username: values.username,
            password: values.password
        };
        this.isAuthenticated = true;
        axios.post('/api/auth', payload).then(cb, function (err) {
            console.log(err);
        });
    },
    signout(cb) {
        this.isAuthenticated = false;
        axios.get('/auth/logout').then(cb);
    }
};

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        auth.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={LoginPage}/>
                        <PrivateRoute path="/home" component={Home}/>
                        <PrivateRoute path="/map" component={MapPage}/>
                        {/*<Route path="/signup" component={SignupPage}/>*/}
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

class LoginPage extends React.Component {

    constructor(props) {
        super();

        this.state = {
            redirectToReferrer: false,
            username: '',
            password: ''
        };

        this.login = this.login.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    login(e) {
        e.preventDefault();
        auth.authenticate(this.state, (data) => {
            this.setState({redirectToReferrer: true})
        });
    };

    handleInputChange({target}) {
        this.setState({
            [target.name]: target.value
        });
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/home'}};
        const {redirectToReferrer} = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        }

        return (
            <div className="temp-login">
                <h2 className="hero-title">Admin Login</h2>
                <input
                    name="username"
                    type="text"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}/>

                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}/>

                <div className="login-btn" onClick={this.login}>Login</div>
            </div>
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
