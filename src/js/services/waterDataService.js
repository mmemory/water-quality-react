import axios from 'axios';
import parseData from './parseDataService';
import characteristicData from '../utility/characteristics.json';

export default {
    getDataByCurrentLocation: function(coords, date, distance=20) {
        return axios.get(`https://www.waterqualitydata.us/Result/search?Zip=yes&lat=${coords.latitude}&long=${coords.longitude}&within=${distance}&startDateLo=${parseData.parseDate(date)}&mimeType=xml&characteristicName=${parseData.makeCharacteristicNames(characteristicData)}&siteType=Well;Spring;Aggregate surface-water-use;Aggregate groundwater use`)
            .then(function(data) {
                return parseData.xmlToJson(parseData.parseXml(data.data)).WQX;
            });
    }
}