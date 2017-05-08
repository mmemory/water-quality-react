import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
    return (
        <header className="main-header">
            <div className="header-width-wrapper">
                <div className="nav-left">
                    <Link to="/home">
                        <div className="logo-container">
                            <div className="water-logo"></div>
                        </div>
                    </Link>
                </div>

                <div className="nav-right">
                    {/*<ul>*/}
                        {/*<li><Link to="/signup">Login</Link></li>*/}
                    {/*</ul>*/}
                </div>

            </div>
        </header>
    );
}

export default Header;