import React, { Component } from 'react';
import TH from '../cells/headers/th';

export default class Row extends Component {
	
	constructor(props) {
	    super(props);
	}

	render() {
	    return (
		    <tr>
		    {this.props.theadHeaders.map((item, i) => 
			<TH item={item} key={i} />
		    )}
		    </tr>
	    );
	}
	
}

