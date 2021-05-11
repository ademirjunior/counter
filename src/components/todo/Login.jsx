import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'ademir',
            password: '',
            hasLoginFailed: false,
            showSucessMessage: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {
        console.log(this.state)
        // AuthenticationService
        //     .executeBasicAuthenticationService(this.state.username, this.state.password)
        //     .then(
        //         () => {
        //             AuthenticationService.registerSuccesfullLogin(this.state.username, this.state.password);
        //             this.props.history.push(`/welcome/${this.state.username}`)
        //         }
        //     )
        //     .catch(
        //         () => {
        //             this.setState({ showSucessMessage: false })
        //             this.setState({ hasLoginFailed: true })
        //         }
        //     )
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then(
                (response) => {
                    AuthenticationService.registerSuccesfullLoginForJwt(this.state.username, response.data.token);
                    this.props.history.push(`/welcome/${this.state.username}`)
                }
            )
            .catch(
                () => {
                    this.setState({ showSucessMessage: false })
                    this.setState({ hasLoginFailed: true })
                }
            )
    }

    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <div className="container">
                    <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} />
                    UserName: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        );
    }
}

function ShowInvalidCredentials(props) {
    if (props.hasLoginFailed) {
        return <div className="alert alert-warning">Invalid Credentials!</div>
    }
    return null
}

export default LoginComponent