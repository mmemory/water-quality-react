import React from 'react';
import classNames from 'classnames';

const Loader = (props) => {

    let loaderClasses = classNames({
        'loader-wrapper': true,
        'loading-data': props.loading
    });

    return (
        <div className={loaderClasses}>
            <div className="loading-container"></div>
            {props.children}
        </div>
    )
};

export default Loader;