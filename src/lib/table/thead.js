import React, { Component } from 'react';
import Row from './rows/row';

export default class THead extends Component {

    constructor(props) {
	super(props);
    }

    render() {
	return (
		<thead>
		    <Row theadHeaders={this.props.theadHeaders} />
		</thead>
		);
    }

}
