import React, {Component} from 'react';
import TodosSDK from '../TodosSDK';
import TableTodosList from './tables/table-todoslist';

export default class TodosList extends Component {

    constructor(props) {
	super(props);
	this.handleChangeName = this.handleChangeName.bind(this);
	this.handleFormSubmit = this.handleFormSubmit.bind(this);
	this.state = {
	    name: ''
	};
	this.config = {
	    todosSDK: new TodosSDK({url: 'https://todos.venturedevs.net', handle: this})
	};
    }
    
    handleChangeName(e) {
	this.setState({name: e.target.value});
    }

    handleFormSubmit() {
	if (this.state.name) {
	    this.config.todosSDK.createTodoList(this.state.name);
	}
    }

    componentWillUpdate(nextProps, nextState) {
	if (nextState.createTodoList && (!(this.state.createTodoList) || nextState.createTodoList.id != this.state.createTodoList.id)) {
	    this.tableTodosList.fillTable();
	}
    }

    render() {
	return (
		<div>
		    <div>
			<div>
			    <input type="text" placeholder="type todos list name" onChange={this.handleChangeName} />
			</div>
			<div>
			    <input type="submit" value="Add" onClick={this.handleFormSubmit} />
			</div>
		    </div>
		    <div>
			<TableTodosList handler={this} ref={(el) => this.tableTodosList = el} />
		    </div>
		</div>
		);
    }

}