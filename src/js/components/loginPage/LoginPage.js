import React from 'react';
import axios from 'axios';


class LoginPage extends React.Component {

    render() {
        return (
            <div>
                <form method="get" action="/auth">
                    <input name="username" type="text"/>
                    <input name="password" type="password"/>
                    <input type="submit" value="Login"/>
                </form>

            </div>
        );
    }
}

export default LoginPage;
