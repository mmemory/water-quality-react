import React from 'react';
import {Link} from 'react-router-dom';

class UserInfoForm extends React.Component {
    constructor(props) {
        super();
    }


    render() {
        let formFields;

        switch (this.props.type) {
            case 'login':
                formFields = (
                    <div className="input-fields">
                        <input type="text" placeholder="email"/>
                        <input type="text" placeholder="password"/>
                        <Link to="/map"><input type="submit" value="Login"/></Link>
                    </div>
                );
                break;
            case 'signup':
                formFields = (
                    <div className="input-fields">
                        <input type="text" placeholder="first name"/>
                        <input type="text" placeholder="last name"/>
                        <input type="text" placeholder="email"/>
                        <input type="text" placeholder="password"/>
                        <input type="text" placeholder="re-type password"/>
                        <Link to="/map"><input type="submit" value="Create Account"/></Link>
                    </div>
                );
                break;
            default:
                break;
        }

        return (
            <form className="user-info-form" action="">
                {formFields}
            </form>
        )

    };
}

export default UserInfoForm;