import React from 'react';
import classNames from 'classnames';
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

    let waterResults = [],
        latest = {};

    props.organization.forEach(function (d) {

        d.Activity.forEach(function (a) {

            a.Result.forEach(function (r) {
                let name = r.ResultDescription.CharacteristicName.text;
                let resultDate = new Date(r.ResultLabInformation.AnalysisStartDate.text);

                if ((!latest[name] || latest[name].time < resultDate.getTime()) && r.ResultDescription.ResultMeasure && r.ResultDescription.ResultMeasure.ResultMeasureValue) {
                    latest[name] = {time: resultDate.getTime(), data: r};
                }
            });
        });
    });

    for (let k in latest) {
        waterResults.push(latest[k].data);
    }

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