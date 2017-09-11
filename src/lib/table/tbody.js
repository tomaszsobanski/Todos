import React, { Component } from 'react';

export default class TBody extends Component {

    render() {
	return (
		<tbody>
		    {this.props.data ? this.props.data.map((item, i) =>
					<tr key={i}>
					</tr>
				) : ''}
		</tbody>
		);
    }

}
