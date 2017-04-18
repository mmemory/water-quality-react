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
            loadingData: true,
            toolbarOpen: true,
            waterData: {organization: []},
            noData: false,
            loadedMessage: '',
            searchArea: 20,
            searchVal: ''
        };

        this.handleToolbarOpen = this.handleToolbarOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    locationByCity(city) {
        locationService.locationByCity(city)
            .then(data => {
                console.log(data);
                this.getDataByCurrentLocation({
                    latitude: data.lat,
                    longitude: data.lng
                });
                this.setState({
                    lat: data.lat,
                    lng: data.lng,
                    noData: false,
                    loadedMessage: ''
                });
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
        this.setState({loadingData: true});

        waterData.getDataByCurrentLocation(coords)
            .then(waterData => {
                console.log(waterData);
                if (!waterData.Organization) {

                    if (this.state.searchArea <= 40) {
                        this.setState({
                            loadedMessage: `Hmmm, we're not finding anything. Widening the search area to ${this.state.searchArea + 10} miles`,
                            searchArea: this.state.searchArea + 10,
                            zoom: this.state.zoom - 1,
                            waterData: {organization: []},
                            noData: true
                        });
                        this.getDataByCurrentLocation(coords, this.state.searchArea)
                    } else {
                        this.setState({
                            loadedMessage: `Sorry, we couldn't find any current data. Try another search.`,
                            loadingData: false,
                            searchArea: 20,
                            zoom: 12
                        });
                    }
                } else {
                    this.setState({
                        waterData: {organization: waterData.Organization},
                        loadingData: false,
                        noData: false,
                        loadedMessage: '',
                        zoom: 12
                    });
                }
            });
    }

    componentDidMount() {
        this.setState({showLoader: true});
        if (navigator.geolocation) this.navigatorLocation();
        else this.ipLocation();
    }

    handleToolbarOpen(e) {
        e.stopPropagation();
        this.setState({
            toolbarOpen: !this.state.toolbarOpen
        });
    }

    handleChange(e) {
        this.setState({searchVal: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.locationByCity(this.state.searchVal);
    }

    render() {
        let mapClasses = classNames({
            'map-container': true,
            'toolbar-open': this.state.toolbarOpen,
            'toolbar-closed': !this.state.toolbarOpen
        });

        return (
            <div className="map-wrapper">
                <ToolBar handleClick={this.handleToolbarOpen}
                         handleChange={this.handleChange}
                         handleSubmit={this.handleSubmit}
                         {...this.state}/>

                <div className={mapClasses}>
                    <Map {...this.state} />
                    <Loader loading={this.state.showLoader}/>
                </div>
            </div>
        );
    }
}

export default MapPage;