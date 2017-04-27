let parseHelpers = {

    // mm-dd-yyyy
    parseDate: function (date) {
        let d = date ? new Date(date) : new Date();
        d.setMonth(d.getMonth() - 36);
        d.setHours(0, 0, 0);

        let twoDigitDate = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
        let twoDigitMonth = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();

        return `${twoDigitMonth}-${twoDigitDate}-${d.getFullYear()}`;
    },

    calculateMeasurementPercent: function (props) {
        let barLimit = props.fedLimit;
        let barMax = barLimit + (barLimit * .25);
        let percentWidth = (Number(props.measurement) / barMax) * 100;
        let realWidth = percentWidth > 100 ? 100 : percentWidth;
        let barStyle = {'width': `${realWidth}%`};
        let limitStyle = {'left': `75%`};

        return {
            barLimit,
            barMax,
            percentWidth,
            realWidth,
            barStyle,
            limitStyle
        }
    },

    makeCharacteristicNames: function (charData) {
        let charNames = [];
        for (let char in charData) {
            charNames.push(char);
        }
        return charNames.join(';')
    },

    formatData: function (data) {
        let latest = {},
            waterResults = [];
        data.forEach(function (o) {

            o.Activity.forEach(function (a) {

                a.Result.forEach(function (r) {
                    if (r.ResultLabInformation && r.ResultLabInformation.AnalysisStartDate) {
                        let name = r.ResultDescription.CharacteristicName.text;
                        let resultDate = new Date(r.ResultLabInformation.AnalysisStartDate.text);

                        if ((!latest[name] || latest[name].time < resultDate.getTime()) && r.ResultDescription.ResultMeasure && r.ResultDescription.ResultMeasure.ResultMeasureValue) {
                            latest[name] = {time: resultDate.getTime(), data: r, organization: o.OrganizationDescription};
                        }
                    }
                });
            });
        });

        for (let k in latest) {
            waterResults.push(latest[k]);
        }

        return waterResults;
    },

    xmlToJson: (xml) => {
        // Create the return object
        let obj = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (let j = 0; j < xml.attributes.length; j++) {
                    let attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                //debugger;
                let item = xml.childNodes.item(i);
                let nodeName = item.nodeName;
                if (nodeName.charAt(0) === '#') nodeName = nodeName.split('').splice(1).join('');
                if (item.parentNode.nodeName === '#document') {
                    obj[nodeName] = parseHelpers.xmlToJson(item);
                } else if (typeof(obj[nodeName]) === "undefined") {
                    /* Possible to have more than one organization. The following logic puts the organization object in an array
                     even if there is only one organization. Makes it more predictable to sift through the data
                     knowing that there will always be an array */
                    if (nodeName === "Organization" || nodeName === "Activity" || nodeName === "Result") {
                        obj[nodeName] = [parseHelpers.xmlToJson(item)];
                    } else {
                        obj[nodeName] = parseHelpers.xmlToJson(item);
                    }
                } else {
                    if (typeof(obj[nodeName].push) === "undefined") {
                        let old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(parseHelpers.xmlToJson(item));
                }
            }
        }
        return obj;
    },
};

// Set up correct xml parser
if (typeof window.DOMParser != "undefined") {
    parseHelpers.parseXml = function (xmlStr) {
        return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
    };
} else if (typeof window.ActiveXObject != "undefined" &&
    new window.ActiveXObject("Microsoft.XMLDOM")) {
    parseHelpers.parseXml = function (xmlStr) {
        let xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    };
} else {
    throw new Error("No XML parser found");
}

export default parseHelpers;