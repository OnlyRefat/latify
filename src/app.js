/* Comment */
import React, { Component } from 'react';
import { render } from 'react-dom';
import GoogleMap from './googlemap';
import Autocomplete from './autocomplete';

import Action from './action';
import Store from './store';
const documentRoot = document.getElementById('root');

class App extends Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (<div>
    	<GoogleMap />
     </div>);
  }
}
render(<App/>, documentRoot);