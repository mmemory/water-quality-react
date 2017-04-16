import React from 'react';
import classNames from 'classnames';
import parseData from './../../services/parseDataService';
import keyGen from 'random-key';
import Loader from './../common/loader/Loader';

const MenuButton = (props) => {
    return (
        <div className="menu-icon" onClick={props.handleToolbarOpen}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

class ToolBar extends React.Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.organization.length > 0
    }

    render() {
        let toolbarClasses = classNames({
            'toolbar-container': true,
            'toolbar-closed': !this.props.toolbarOpen,
            'toolbar-open': this.props.toolbarOpen
        });

        let waterResults = parseData.formatData(this.props.organization).map(function (r) {
            let name = r.ResultDescription.CharacteristicName.text;
            let result = r.ResultDescription.ResultMeasure.ResultMeasureValue.text;
            let unit = r.ResultDescription.ResultMeasure.MeasureUnitCode.text;
            return (<li key={keyGen.generate()}>{name}: {result} {unit}</li>);
        });

        return (
            <div className={toolbarClasses}>
                <Loader loading={(this.props.organization.length === 0)}>
                    <p>Getting data</p>
                </Loader>
                <MenuButton handleToolbarOpen={this.props.handleToolbarOpen}/>

                <div className="water-data">
                    <ul>
                        {waterResults}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ToolBar;