import axios from 'axios';

export default {
    locationByCity: city => {
        return axios.get('https://maps.googleapis.com/maps/api/geocode/json?address="' + encodeURIComponent(city))
            .then(response => {
                console.log(response);
                let res = response.data.results;
                if (res.length === 1) {
                    let coords = res[0].geometry.location;

                    return {
                        lat: coords.lat,
                        lng: coords.lng,
                        zoom: 12,
                        showLoader: false
                    };
                }
            });
    },

    locationByIp: () => {
        return axios.get('http://ip-api.com/json')
            .then(location => {
                console.log(location);
                return {
                    lat: location.data.lat,
                    lng: location.data.lon,
                    zoom: 12,
                    showLoader: false,
                    city: location.data.city,
                    zip: location.data.zip
                };
            }, err => {
                console.log(err);
            });
    }
}