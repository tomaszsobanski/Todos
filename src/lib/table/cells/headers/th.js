import React, { Component } from 'react';

export default class TH extends Component {
	
	constructor(props) {
	    super(props);
	}

	render() {
	    return (
		    <th className={'th ' + ' th-'+ this.props.item.type + ' ' + this.props.item.className}>{this.props.item.title}</th>
	    );
	}
	
}