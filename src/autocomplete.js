import React, { Component } from 'react';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.handleAutoSearchComplete = this.handleAutoSearchComplete.bind(this);
    this.mapMount = this.mapMount.bind(this);
    this.clearField = this.clearField.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
    };
  }
  clearField() {
    this.setState({ value: '' });
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  mapMount(input, map, self) {
    if (input === null)
      return;
    const autocomplete = new map.places.Autocomplete(input);
    const geocoder = new map.Geocoder();
    if (input) {
      map.event.addDomListener(input, 'keydown', (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      });
    }
    map.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry === undefined) {
        return;
      }
      geocoder.geocode({ latLng: place.geometry.location }, (responses) => {
        if (this.responses !== responses[0].formatted_address) {
          console.log(responses,responses[0].geometry.location.lat(), responses[0].geometry.location.lng());
          this.responses = responses[0].formatted_address;
          self.setState({ value: document.getElementById('location').value})
        }
      });
    });
  }
  handleAutoSearchComplete(input) {
    const self = this;
    if (typeof google === 'object' && typeof google.maps === 'object' && input !== null) {
      this.mapMount(input, google.maps, this);
    }
  }
  render() {
    return (<div>
      <input type="text" id="location" onChange={this.handleChange} ref={this.handleAutoSearchComplete} value={this.state.value}/>
      { this.state.value !== '' ? <button onClick={this.clearField}></button> : null}
    </div>);
  }
}

export default Autocomplete;
