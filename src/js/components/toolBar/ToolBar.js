import React from 'react';
import classNames from 'classnames';
import keyGen from 'random-key';

const MenuButton = (props) => {

    return (
        <div className="menu-button" onClick={props.handleToolbarOpen}></div>
    );
};

const ToolBar = (props) => {

    let toolbarClasses = classNames({
        'toolbar-container': true,
        'toolbar-closed': !props.toolbarOpen,
        'toolbar-open': props.toolbarOpen
    });

    let waterData = [];

    props.activity.forEach(function(item) {

        if (item.Result instanceof Array) {
            waterData = [
                ...waterData,
                ...item.Result
            ];
        } else if (item.Result.ResultDescription) {
            waterData.push(item);
        }
    });

    waterData = waterData.map(function(d) {
        if(d && d.ResultDescription && d.ResultDescription.ResultMeasure) {
            return (
                <li key={keyGen.generate()}>
                    <span>{d.ResultDescription.CharacteristicName.text}: </span>
                    <span>{d.ResultDescription.ResultMeasure.ResultMeasureValue.text} {d.ResultDescription.ResultMeasure.MeasureUnitCode.text}</span>
                </li>
            );
        }
    });

    return (
        <div className={toolbarClasses}>
            <MenuButton handleToolbarOpen={props.handleToolbarOpen}/>

            <div className="water-data">
                <ul>
                    {waterData}
                </ul>
            </div>
        </div>
    );
};

export default ToolBar;