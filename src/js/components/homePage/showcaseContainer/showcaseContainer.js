import React from 'react';

const ShowcaseContainer = () => {
    return (
        <section className="desktop-showcase-container">
            <div className="master-width-wrapper">

                <header className="showcase-header">

                    <h2 className="hero-title">What’s in your water?</h2>

                </header>

                <main className="showcase-main">

                    <div className="right-container">
                        <div className="image-container"></div>
                    </div>

                    <div className="left-container">

                        <div>
                            <p>Easily see latest testing results
                                of water quality, and what that means
                                for you and your family.</p>
                        </div>

                        <div>
                            <p>Quick access to information about
                                water quality in your area.</p>
                        </div>

                    </div>

                </main>
            </div>
        </section>
    )
};

export default ShowcaseContainer;