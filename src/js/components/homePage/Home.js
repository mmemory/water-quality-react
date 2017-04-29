import React from 'react';
import {Link} from 'react-router-dom';
import Footer from './../common/Footer/Footer';
import ShowcaseContainer from './showcaseContainer/showcaseContainer';


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
                <ShowcaseContainer/>

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
            <Footer />
        </div>
    );
};

export default Home;