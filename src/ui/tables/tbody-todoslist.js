import React from 'react';
import TBody from '../../lib/table/tbody';

export default class TBodyTodosList extends TBody {

    constructor(props) {
	super(props);
	this.show = this.show.bind(this);
	this.remove = this.remove.bind(this);
	this.search = this.search.bind(this);
	this.handleDBClick = this.handleDBClick.bind(this);
	this.handleSave = this.handleSave.bind(this);
	this.handleCancel = this.handleCancel.bind(this);
	this.handleOnChangeName = this.handleOnChangeName.bind(this);
	this.state = {
	    search: '',
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
    
    handleSave(e, item) {
	var parentNode = e.target.parentElement.parentElement;
	var nameInput = parentNode.querySelector('.name-input');
	var input = nameInput.querySelector('input');
	if (input.value) {
	    this.props.parent.config.todosSDK.updateTodoList(item.id, input.value);
	    this.handleCancel(e, item);
	}
    }
    
    handleCancel(e, item) {
	var parentNode = e.target.parentElement.parentElement;
	var nameText = parentNode.querySelector('.name-text');
	var nameInput = parentNode.querySelector('.name-input');
	nameInput.className += ' hide';
	nameText.classList.remove('hide');
    }
    
    handleOnChangeName(e, item) {
	var val = this.state.val;
	val[item.id] = e.currentTarget.value; 
	this.setState({ val } );
    }

    show(e, data) {
	this.props.handler.props.history.push('/show?id=' + data.id);
    }

    search(e) {
	this.setState({search: e.target.value});
    }

    remove(e, data) {
	this.props.parent.config.todosSDK.deleteTodoList(data.id);
    }

    render() {
	var temp = [];
	if (this.props.data && this.props.data.length && this.state.search) {
	    this.props.data.map((item, i) => {
		if (item.name.indexOf(this.state.search) !== -1) {
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
			<td></td>
			<td></td>
		    </tr>
		    {temp && temp.length ? temp.map((item, i) =>
					<tr className="row" key={i}>
						<td>{item.id}</td>
						<td>
						    <span className="name-text" data-name={item.name} onDoubleClick={(e) => {this.handleDBClick(e, item)}}>
							{item.name}&nbsp;({item.todos_count})
						    </span>
						    <span className="name-input hide">
							<input type="text" value={this.state.val.hasOwnProperty(item.id) ? this.state.val[item.id] : item.name} onChange={(e) => {this.handleOnChangeName(e, item) }} />
							<i onClick={(e) => {this.handleSave(e, item)}} className="fa fa-button fa-floppy-o" aria-hidden="true"></i>
							<i onClick={(e) => {this.handleCancel(e, item)}} className="fa fa-button fa-times" aria-hidden="true"></i>
						    </span>
						</td>
						<td>
						<i onClick={(e) => {this.show(e, item)}} className="fa fa-button fa-eye" aria-hidden="true"></i>
						<i onClick={(e) => {this.remove(e, item)}} className="fa fa-button fa-trash-o" aria-hidden="true"></i>
						</td>
					</tr>
					) : <tr><td colSpan="3">no data</td></tr>}
		</tbody>
		);
    }

}
