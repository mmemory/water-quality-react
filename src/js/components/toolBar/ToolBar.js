import React from 'react';
import classNames from 'classnames';
import parseData from './../../services/parseDataService';
import keyGen from 'random-key';
import Loader from './../common/loader/Loader';
import MetricResults from '../metricResults/MetricResults';

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

        return (
            <div className={toolbarClasses}>
                <Loader loading={this.props.loadingData && this.props.toolbarOpen}/>

                <div className="toolbar-top">
                    <div className="location-search">
                        <form onSubmit={this.props.handleSubmit}>
                            <input type="text"
                                   placeholder="Search by location"
                                   onChange={this.props.handleChange}
                                   value={this.props.searchVal}/>
                        </form>
                    </div>
                    <div className="menu-button-container">
                        <MenuButton handleClick={this.props.handleClick}/>
                    </div>
                </div>

                <p className="data-message">{this.props.loadedMessage && this.props.toolbarOpen}</p>

                <div className={waterContentClasses}>

                    <div className="water-intro">
                        {/*<h2>Data</h2>*/}
                    </div>

                    <div className="water-data">
                        <MetricResults openInfo={this.props.openInfo}
                                       results={this.props.waterData.organization}
                                       handleBarClick={this.props.handleBarClick}/>
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