import React from 'react';
import Table from '../../lib/table/table';
import '../../css/vd-default-table.css';
import TodosSDK from '../../TodosSDK';
import shallowCompare from 'react-addons-shallow-compare';
import TBodyTodosList from './tbody-todoslist';
import THead from '../../lib/table/thead';
import '../../helper.js';

export default class TableTodosList extends Table {

    constructor(props) {
	super(props);
	this.config.theadHeaders = [
	    {
		title: "ID",
		type: "integer",
		className: 'font-2'
	    },
	    {
		title: "Name",
		type: "string",
		className: 'font-2'
	    },
	    {
		title: "Actions",
		type: "actions",
		className: 'font-2'
	    }
	];
	this.config.todosSDK = new TodosSDK({url: 'https://todos.venturedevs.net', handle: this});
	this.fillTable = this.fillTable.bind(this);
	this.fillTable();
    }

    shouldComponentWithPureRenderMixin(nextProps, nextState) {
	return this.config.isFillTable;
    }

    componentWillUpdate(nextProps, nextState) {
	
	//console.log(nextProps, nextState);
	/*if (nextState.todosLists && this.config.isFillTable) {
	}*/
	if (!Object.equals(nextState.todosLists, this.state.todosLists) && this.config.isFillTable) {
	    this.setState({data: nextState.todosLists});
	    this.config.isFillTable = false;
	}
	if (nextState.deleteTodoList && nextState.deleteTodoList !== this.state.todosLists.deleteTodoList) {
	    this.fillTable();
	}
    }

    fillTable() {
	this.config.isFillTable = true;
	this.config.todosSDK.getTodosLists();
    }

    render() {
	return (
		<div className={this.state.mainTemplate}>
		    <table>
			<THead theadHeaders={this.config.theadHeaders} handler={this.props.handler} />
			<TBodyTodosList parent={this} data={this.state.data} handler={this.props.handler} />
			<tfoot><tr><td></td><td><button onClick={this.fillTable}>Refresh</button></td><td></td></tr></tfoot>
		    </table>
		</div>
		);
    }

}