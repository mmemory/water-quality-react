import React from 'react';
import Map from './../map/Map';

class MapPage extends React.Component {
    constructor() {
        super();

        this.state = {
            lat: 0,
            lng: 0,
            zoom: 3
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('PARENT',nextState);
        return true;
    }

    componentWillMount() {
        // alert('test');
        let _this = this;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                _this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    zoom: 12
                });
            });
        }
    }

    render() {
        return (
            <div className="map-container">
                <Map {...this.state} />
            </div>
        )
    }
}

export default MapPage;