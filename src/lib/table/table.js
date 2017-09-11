import React, { Component } from 'react';
import THead from './thead';
import TBody from './tbody';

export default class Table extends Component {

    constructor(props) {
	super(props);
	this.state = {
	    mainTemplate: this.props.mainTemplate || 'vd-default-table',
	};
	this.config = {
	    theadHeaders: []
	};
	this.fillTable = this.fillTable.bind(this);
    }
    
    fillTable() {}

    render() {
	return (
		<div className={this.state.mainTemplate}>
		    <table>
			<THead theadHeaders={this.config.theadHeaders} handler={this.props.handler} />
			<TBody data={this.state.data} handler={this.props.handler} />
			<tfoot><tr><td></td><td><button onClick={this.fillTable}>test</button></td><td></td></tr></tfoot>
		    </table>
		</div>
		);
    }

}
