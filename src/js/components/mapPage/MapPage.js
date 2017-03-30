import React from 'react';
import Map from './../map/Map';
import ToolBar from './../toolBar/ToolBar';
import Loader from './../common/loader/Loader';

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

    shouldComponentUpdate(nextProps, nextState) {
        console.log('PARENT',nextState);
        return true;
    }

    componentWillMount() {
        this.setState({
            showLoader: true
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    zoom: 12,
                    showLoader: false
                });
            });
        }
    }

    render() {
        let loaderStyle = this.state.showLoader ? {'display': 'block'} : {'display': 'none'};

        return (
            <div className="map-container">
                <ToolBar />
                <Map {...this.state} />
                <Loader style={loaderStyle} />
            </div>
        )
    }
}

export default MapPage;