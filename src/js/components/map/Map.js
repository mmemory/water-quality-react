import React from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyle from './map-style.json';

const Circle = (props) => {

    return (
        <div style={props.style} className="map-circle"></div>
    );
};

class Map extends React.Component {

    constructor(props) {
        super();

        this.state = {
            defaultProps: {
                center: {
                    lat: props.lat,
                    lng: props.lng
                },
                zoom: props.zoom
            }
        }
    }

    createMapOptions(maps) {
        return {styles: mapStyle};
    };

    componentDidMount() {
        this.setState({
            lat: this.props.lat,
            lng: this.props.lng
        });
    }

    render() {

        let center = {
            lat: this.props.lat,
            lng: this.props.lng
        };

        let circleStyle = this.props.showLoader ? {'display': 'none'} : {'display': 'block'};

        return (
            <GoogleMapReact
                defaultCenter={this.state.defaultProps.center}
                bootstrapURLKeys={{key: 'AIzaSyCEnKcbM3rv45LbfeE21QWqgOPERexomXU'}}
                defaultZoom={this.state.defaultProps.zoom}
                center={center}
                zoom={this.props.zoom}
                options={this.createMapOptions}
                resetBoundsOnResize={true}>

                <Circle style={circleStyle} lat={center.lat} lng={center.lng}/>

            </GoogleMapReact>
        );
    }
}

export default Map;

