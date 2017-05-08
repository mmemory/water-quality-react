import React from 'react';
import {Link} from 'react-router-dom';
import Footer from './../common/Footer/Footer';
import ShowcaseContainer from './showcaseContainer/showcaseContainer';
import HeroContainer from './heroContainer/heroContainer';
import ActionCallSection from './actionCallSection/actionCallSection';
import MobileShowcaseContainer from './mobileShowcaseContainer/mobileShowcaseContainer';


const Home = () => {
    return (
        <div className="content-main">
            <HeroContainer/>
            <main>
                <ShowcaseContainer/>

                <MobileShowcaseContainer/>

                <ActionCallSection/>
            </main>
            <Footer />
        </div>
    );
};

export default Home;