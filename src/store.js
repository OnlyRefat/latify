'use strict';

var Reflux = require('reflux'),
	Action = require('./action');

var Store = Reflux.createStore({
	listenables : Action ,
   init: function() {
   		this.lat = 123;
   		this.lng = 345;
  },
	onMarkerChange: function(item) {
		this.lat = item.lat;
		this.lng = item.lng;
		this.onPublish({lat: this.lat, lng: this.lng});
	},
	onPublish(item) {
		this.trigger(item);
	}
});

module.exports = Store;	