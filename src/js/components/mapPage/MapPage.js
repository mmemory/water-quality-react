import React from 'react';
import Map from './../map/Map';
import ToolBar from './../toolBar/ToolBar';
import Loader from './../common/loader/Loader';
import locationService from './../../services/locationService';
import waterData from './../../services/waterDataService';
import classNames from 'classnames';

class MapPage extends React.Component {
    constructor() {
        super();

        // Initial map settings
        this.state = {
            lat: 38,
            lng: -97,
            zoom: 4,
            showLoader: false,
            toolbarOpen: true,
            waterData: {
                activity: []
            }
        };

        this.handleToolbarOpen = this.handleToolbarOpen.bind(this);
    }

    locationByCity(city) {
        locationService.locationByCity(city)
            .then(data => {
                this.getDataByCurrentLocation({
                    latitude: data.lat,
                    longitude: data.lng
                });
                this.setState(data);
            });
    }

    ipLocation() {
        locationService.locationByIp()
            .then(data => {
                this.locationByCity(data.city);
            });
    }

    navigatorLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            this.getDataByCurrentLocation(position.coords);
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                zoom: 12,
                showLoader: false
            });
        }, err => {
            console.log(err);
            this.ipLocation();
        });
    }

    getDataByCurrentLocation(coords) {
        waterData.getDataByCurrentLocation(coords)
            .then(waterData => {
                console.log(waterData);
                this.setState({
                    waterData: {activity: waterData.Organization.Activity}
                });
            });
    }

    componentDidMount() {
        this.setState({showLoader: true});

        if (navigator.geolocation) {
            this.navigatorLocation();
        } else {
            this.ipLocation();
        }
    }

    handleToolbarOpen(e) {
        e.stopPropagation();
        this.setState({
            toolbarOpen: !this.state.toolbarOpen
        });
    }

    render() {
        let loaderStyle = this.state.showLoader ? {'display': 'block'} : {'display': 'none'};

        let mapClasses = classNames({
            'map-container': true,
            'toolbar-open': this.state.toolbarOpen,
            'toolbar-closed': !this.state.toolbarOpen
        });

        return (
            <div className="map-wrapper">
                <ToolBar activity={this.state.waterData.activity}
                         toolbarOpen={this.state.toolbarOpen}
                         handleToolbarOpen={this.handleToolbarOpen}/>
                <div className={mapClasses}>
                    <Map {...this.state} />
                    <Loader style={loaderStyle}/>
                </div>
            </div>
        )
    }
}

export default MapPage;