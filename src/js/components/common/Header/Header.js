import React from 'react';
// import './Header.scss';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <header className="main-header">
                <div className="master-width-wrapper">
                    <div className="nav-left">
                        <Link to="/">
                            <div className="logo-container">
                                <div className="water-logo"></div>
                            </div>
                        </Link>
                    </div>

                    <div className="nav-right">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/map">Map</Link></li>
                        </ul>
                    </div>

                </div>
            </header>
        );
    };
}

export default Header;