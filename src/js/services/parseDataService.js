let parseHelpers = {

    // mm-dd-yyyy
    parseDate: function(date) {
        let d = date ? new Date(date) : new Date();
        d.setMonth(d.getMonth() - 6);
        d.setHours(0,0,0);

        let twoDigitDate = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
        let twoDigitMonth = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();

        return `${twoDigitMonth}-${twoDigitDate}-${d.getFullYear()}`;
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
            for(let i = 0; i < xml.childNodes.length; i++) {
                let item = xml.childNodes.item(i);
                let nodeName = item.nodeName;
                if(nodeName.charAt(0) === '#') nodeName = nodeName.split('').splice(1).join('');
                if (typeof(obj[nodeName]) == "undefined") {
                    obj[nodeName] = parseHelpers.xmlToJson(item);
                } else {
                    if (typeof(obj[nodeName].push) == "undefined") {
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
    parseHelpers.parseXml = function(xmlStr) {
        return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
    };
} else if (typeof window.ActiveXObject != "undefined" &&
    new window.ActiveXObject("Microsoft.XMLDOM")) {
    parseHelpers.parseXml = function(xmlStr) {
        let xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    };
} else {
    throw new Error("No XML parser found");
}

export default parseHelpers;