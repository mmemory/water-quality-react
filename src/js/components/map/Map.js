import React from 'react';
import GoogleMapReact from 'google-map-react';
import './map.scss';
import mapStyle from './map-style.json';
console.log(mapStyle);

// const InitGoogleMap = withGoogleMap(props => (
//     <GoogleMap
//         ref={props.onMapLoad}
//         defaultZoom={props.zoom}
//         defaultCenter={{ lat: props.lat, lng: props.lng }}
//         onClick={props.onMapClick}
//         center={props.center}
//         zoom={props.zoom}
//     >
//         {console.log(props.circle)}
//
//
//         <Circle
//             {...props.circle}
//             onClick={_.noop}
//             onRightClick={_.noop}
//             onDragStart={_.noop}
//         />
//
//     </GoogleMap>
// ));

// {/*<InitGoogleMap*/}
//     {/*containerElement={<div className="map-container" />}*/}
//     {/*mapElement={<div className="map-element" />}*/}
//     {/*lat={this.props.lat}*/}
//     {/*lng={this.props.lng}*/}
//     {/*zoom={this.props.zoom}*/}
//     {/*onMapLoad={_.noop}*/}
//     {/*onMapClick={_.noop}*/}
//     {/*circle={circle}*/}
//     {/*center={center}*/}
// {/*/>*/}



class Circle extends React.Component {
    render() {
        const customClass = this.props.$hover ? 'map-circle-hover' : 'map-circle';

        return (
            <div className={customClass}></div>
        );
    }
}

class Map extends React.Component {


    shouldComponentUpdate(nextProps, nextState) {
        // console.log('MAP',nextProps);
        return true;
    }

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

        return (
            <GoogleMapReact
                defaultCenter={settings.center}
                defaultZoom={settings.zoom}
                center={settings.center}
                zoom={settings.zoom}
                options={this.createMapOptions}>

                <Circle lat={settings.center.lat} lng={settings.center.lng}/>

            </GoogleMapReact>
        );
    }
}

export default Map;

