import React from 'react';
import classNames from 'classnames';
import parseData from './../../services/parseDataService';
import keyGen from 'random-key';
import MetricBar from '../metricBar/MetricBar';
import fedLimits from '../../utility/characteristics.json';

const MetricResults = (props) => {

    let data = parseData.formatData(props.results);

    let waterResults = data.map((r) => {
        // console.log(r);
        let name = r.data.ResultDescription.CharacteristicName.text;
        let result = r.data.ResultDescription.ResultMeasure.ResultMeasureValue.text;
        let unit = r.data.ResultDescription.ResultMeasure.MeasureUnitCode.text;
        let date = r.data.ResultLabInformation.AnalysisStartDate.text;
        return (
            <MetricBar key={keyGen.generate()}
                       measurement={result}
                       unit={unit}
                       name={name}
                       date={date}
                       fedLimit={fedLimits[name][unit]}
                       openInfo={props.openInfo}
                       handleBarClick={props.handleBarClick}
                       organization={r.organization}/>
        );
    });

    return (
        <div className="metric-results-container">
            {waterResults}
        </div>
    )
};

export default MetricResults;