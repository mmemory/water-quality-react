import React from 'react';
import classNames from 'classnames';
import parseData from './../../services/parseDataService';

class MetricBar extends React.Component {

    constructor(props) {
        super();

        this.state = {
            displayInfo: false
        };

        this.handleInfoToggle = this.handleInfoToggle.bind(this);
    }

    handleInfoToggle(e) {
        e.preventDefault();
        this.setState({displayInfo: !this.state.displayInfo});
    }

    render() {
        let barSettings = parseData.calculateMeasurementPercent(this.props);

        let barClasses = classNames({
            'measurement-bar': true,
            'safe': this.props.measurement < barSettings.barLimit,
            'danger': this.props.measurement > barSettings.barLimit,
            'warning': this.props.measurement <= barSettings.barLimit && this.props.measurement > (barSettings.barLimit - (barSettings.barLimit * .15))
        });

        let metricInfoClasses = classNames({
            'metric-bar-wrapper': true,
            'show-content': this.state.displayInfo
        });

        let measurement = this.props.measurement.charAt(0) === `.` ? `0${this.props.measurement}` : this.props.measurement;

        return (
            <div className={metricInfoClasses}>

                <div className="metric-bar-container">
                    <div className="metric-title-container" onClick={this.handleInfoToggle}>
                        <p>{this.props.name}</p>
                    </div>

                    <div className="metric-bar">

                        <div style={barSettings.barStyle} className={barClasses}>
                            <p>{measurement} {this.props.unit}</p>
                        </div>
                        <div style={barSettings.limitStyle} className="limit-marker"></div>
                    </div>
                </div>

                <div className="metric-info-container">

                    <div className="metric-padding-container">
                        <p><span>Provided by:</span> {this.props.organization.OrganizationFormalName.text}</p>
                        <p><span>Date:</span> {parseData.parseDate(this.props.date)}</p>
                        <p><span>Limit:</span> {this.props.fedLimit} {this.props.unit}</p>
                    </div>

                </div>
            </div>
        );
    }

}

export default MetricBar;