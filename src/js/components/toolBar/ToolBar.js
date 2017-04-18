import React from 'react';
import classNames from 'classnames';
import parseData from './../../services/parseDataService';
import keyGen from 'random-key';
import Loader from './../common/loader/Loader';
import MetricBar from '../metricBar/MetricBar';
import fedLimits from '../../utility/characteristics.json';

const MenuButton = (props) => {
    return (
        <div className="menu-icon" onClick={props.handleClick}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

class ToolBar extends React.Component {

    shouldComponentUpdate(nextProps) {
        //return nextProps.waterData.organization.length > 0 || nextProps.message.length > 0
        return true;
    }

    render() {
        let toolbarClasses = classNames({
            'toolbar-container': true,
            'toolbar-closed': !this.props.toolbarOpen,
            'toolbar-open': this.props.toolbarOpen
        });

        let waterContentClasses = classNames({
            'water-content-container': true,
            'show-content': (this.props.waterData.organization.length > 0 && this.props.toolbarOpen)
        });

        let formClasses = classNames({
            'hide-form': !this.props.noData || !this.props.toolbarOpen,
            'location-search': true
        });

        let data = parseData.formatData(this.props.waterData.organization);

        let waterResults = data.map(function (r) {
            let name = r.ResultDescription.CharacteristicName.text;
            let result = r.ResultDescription.ResultMeasure.ResultMeasureValue.text;
            let unit = r.ResultDescription.ResultMeasure.MeasureUnitCode.text;
            return (
                <MetricBar key={keyGen.generate()}
                           measurement={result}
                           unit={unit}
                           name={name}
                           fedLimit={fedLimits[name][unit]}/>
            );
        });

        let titles = data.map(function (r) {
            let name = r.ResultDescription.CharacteristicName.text;
            return (
                <div key={keyGen.generate()} className="title-bar">
                    <p>{name}</p>
                </div>
            );
        });

        return (
            <div className={toolbarClasses}>
                <MenuButton handleClick={this.props.handleClick}/>
                <Loader loading={this.props.loadingData}/>
                <p className="data-message">{this.props.loadedMessage}</p>

                <div className={formClasses}>
                    <form onSubmit={this.props.handleSubmit}>
                        <input type="text"
                               placeholder="Search by location"
                               onChange={this.props.handleChange} value={this.props.searchVal}/>
                    </form>
                </div>

                <div className={waterContentClasses}>
                    <div className="location-search">
                        <form onSubmit={this.props.handleSubmit}>
                            <input type="text"
                                   placeholder="Search by location"
                                   onChange={this.props.handleChange} value={this.props.searchVal}/>
                        </form>
                    </div>

                    <div className="water-intro">
                        {/*<h2>Data</h2>*/}
                    </div>

                    <div className="water-data">
                        <div className="metric-titles-container">
                            {titles}
                        </div>
                        <div className="metric-results-container">
                            {waterResults}
                        </div>
                    </div>

                    <div className="water-info">
                        <h2>Information</h2>
                        <p>Bacon ipsum dolor amet andouille jerky cow hamburger leberkas, tongue rump fatback shoulder
                            pork short ribs burgdoggen ham tail. Alcatra boudin porchetta ribeye pork pastrami tri-tip
                            turkey tail, shoulder shankle.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToolBar;