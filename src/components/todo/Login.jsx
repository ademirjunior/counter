import React, { Component } from 'react';

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
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleChange(event) {
        //prints the state before the change
        // console.log(this.state)
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    // handlePasswordChange(event) {
    //     console.log(event.target.value)
    //     this.setState({password: event.target.value})
    // }

    loginClicked() {
        //Valid = ademir, 1234
        if (this.state.username === 'ademir' && this.state.password === '1234') {
            this.props.history.push(`/welcome/${this.state.username}`)
            // this.setState({ showSucessMessage: true })
            // this.setState({ hasLoginFailed: false })
        } else {
            this.setState({ showSucessMessage: false })
            this.setState({ hasLoginFailed: true })
        }
        console.log(this.state)
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