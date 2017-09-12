import React, {Component} from 'react';
import TodosSDK from '../TodosSDK';
import TableTodoList from './tables/table-todolist';
import URLManagement from '../url-management';

export default class TodosList extends Component {

    constructor(props) {
	super(props);
	this.handleChangeName = this.handleChangeName.bind(this);
	this.handleComplete = this.handleComplete.bind(this);
	this.handleFormSubmit = this.handleFormSubmit.bind(this);
	this.state = {
	    name: ''
	};
	this.config = {
	    todosSDK: new TodosSDK({url: 'https://todos.venturedevs.net', handle: this})
	};
	this.config.urlManagement = new URLManagement({url: window.location.search});
	this.config.id = this.config.urlManagement.getParam('id');
    }

    handleChangeName(e) {
	this.setState({name: e.target.value});
    }

    handleComplete(e) {
	this.setState({isComplete: !!e.target.checked});
    }

    handleFormSubmit() {
	if (this.state.name) {
	    this.config.todosSDK.createTodo(this.state.name, this.state.isComplete ? this.state.isComplete : false, this.config.id);
	}
    }

    componentWillUpdate(nextProps, nextState) {
	if (nextState.createTodo && (!(this.state.createTodo) || nextState.createTodo.id != this.state.createTodo.id)) {
	    this.tableTodoList.fillTable();
	}
    }

    render() {
	return (
		<div>
		    <p className="back">
			<a href="/">Back</a>
		    </p>
		    <div>
			<div>
			    <input type="text" placeholder="type todos list name" onChange={this.handleChangeName} />
			</div>
			<div>
			    <input type="checkbox" value="1" onChange={this.handleComplete} />&nbsp;<span className="complete">is&nbsp;complete</span>
			</div>
			<div>
			    <input type="submit" value="Add" onClick={this.handleFormSubmit} />
			</div>
		    </div>
		    <div>
			<TableTodoList handler={this} ref={(el) => this.tableTodoList = el} />
		    </div>
		</div>
		);
    }

}