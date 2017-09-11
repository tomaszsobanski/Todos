import React from 'react';
import TBody from '../../lib/table/tbody';

export default class TBodyTodosList extends TBody {

    constructor(props) {
	super(props);
	this.search = this.search.bind(this);
	this.completeSearch = this.completeSearch.bind(this);
	this.remove = this.remove.bind(this);
	this.state = {
	    search: '',
	    completeSearch: -1
	};
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
						<td>{item.name}</td>
						<td>{item.is_complete ? 'yes' : 'no'}</td>
						<td>
						    <i className="fa fa-button fa-pencil-square-o" aria-hidden="true" data-id={item.id}></i>
						    <i onClick={(e) => {this.remove(e, item)}} className="fa fa-button fa-trash-o" aria-hidden="true"></i>
						</td>
					</tr>
					) : <tr><td colSpan="4">no data</td></tr>}
		</tbody>
		);
    }

}
