import React from 'react';
import TBody from '../../lib/table/tbody';

export default class TBodyTodosList extends TBody {

    constructor(props) {
	super(props);
	this.search = this.search.bind(this);
	this.completeSearch = this.completeSearch.bind(this);
	this.remove = this.remove.bind(this);
	this.handleDBClick = this.handleDBClick.bind(this);
	this.handleSave = this.handleSave.bind(this);
	this.handleCancel = this.handleCancel.bind(this);
	this.handleOnChangeName = this.handleOnChangeName.bind(this);
	this.handleDBClickComplete = this.handleDBClickComplete.bind(this);
	this.handleSaveComplete = this.handleSaveComplete.bind(this);
	this.handleCancelComplete = this.handleCancelComplete.bind(this);
	this.state = {
	    search: '',
	    completeSearch: -1,
	    val: {}
	};
    }

    handleDBClick(e, item) {
	var parentNode = e.target.parentElement;
	var nameText = parentNode.querySelector('.name-text');
	var nameInput = parentNode.querySelector('.name-input');
	var input = nameInput.querySelector('input');
	input.value = item.name;
	nameText.className += ' hide';
	nameInput.classList.remove('hide');
    }
    
    handleDBClickComplete(e, item) {
	var parentNode = e.target.parentElement;
	var completeText = parentNode.querySelector('.complete-text');
	var completeSelect = parentNode.querySelector('.complete-select');
	var select = completeSelect.querySelector('select');
	select.value = item.is_complete ? 1 : 0;
	completeText.className += ' hide';
	completeSelect.classList.remove('hide');
    }

    handleSave(e, item) {
	var parentNode = e.target.parentElement.parentElement;
	var nameInput = parentNode.querySelector('.name-input');
	var input = nameInput.querySelector('input');
	if (input.value) {
	    this.props.parent.config.todosSDK.updateTodo(item.id, input.value, item.is_complete, item.todo_list);
	    this.handleCancel(e, item);
	}
    }
    
    handleSaveComplete(e, item) {
	var parentNode = e.target.parentElement.parentElement;
	var completeSelect = parentNode.querySelector('.complete-select');
	var select = completeSelect.querySelector('select');
	if (select.value) {
	    this.props.parent.config.todosSDK.updateTodo(item.id, item.name, select.value, item.todo_list);
	    this.handleCancelComplete(e, item);
	}
    }
    
    handleCancel(e, item) {
	var parentNode = e.target.parentElement.parentElement;
	var nameText = parentNode.querySelector('.name-text');
	var nameInput = parentNode.querySelector('.name-input');
	nameInput.className += ' hide';
	nameText.classList.remove('hide');
    }
    
    handleCancelComplete(e, item) {
	var parentNode = e.target.parentElement.parentElement;
	var completeText = parentNode.querySelector('.complete-text');
	var completeSelect = parentNode.querySelector('.complete-select');
	completeSelect.className += ' hide';
	completeText.classList.remove('hide');
    }
    
    handleOnChangeName(e, item) {
	var val = this.state.val;
	val[item.id] = e.currentTarget.value; 
	this.setState({ val } );
    }

    search(e) {
	this.setState({search: e.target.value});
    }

    completeSearch(e) {
	this.setState({completeSearch: e.target.value});
    }

    remove(e, data) {
	this.props.parent.config.todosSDK.deleteTodo(data.id);
    }

    render() {
	var temp = [];
	if (this.props.data && this.props.data.length && (this.state.search || this.state.completeSearch)) {
	    this.props.data.map((item, i) => {
		if (item.name.indexOf(this.state.search) !== -1 && (parseInt(this.state.completeSearch) == -1 || (parseInt(this.state.completeSearch) == 0 && item.is_complete == false) || (parseInt(this.state.completeSearch) == 1 && item.is_complete == true))) {
		    temp[i] = item;
		}
	    });
	} else {
	    temp = this.props.data;
	}
	return (
		<tbody>
		    <tr className="row">
			<td></td>
			<td><input placeholder="search..." onChange={this.search}/></td>
			<td>
			    <select onChange={this.completeSearch}>
				<option value="-1">...</option>
				<option value="1">Yes</option>
				<option value="0">No</option>
			    </select>
			</td>
			<td></td>
		    </tr>
		    {temp && temp.length ? temp.map((item, i) =>
					<tr className="row" key={i}>
						<td>{item.id}</td>
						<td>
						    <span className="name-text" data-name={item.name} onDoubleClick={(e) => {this.handleDBClick(e, item)}}>
							{item.name}
						    </span>
						    <span className="name-input hide">
							<input type="text" value={this.state.val.hasOwnProperty(item.id) ? this.state.val[item.id] : item.name} onChange={(e) => {this.handleOnChangeName(e, item) }} />
							<i onClick={(e) => {this.handleSave(e, item)}} className="fa fa-button fa-floppy-o" aria-hidden="true"></i>
							<i onClick={(e) => {this.handleCancel(e, item)}} className="fa fa-button fa-times" aria-hidden="true"></i>
						    </span>
						</td>
						<td>
						    <span className="complete-text" onDoubleClick={(e) => {this.handleDBClickComplete(e, item)}}>
							{item.is_complete ? 'yes' : 'no'}
						    </span>
						    <span className="complete-select hide">
							<select>
							    <option selected={!item.is_complete ? ' selected ' : ''} value="0">no</option>
							    <option selected={item.is_complete ? ' selected ' : ''} value="1">yes</option>
							</select>
							<i onClick={(e) => {this.handleSaveComplete(e, item)}} className="fa fa-button fa-floppy-o" aria-hidden="true"></i>
							<i onClick={(e) => {this.handleCancelComplete(e, item)}} className="fa fa-button fa-times" aria-hidden="true"></i>
						    </span>
						</td>
						<td>
						    <i onClick={(e) => {this.remove(e, item)}} className="fa fa-button fa-trash-o" aria-hidden="true"></i>
						</td>
					</tr>
					) : <tr><td colSpan="4">no data</td></tr>}
		</tbody>
		);
    }

}
