import React from 'react';
import GoogleMapReact from 'google-map-react';
// import './map.scss';
import mapStyle from './map-style.json';

const Circle = (props) => {
    const customClass = props.$hover ? 'map-circle-hover' : 'map-circle';

    return (
        <div style={props.style} className={customClass}></div>
    );
};

class Map extends React.Component {


    createMapOptions(maps) {

        return {
            styles: mapStyle
        };
    };

    render() {

        let settings = {
            center: {
                lat: this.props.lat,
                lng: this.props.lng
            },
            zoom: this.props.zoom
        };

        let defaultProps = {
            center: {lat: 59.95, lng: 30.33},
            zoom: 11
        };

        let circleStyle = this.props.showLoader ? {'display': 'none'} : {'display': 'block'};


        return (
            <GoogleMapReact
                defaultCenter={settings.center}
                bootstrapURLKeys={{key: 'AIzaSyCEnKcbM3rv45LbfeE21QWqgOPERexomXU'}}
                defaultZoom={settings.zoom}
                center={settings.center}
                zoom={settings.zoom}
                options={this.createMapOptions}>

                <Circle style={circleStyle} lat={settings.center.lat} lng={settings.center.lng}/>

            </GoogleMapReact>
        );
    }
}

export default Map;

