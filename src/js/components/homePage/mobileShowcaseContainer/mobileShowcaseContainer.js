import React from 'react';
import {Link} from 'react-router-dom';
import appStoreIcon from './../../../../assets/app-store-Icon.png'
import androidStoreIcon from './../../../../assets/android-store-icon.png'

const MobileShowcaseContainer = () => {
    return (
        <section className="mobile-showcase-container">
            <div className="master-width-wrapper">

                <div className="left-container">
                    <div className="left-inner-container">
                        <div className="image-container"></div>
                    </div>

                    <div className="right-inner-container">
                        <div className="appstore-icons-container">
                            <Link to="/">
                                <img width="187" src={appStoreIcon} alt="Available on iPhone Appstore"/>
                            </Link>

                            <Link to="/">
                                <img width="187" src={androidStoreIcon} alt="Available on Google Play Store"/>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="right-container">
                    <h2 className="hero-title">Put water quality
                        in your hands.</h2>
                    <p>Information about drinking water
                        wherever you go.</p>
                </div>
            </div>
        </section>
    )
};

export default MobileShowcaseContainer;