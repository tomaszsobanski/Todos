import React from 'react';
import Table from '../../lib/table/table';
import '../../css/vd-default-table.css';
import TodosSDK from '../../TodosSDK';
import shallowCompare from 'react-addons-shallow-compare';
import TBodyTodoList from './tbody-todolist';
import THead from '../../lib/table/thead';
import '../../helper.js';
import URLManagement from '../../url-management';

export default class TableTodoList extends Table {

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
		title: "Is Complete",
		type: "integer",
		className: "font-2"
	    },
	    {
		title: "Actions",
		type: "actions",
		className: 'font-2'
	    }
	];
	this.config.urlManagement = new URLManagement({url: window.location.search});
	this.config.id = this.config.urlManagement.getParam('id');
	this.config.todosSDK = new TodosSDK({url: 'https://todos.venturedevs.net', handle: this});
	this.fillTable = this.fillTable.bind(this);
	this.fillTable();
    }

    shouldComponentWithPureRenderMixin(nextProps, nextState) {
	return this.config.isFillTable;
    }

    componentWillUpdate(nextProps, nextState) {
	if (!Object.equals(nextState.todoListTodos, this.state.todoListTodos) && this.config.isFillTable) {
	    this.setState({data: nextState.todoListTodos});
	    this.config.isFillTable = false;
	}

	if ((nextState.deleteTodo && nextState.deleteTodo !== this.state.deleteTodo) || (nextState.updateTodo && nextState.updateTodo !== this.state.updateTodo)) {
	    this.fillTable();
	}
    }

    fillTable() {
	this.config.isFillTable = true;
	this.config.todosSDK.getTodoListTodos(this.config.id);
    }

    render() {
	return (
		<div className={this.state.mainTemplate}>
		    <table>
			<THead theadHeaders={this.config.theadHeaders} handler={this.props.handler} />
			<TBodyTodoList parent={this} data={this.state.data} handler={this.props.handler} />
			<tfoot><tr><td></td><td><button onClick={this.fillTable}>Refresh</button></td><td></td></tr></tfoot>
		    </table>
		</div>
		);
    }

}