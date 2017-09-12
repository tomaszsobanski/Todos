import { Component } from 'react';
import axios from 'axios';

export default class TodosSDK extends Component {

    constructor(props) {
	super(props);
    }

    getTodosLists() {
	axios.get(this.props.url + '/api/todolists/?format=json').then(
		res => {
		    this.props.handle.setState({todosLists: res.data});
		});
    }

    createTodoList(name) {
	axios.post(this.props.url + '/api/todolists/?format=json', {
	    name: name
	}).then(
		res => {
		    this.props.handle.setState({createTodoList: res.data});
		});
    }

    updateTodoList(todoListId, name) {
	axios.put(this.props.url + '/api/todolists/' + todoListId + '/?format=json', {
	    name: name
	}).then(
		res => {
		    this.props.handle.setState({updateTodoList: res.data});
		});
    }

    deleteTodoList(todoListId) {
	axios.delete(this.props.url + '/api/todolists/' + todoListId + '/?format=json').then(
		res => {
		    this.props.handle.setState({deleteTodoList: todoListId});
		});
    }

    getTodoListTodos(todoListId) {
	axios.get(this.props.url + '/api/todolists/' + todoListId + '/?format=json').then(
		res => {
		    this.props.handle.setState({todoListTodos: res.data});
		}
	);
    }

    getAllTodosList() {
	axios.get(this.props.url + '/api/todos/?format=json').then(
		res => {
		    this.props.handle.setState({todosAll: res.data});
		});
    }

    createTodo(name, isComplete, todoListId) {
	axios.post(this.props.url + '/api/todos/?format=json', {
	    name: name,
	    is_complete: isComplete,
	    todo_list: todoListId
	}).then(
		res => {
		    this.props.handle.setState({createTodo: res.data});
		});
    }

    getTodo(todoId) {
	axios.get(this.props.url + '/api/todos/' + todoId + '/?format=json').then(
		res => {
		    this.props.handle.setState({todo: res.data});
		});
    }

    updateTodo(todoId, name, isComplete, todoListId) {
	axios.put(this.props.url + '/api/todos/' + todoId + '/?format=json', {
	    name: name,
	    is_complete: isComplete,
	    todo_list: todoListId
	}).then(
		res => {
		    this.props.handle.setState({updateTodo: res.data});
		});
    }

    deleteTodo(todoId) {
	axios.delete(this.props.url + '/api/todos/' + todoId + '/?format=json').then(
		res => {
		    this.props.handle.setState({deleteTodo: todoId});
		});
    }
}
