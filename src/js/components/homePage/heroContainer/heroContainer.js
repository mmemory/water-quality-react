import React from 'react';
import {Link} from 'react-router-dom';

const HeroContainer = () => {
    return (
        <section className="hero-container">
            <div className="master-width-wrapper">

                <div className="title-container">
                    <h2 className="hero-title">Know what you drink</h2>
                    <Link to="/map">
                        <div className="ghost-btn btn-small">
                            Sign Up
                        </div>
                    </Link>
                </div>

            </div>
        </section>
    )
};

export default HeroContainer;