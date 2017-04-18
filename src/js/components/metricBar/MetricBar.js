import React from 'react';
import classNames from 'classnames';

const MetricBar = (props) => {
    let barLimit = props.fedLimit;
    let barMax = barLimit + (barLimit * .25);
    let percentWidth = (Number(props.measurement) / barMax) * 100;
    let realWidth = percentWidth > 100 ? 100 : percentWidth;
    let barStyle = {'width': `${realWidth}%`};
    let limitStyle = {'left': `75%`};

    let barClasses = classNames({
        'measurement-bar': true,
        'safe': props.measurement < barLimit,
        'danger': props.measurement > barLimit,
        'warning': props.measurement <= barLimit && props.measurement > (barLimit - (barLimit * .15))
    });

    return (
        <div className="metric-bar">

            <div style={barStyle} className={barClasses}>
                <p>{props.measurement} {props.unit}</p>
            </div>
            <div style={limitStyle} className="limit-marker"></div>

        </div>
    );
};

export default MetricBar;