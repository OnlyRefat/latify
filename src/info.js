import React, { Component } from 'react';
import Store from './store';

class Info extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.setState({ lat: this.props.lat, lng: this.props.lng });
  }
  componentDidMount() {
    Store.listen(this.handleReflux.bind(this));
  }
  handleReflux(item) {
    this.setState({ lat: item.lat, lng: item.lng });
  }
  render() {
    return (<div>
      {this.state.lat} , {this.state.lng}
    </div>);
  }
}

export default Info;
