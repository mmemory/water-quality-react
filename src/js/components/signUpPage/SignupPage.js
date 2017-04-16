import React from 'react';
import {Link} from 'react-router-dom';
import UserInfoForm from './../userInfoForm/UserInfoForm';

class SignupPage extends React.Component {



    render() {
        return (
            <div className="user-signup-container">
                <div className="master-width-wrapper">
                    <div className="login-container">
                        <h2>Already have an account?</h2>
                        <UserInfoForm type="login"/>
                    </div>
                    <div className="signup-container">
                        <h2>Sign Up</h2>
                        <UserInfoForm type="signup"/>
                    </div>
                </div>
            </div>
        );
    };
}

export default SignupPage;