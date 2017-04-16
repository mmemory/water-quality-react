import axios from 'axios';
import parseData from './parseDataService';

export default {
    getDataByCurrentLocation: function(coords, characteristics, date) {
        return axios.get(`https://www.waterqualitydata.us/Result/search?Zip=yes&lat=${coords.latitude}&long=${coords.longitude}&within=20&startDateLo=${parseData.parseDate(date)}&mimeType=xml&characteristicName=Fluoride;Sulfate;Dissolved solids;Lead&siteType=Well;Spring;Aggregate surface-water-use;Aggregate groundwater use`)
            .then(function(data) {
                return parseData.xmlToJson(parseData.parseXml(data.data)).WQX;
            });
    }
}