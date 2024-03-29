import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HeaderComponent from './Header'
import FooterComponent from './Footer'
import LogoutComponent from './Logout'
import LoginComponent from './Login'
import WelcomeComponent from './Welcome'
import ListTodosComponent from './ListTodos'
import AuthenticatedRoute from './AuthenticatedRoute'
import ErrorComponent from './ErrorComponent'
import TodoComponent from './TodoComponent'


class TodoApp extends Component {

    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent></HeaderComponent>
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                        <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
                        <AuthenticatedRoute path="/todos" component={ListTodosComponent} />
                        <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                    <FooterComponent></FooterComponent>
                </Router>
            </div>
        );
    }
}

export default TodoApp;