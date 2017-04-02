import React from 'react';
import Map from './../map/Map';
import ToolBar from './../toolBar/ToolBar';
import Loader from './../common/loader/Loader';
import locationService from './../../services/locationService';

class MapPage extends React.Component {
    constructor() {
        super();

        this.state = {
            lat: 0,
            lng: 0,
            zoom: 3,
            showLoader: false
        }
    }

    locationByCity(city) {
        locationService.locationByCity(city)
            .then((data) => {
                this.setState(data);
            });
    }

    ipLocation() {
        axios.get('http://ip-api.com/json')
            .then((location) => {
                console.log(location);
                this.setState({
                    lat: location.data.lat,
                    lng: location.data.lon,
                    zoom: 12,
                    showLoader: false
                })
            }, (err) => {
                console.log(err);
            });
    }

    navigatorLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                zoom: 12,
                showLoader: false
            });
        }, (err) => {
            console.log(err);
            this.ipLocation();
        });
    }

    componentDidMount() {
        this.setState({
            showLoader: true
        });

        if (navigator.geolocation) {
            this.navigatorLocation();
        } else {
            this.ipLocation();
        }

        // this.locationByCity('Provo')
    }

    render() {
        let loaderStyle = this.state.showLoader ? {'display': 'block'} : {'display': 'none'};

        return (
            <div className="map-wrapper">
                <ToolBar />
                <div className="map-container">
                    <Map {...this.state} />
                    <Loader style={loaderStyle}/>
                </div>
            </div>
        )
    }
}

export default MapPage;