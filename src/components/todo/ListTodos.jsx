import React, { Component } from 'react'
import moment from 'moment'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'

class ListTodosComponent extends Component {

    constructor(props) {
        console.log('constructor')
        super(props)

        this.state = {
            todos: [
                // { id: 1, description: 'Learn React', done: false, targetDate: new Date() },
                // { id: 2, description: 'Learn Spring', done: false, targetDate: new Date() },
                // { id: 3, description: 'Learn Java', done: false, targetDate: new Date() }
            ],
            message: null
        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshTodos();
    }

    refreshTodos() {
        let userName = AuthenticationService.getLoggedInUser();
        TodoDataService.retrieveAllTodos(userName)
            .then(
                response => {
                    this.setState({todos : response.data})
                }
            )
    }

    deleteTodoClicked(id) {
        let userName = AuthenticationService.getLoggedInUser();
        //console.log(id + " " + userName);
        TodoDataService.deleteTodo(userName, id)
             .then(
                    response => {
                        this.setState({message : `Delete of todo ${id} successfull`});
                        this.refreshTodos();
                    }
             )
    }

    updateTodoClicked(id) {
        this.props.history.push(`/todos/${id}`)
        //let userName = AuthenticationService.getLoggedInUser();
        //console.log(id + " " + userName);
        // TodoDataService.deleteTodo(userName, id)
        //      .then(
        //             response => {
        //                 this.setState({message : `Delete of todo ${id} successfull`});
        //                 this.refreshTodos();
        //             }
        //      )
    }

    addTodoClicked() {
        this.props.history.push('/todos/-1')
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div  class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Done</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                            <td><button className="btn btn-warning" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                            <td><button className="btn btn-danger" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={() => this.addTodoClicked()}>Add</button>
                    </div>
                </div>
            </div>)
    }
}

export default ListTodosComponent