/* Comment */
import React, { Component } from 'react';
import { render } from 'react-dom';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import SearchBox from "react-google-maps/lib/places/SearchBox";
import Info from './info';
import Action from './action';

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `50%`,
  height: `45px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `5px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `24px`,
  outline: `none`,
  textOverflow: `ellipses`,
  fontStyle: 'initial',
  textAlign: 'center',
  backgroundColor: `rgba(255,255,255, 0.9)`,
};

const GettingStartedGoogleMap = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    center={{ lat: props.markers[0].position.lat , lng: props.markers[0].position.lng }}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      controlPosition={google.maps.ControlPosition.TOP_CENTER}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Enter Your Desired Location"
      inputStyle={INPUT_STYLE}
    />
{props.markers.map(marker => (
  <Marker
    key="1"
    {...marker}
    draggable = {true}
    onDragEnd={props.markerDrag}
  >
      <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
        <div className="infoWindowClass">
          <Info lat={marker.position.lat} lng={marker.position.lng}/>
        </div>
      </InfoWindow>
  </Marker>
))}
  </GoogleMap>
)));

export default class GoogleMapComponent extends Component {
  constructor(props) {
    super(props);
    this.markerDrag = this.markerDrag.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
    this.state = {
      markers: [{
        position: {
          lat: 40.706877,
          lng: -74.011265,
        },
      }]
    }
  }
  markerDrag(marker) {
    this.setState({ markers: [ { position: { lat: Number(marker.latLng.lat().toFixed(4)), lng: Number(marker.latLng.lng().toFixed(4))} } ] });
    Action.markerChange({
      lat: Number(marker.latLng.lat().toFixed(4)),
      lng: Number(marker.latLng.lng().toFixed(4)),
    });
  }
  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }
  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();
    let lat = null;
    let lng = null;
    const markers = places.map(place => {
      lat = Number(place.geometry.location.lat().toFixed(4));
      lng = Number(place.geometry.location.lng().toFixed(4));
    });
    this.setState({ markers: [ { position: { lat, lng} } ] });
    Action.markerChange({
      lat,
      lng,
    });
  }
  render() {
  return (<GettingStartedGoogleMap
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAuxPEcwDMrEq04KEJjzhAyMyiJWPbUAus&&libraries=places"
    loadingElement={
      <div style={{ height: `100%` }}>
        <div
          style={{
            display: `block`,
            width: `80px`,
            height: `80px`,
            margin: `150px auto`,
            animation: `fa-spin 2s infinite linear`,
          }}
        ></div>
      </div>
    }
    containerElement={
      <div style={{ height: `100%`, marginTop: '0px' }} />
    }
    mapElement={
      <div style={{ height: `100%`, marginTop: '0px' }} />
    }
    onSearchBoxMounted={this.handleSearchBoxMounted}
    onPlacesChanged={this.handlePlacesChanged}
    markers={this.state.markers}
    markerDrag={this.markerDrag}
  />);
  }
}
