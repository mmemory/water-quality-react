import React from 'react';
import classNames from 'classnames';
import parseData from './../../services/parseDataService';
import keyGen from 'random-key';

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

const ToolBar = (props) => {

    let toolbarClasses = classNames({
        'toolbar-container': true,
        'toolbar-closed': !props.toolbarOpen,
        'toolbar-open': props.toolbarOpen
    });

    let waterResults = parseData.formatData(props.organization);

    waterResults = waterResults.map(function (r) {
        let name = r.ResultDescription.CharacteristicName.text;
        let result = r.ResultDescription.ResultMeasure.ResultMeasureValue.text;
        let unit = r.ResultDescription.ResultMeasure.MeasureUnitCode.text;
        return (<li key={keyGen.generate()}>{name}: {result} {unit}</li>);
    });

    return (
        <div className={toolbarClasses}>
            <MenuButton handleToolbarOpen={props.handleToolbarOpen}/>

            <div className="water-data">
                <ul>
                    {waterResults}
                </ul>
            </div>
        </div>
    );
};

export default ToolBar;