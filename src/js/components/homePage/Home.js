import React from 'react';
import {Link} from 'react-router-dom';
import './home.scss';


const Home = () => {
    return (
        <div className="content-main">
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
            <main>
                <section className="desktop-showcase-container">
                    <div className="master-width-wrapper">
                        <header className="">
                            <h2 className="hero-title">What's in your water?</h2>
                        </header>
                        <main>
                            <div className="desktop-image-container">
                                <div className="desktop-image"></div>
                            </div>

                            <p>This is some test text</p>
                            <p>This is some test text</p>

                        </main>

                    </div>
                </section>

                <section className="action-call">
                    <Link to="/map">
                        <div className="ghost-btn btn-medium">
                            See For Yourself
                        </div>
                    </Link>
                </section>
                <section className="mobile-showcase-container">
                    <div className="master-width-wrapper">



                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;