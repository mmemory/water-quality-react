import React from 'react';
// import './Header.scss';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <header className="main-header">
                <div className="master-width-wrapper">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/map">Map</Link></li>
                    </ul>
                </div>
            </header>
        );
    };
}

export default Header;