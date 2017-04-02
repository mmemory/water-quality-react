import axios from 'axios';

export default {
    locationByCity: (city) => {
        return axios.get('https://maps.googleapis.com/maps/api/geocode/json?address="'+encodeURIComponent(city))
            .then((response) => {
                console.log(response);
                let res = response.data.results;
                if(res.length === 1) {
                    let coords = res[0].geometry.location;

                    let newState = {
                        lat: coords.lat,
                        lng: coords.lng,
                        zoom: 12,
                        showLoader: false
                    };

                    return newState;
                }
            });
    }
}