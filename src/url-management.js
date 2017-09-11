import React, {Component} from 'react';

export default class URLManagement extends Component {

	constructor(props) {
	    super(props);
	    this.prepare();
	}

	prepare() {
	    var temp = this.props.url.replace('?', '');
	    var temp2 = temp.split('&');
	    var temp3 = null;
	    this.props.params = {};
	    for (var temp4 in temp2) {
		temp3 = temp2[temp4].split('=');
		this.props.params[temp3[0]] = temp3[1];
	    }
	}

	getParam(key) {
	    return this.props.params.hasOwnProperty(key) ? this.props.params[key] : null;
	}

}