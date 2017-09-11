import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import TodosSDK from './TodosSDK';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import history from './lib/history';
import TodosList from './ui/todoslist';
import TodoList from './ui/todolist';
import TodoDetails from './ui/tododetails';
import './helper.js';

export default class App extends Component {

    constructor() {
	super();
    }

    componentWillUpdate(nextProps, nextState) {
	console.log(nextProps, nextState);
    }

    render() {
	return (
<div className="App font-1">
    <div className="App-header">
	<img src={logo} className="App-logo" alt="logo" />
	<h2>Welcome to React</h2>
    </div>
    <BrowserRouter>
	<Switch>
	<Route path="/" exact render={props => <TodosList {...props} />} />
	<Route path="/show" exact render={props => <TodoList {...props} />} />
	<Route path="/details" exact render={props => <TodoDetails {...props} />} />
	</Switch>
    </BrowserRouter>
    </div>
	);
    }
}
