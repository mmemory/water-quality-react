import React from 'react';


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
            console.log(data);
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
            <div>
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

                <button onClick={this.login}>Login</button>
            </div>
        );
    }
}
