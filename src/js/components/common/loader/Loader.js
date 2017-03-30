import React from 'react';
import './loader.scss';

const Loader = (props) => {
    return (
        <div style={props.style} className="loading-container"></div>
    )
};

export default Loader;