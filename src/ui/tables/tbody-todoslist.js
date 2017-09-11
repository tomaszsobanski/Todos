import React from 'react';
import TBody from '../../lib/table/tbody';

export default class TBodyTodosList extends TBody {

    constructor(props) {
	super(props);
	this.show = this.show.bind(this);
	this.remove = this.remove.bind(this);
	this.search = this.search.bind(this);
	this.state = {
	    search: ''
	};
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
						<td>{item.name}&nbsp;({item.todos_count})</td>
						<td>
						<i onClick={(e) => {this.show(e, item)}} className="fa fa-button fa-eye" aria-hidden="true"></i>
						<i className="fa fa-button fa-pencil-square-o" aria-hidden="true" data-id={item.id}></i>
						<i onClick={(e) => {this.remove(e, item)}} className="fa fa-button fa-trash-o" aria-hidden="true"></i>
						</td>
					</tr>
					) : <tr><td colSpan="3">no data</td></tr>}
		</tbody>
		);
    }

}
